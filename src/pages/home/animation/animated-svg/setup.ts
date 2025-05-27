interface AnimationConfig {
  element: string;
  path_element: string;
}

interface PathPoint {
  x: number;
  y: number;
}

export function createScrollAnimation({
  element,
  path_element,
}: AnimationConfig) {
  // Early return for server-side rendering
  if (typeof document === "undefined") return;

  const svg_element = document.querySelector(element) as SVGSVGElement;
  const ball_element = document.querySelector("#ball") as SVGCircleElement;
  const path_el = document.querySelector(path_element) as SVGPathElement;
  const bubbles = ["#bubble1", "#bubble2", "#bubble3", "#bubble4"];

  if (!svg_element || !ball_element || !path_el) return;

  const view_boxes = {
    start: "0 60 1795.5 670",
    middle: "600 60 1795.5 670",
    pre_end: "1200 60 1795.5 670",
    end: "1500 60 1795.5 670",
  };

  // Get path length and create path points
  const path_length = path_el.getTotalLength();
  const path_points: PathPoint[] = [];
  const num_points = 100;

  for (let i = 0; i <= num_points; i++) {
    const point = path_el.getPointAtLength((i / num_points) * path_length);
    path_points.push({ x: point.x, y: point.y });
  }

  // Set initial states
  svg_element.setAttribute("viewBox", view_boxes.start);
  for (const bubble of bubbles) {
    const bubble_el = document.querySelector(bubble) as SVGElement;
    if (bubble_el) {
      bubble_el.style.filter = "grayscale(100%)";
    }
  }
  function updateAnimation() {
    const scroll_y = window.scrollY;
    const svg_container = svg_element.parentElement?.parentElement; // Get the outer container with min-h-[200vh]
    if (!svg_container) return;

    // Get the container's position relative to the document
    const container_top = svg_container.offsetTop;
    const container_height = svg_container.offsetHeight;
    const window_height = window.innerHeight;

    // Calculate scroll progress based on the full container height
    const scroll_start = container_top;
    const scroll_end = container_top + container_height - window_height;
    const scroll_range = scroll_end - scroll_start;

    const current_scroll_progress = Math.max(
      0,
      Math.min(1, (scroll_y - scroll_start) / scroll_range)
    );

    // Update ball position along path
    const path_progress = current_scroll_progress;
    const point_index = Math.floor(path_progress * (path_points.length - 1));
    const next_point_index = Math.min(point_index + 1, path_points.length - 1);
    const local_progress =
      path_progress * (path_points.length - 1) - point_index;

    const current_point = path_points[point_index];
    const next_point = path_points[next_point_index];

    // Interpolate between points for smooth movement
    const ball_x =
      current_point.x + (next_point.x - current_point.x) * local_progress;
    const ball_y =
      current_point.y + (next_point.y - current_point.y) * local_progress;

    ball_element.setAttribute("cx", ball_x.toString());
    ball_element.setAttribute("cy", ball_y.toString());

    // Calculate when ball reaches bubble1 (around 25% of path progress)
    const bubble1_threshold = 0.25;

    // Update viewBox based on progress - only start panning when ball reaches bubble1
    let view_box_progress = 0;
    if (current_scroll_progress >= bubble1_threshold) {
      // Map remaining progress (from bubble1 to end) to viewBox interpolation
      view_box_progress =
        (current_scroll_progress - bubble1_threshold) / (1 - bubble1_threshold);
    }

    let interpolated_view_box: string;

    // Parse viewBox values for interpolation
    const parse_view_box = (vb: string) => {
      const [x, y, width, height] = vb.split(" ").map(Number);
      return { x, y, width, height };
    };

    const start_vb = parse_view_box(view_boxes.start);
    const middle_vb = parse_view_box(view_boxes.middle);
    const pre_end_vb = parse_view_box(view_boxes.pre_end);
    const end_vb = parse_view_box(view_boxes.end);

    // Smooth interpolation between viewBox states
    let current_vb: { x: number; y: number; width: number; height: number };

    if (view_box_progress <= 0.33) {
      // Interpolate between start and middle
      const local_progress = view_box_progress / 0.33;
      current_vb = {
        x: start_vb.x + (middle_vb.x - start_vb.x) * local_progress,
        y: start_vb.y + (middle_vb.y - start_vb.y) * local_progress,
        width:
          start_vb.width + (middle_vb.width - start_vb.width) * local_progress,
        height:
          start_vb.height +
          (middle_vb.height - start_vb.height) * local_progress,
      };
    } else if (view_box_progress <= 0.66) {
      // Interpolate between middle and pre_end
      const local_progress = (view_box_progress - 0.33) / 0.33;
      current_vb = {
        x: middle_vb.x + (pre_end_vb.x - middle_vb.x) * local_progress,
        y: middle_vb.y + (pre_end_vb.y - middle_vb.y) * local_progress,
        width:
          middle_vb.width +
          (pre_end_vb.width - middle_vb.width) * local_progress,
        height:
          middle_vb.height +
          (pre_end_vb.height - middle_vb.height) * local_progress,
      };
    } else {
      // Interpolate between pre_end and end
      const local_progress = (view_box_progress - 0.66) / 0.34;
      current_vb = {
        x: pre_end_vb.x + (end_vb.x - pre_end_vb.x) * local_progress,
        y: pre_end_vb.y + (end_vb.y - pre_end_vb.y) * local_progress,
        width:
          pre_end_vb.width + (end_vb.width - pre_end_vb.width) * local_progress,
        height:
          pre_end_vb.height +
          (end_vb.height - pre_end_vb.height) * local_progress,
      };
    }

    interpolated_view_box = `${current_vb.x} ${current_vb.y} ${current_vb.width} ${current_vb.height}`;
    svg_element.setAttribute("viewBox", interpolated_view_box);

    // Update bubble states based on ball position with improved timing
    const bubble_elements = svg_element.querySelectorAll(
      ".bubble-number"
    ) as NodeListOf<SVGElement>;

    // Define activation points - bubbles stay lit once ball reaches them
    const bubble_activation_points = [
      { activation: 0.25 }, // Bubble 1: activate at 25%
      { activation: 0.45 }, // Bubble 2: activate at 45%
      { activation: 0.68 }, // Bubble 3: activate at 68%
      { activation: 0.9 }, // Bubble 4: activate at 90%
    ];

    // Update both .bubble-number elements and the old bubble references
    for (
      let index = 0;
      index < Math.max(bubbles.length, bubble_elements.length);
      index++
    ) {
      // Handle old bubble system (fallback)
      if (index < bubbles.length) {
        const bubble = bubbles[index];
        const bubble_el = document.querySelector(bubble) as SVGElement;
        if (bubble_el && index < bubble_activation_points.length) {
          const { activation } = bubble_activation_points[index];

          // Once ball reaches bubble, it stays lit (or all bubbles lit in final state)
          const is_active =
            current_scroll_progress >= activation ||
            current_scroll_progress >= 0.95;

          if (is_active) {
            // Bubble is active - instant activation, no transitions
            bubble_el.style.filter = "grayscale(0%) brightness(1.2)";
            bubble_el.style.opacity = "1";
            bubble_el.style.transition = "none";
          } else {
            // Bubble is inactive - keep fully opaque but grayscale
            bubble_el.style.filter = "grayscale(100%) brightness(0.9)";
            bubble_el.style.opacity = "1";
            bubble_el.style.transition = "none";
          }
        }
      }

      // Handle new .bubble-number elements
      if (
        index < bubble_elements.length &&
        index < bubble_activation_points.length
      ) {
        const bubble_el = bubble_elements[index];
        const { activation } = bubble_activation_points[index];

        // Once ball reaches bubble, it stays lit (or all bubbles lit in final state)
        const is_active =
          current_scroll_progress >= activation ||
          current_scroll_progress >= 0.95;

        // Find corresponding picture group
        const picture_group = svg_element.querySelector(
          `#picture-${index + 1}`
        ) as SVGElement;

        // Apply effects to bubble
        const filter_element = bubble_el.querySelector("filter deFEOffset");

        if (is_active) {
          // Bubble is active - instant activation
          bubble_el.style.filter = "brightness(1.5) saturate(1.3)";
          bubble_el.style.transition = "none";

          if (filter_element) {
            filter_element.setAttribute("stdDeviation", "5");
          }

          // Light up the corresponding picture instantly
          if (picture_group) {
            picture_group.style.filter = "grayscale(0%) brightness(1.2)";
            picture_group.style.transition = "none";
          }
        } else {
          // Bubble is inactive
          bubble_el.style.filter = "none";
          bubble_el.style.transition = "none";

          if (filter_element) {
            filter_element.setAttribute("stdDeviation", "2");
          }

          // Return picture to grayscale
          if (picture_group) {
            picture_group.style.filter = "grayscale(100%) brightness(1)";
            picture_group.style.transition = "none";
          }
        }
      }
    }
  }

  // Manual scroll handling instead of Anime.js scroll primitives because:
  // 1. Complex viewBox interpolation with 4 stages tied to specific progress points
  // 2. Multi-element coordination (ball, viewBox, bubbles) with different timing
  // 3. Complex bubble logic (stay lit once activated, all lit in final state)
  // 4. Custom path point interpolation for smooth ball movement
  // 5. Better performance control with throttled requestAnimationFrame

  // Add throttled scroll listener for better performance
  let ticking = false;
  function request_tick() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateAnimation();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Set up scroll listener
  window.addEventListener("scroll", request_tick, { passive: true });

  // Initial call to set up the animation
  updateAnimation();

  // Cleanup function
  return () => {
    window.removeEventListener("scroll", request_tick);
  };
}
