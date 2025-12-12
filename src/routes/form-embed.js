(() => {
  const script_tag = document.currentScript;
  if (!script_tag) return;

  // safely parse script origin
  let script_origin;
  try {
    script_origin = new URL(script_tag.src).origin;
  } catch (error) {
    console.error("Invalid script src URL:", error);
    return;
  }

  // find all elements with data-bg-form attribute
  const containers = document.querySelectorAll("[data-bg-form]");
  if (containers.length === 0) {
    console.error("No element with data-bg-form attribute found");
    return;
  }

  // process each container
  for (const container of containers) {
    // extract and validate form_id from the data attribute
    const form_id = container.getAttribute("data-bg-form");
    if (!form_id) {
      console.error(
        "form_id could not be extracted from data-bg-form attribute"
      );
      continue;
    }

    // validate form_id to prevent path traversal and XSS
    if (!/^[a-zA-Z0-9_-]+$/.test(form_id)) {
      console.error(
        "Invalid form_id format. Only alphanumeric, underscore, and hyphen allowed."
      );
      continue;
    }

    // create iframe with security attributes
    const iframe = document.createElement("iframe");
    // generate unique ID for iframe using form_id and a unique suffix
    iframe.id = `bg-form-iframe-${form_id}-${Math.random().toString(36).slice(2, 11)}`;
    iframe.src = `${script_origin}/forms/${form_id}`;
    iframe.style.width = "100%";
    iframe.style.border = "none";
    iframe.allow = "payment";

    // add sandbox attribute for security (adjust permissions as needed)
    iframe.sandbox = "allow-scripts allow-same-origin allow-forms allow-popups";

    // set title for accessibility
    iframe.title = `Form ${form_id}`;

    container.appendChild(iframe);

    // create AbortController for cleanup
    const abort_controller = new AbortController();

    const handle_message = (e) => {
      // validate origin
      if (e.origin !== script_origin) return;

      // validate message structure and form_id
      if (e.data?.form_id !== form_id) return;

      if (e.data?.type === "resize") {
        // validate height is a positive number within reasonable bounds
        const height = Number(e.data.height);
        if (isNaN(height) || height < 0 || height > 50000) {
          console.warn("Invalid height value received:", e.data.height);
          return;
        }
        iframe.style.height = `${height}px`;
      } else if (e.data?.type === "redirect" && e.data?.redirect_url) {
        // validate and perform redirect
        try {
          const url = new URL(e.data.redirect_url);
          // only allow http and https protocols for security
          if (url.protocol === "http:" || url.protocol === "https:") {
            window.location.href = e.data.redirect_url;
          } else {
            console.warn("Invalid redirect URL protocol:", url.protocol);
          }
        } catch (_) {
          console.warn("Invalid redirect URL:", e.data.redirect_url);
        }
      }
    };

    window.addEventListener("message", handle_message, {
      signal: abort_controller.signal,
    });

    // cleanup when iframe is removed from DOM
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.removedNodes) {
          if (node === iframe || node.contains?.(iframe)) {
            abort_controller.abort();
            observer.disconnect();
          }
        }
      }
    });

    if (container.parentNode) {
      observer.observe(container.parentNode, {
        childList: true,
        subtree: true,
      });
    }
  }
})();
