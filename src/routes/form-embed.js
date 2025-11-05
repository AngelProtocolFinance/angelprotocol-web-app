(() => {
  const script_tag = document.currentScript;
  if (!script_tag) return;

  // Safely parse script origin
  let script_origin;
  try {
    script_origin = new URL(script_tag.src).origin;
  } catch (error) {
    console.error("Invalid script src URL:", error);
    return;
  }

  // Find all elements with id starting with "bg-form-"
  const containers = document.querySelectorAll('[id^="bg-form-"]');
  if (containers.length === 0) {
    console.error("No element with id starting with bg-form- found");
    return;
  }

  // Process each container
  for (const container of containers) {
    // Extract and validate form_id from the id attribute
    const form_id = container.id.replace("bg-form-", "");
    if (!form_id) {
      console.error("form_id could not be extracted from id");
      continue;
    }

    // Validate form_id to prevent path traversal and XSS
    if (!/^[a-zA-Z0-9_-]+$/.test(form_id)) {
      console.error("Invalid form_id format. Only alphanumeric, underscore, and hyphen allowed.");
      continue;
    }

    // Create iframe with security attributes
    const iframe = document.createElement("iframe");
    iframe.id = `bg-form-iframe-${form_id}`;
    iframe.src = `${script_origin}/forms/${form_id}`;
    iframe.style.width = "100%";
    iframe.style.border = "none";

    // Add sandbox attribute for security (adjust permissions as needed)
    iframe.sandbox = "allow-scripts allow-same-origin allow-forms allow-popups";

    // Set title for accessibility
    iframe.title = `Form ${form_id}`;

    container.appendChild(iframe);

    // Create AbortController for cleanup
    const abort_controller = new AbortController();

    const handle_resize = (e) => {
      // Validate origin
      if (e.origin !== script_origin) return;

      // Validate message structure and form_id
      if (e.data?.type === "resize" && e.data?.form_id === form_id) {
        // Validate height is a positive number within reasonable bounds
        const height = Number(e.data.height);
        if (isNaN(height) || height < 0 || height > 50000) {
          console.warn("Invalid height value received:", e.data.height);
          return;
        }
        iframe.style.height = `${height}px`;
      }
    };

    window.addEventListener("message", handle_resize, { signal: abort_controller.signal });

    // Cleanup when iframe is removed from DOM
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
      observer.observe(container.parentNode, { childList: true, subtree: true });
    }
  }
})();
