export enum Direction {
  fromLeft = "from-left",
  fromRight = "from-right",
  fromTop = "from-top",
  fromBottom = "from-bottom",
  fromDot = "from-dot",
  fromFront = "from-front",
}

//TODO: remove used by marketing site
export default function transitionIn(cue: boolean, direction: Direction) {
  const init = "relative transition-all duration-700";
  let transition = "";
  switch (direction) {
    case Direction.fromLeft: {
      transition = cue ? "left-0 opacity-1" : "-left-8 opacity-0";
      break;
    }
    case Direction.fromRight: {
      transition = cue ? "right-0 opacity-1" : "-right-8 opacity-0";
      break;
    }
    case Direction.fromTop: {
      transition = cue ? "top-0 opacity-1" : "-top-8 opacity-0";
      break;
    }
    case Direction.fromBottom: {
      transition = cue ? "bottom-0 opacity-1" : "-bottom-8 opacity-0";
      break;
    }
    case Direction.fromDot: {
      transition = cue
        ? "transform scale-100 opacity-1"
        : "transform scale-50 opacity-0";
      break;
    }
    case Direction.fromFront: {
      transition = cue
        ? "transform scale-100 opacity-1"
        : "transform scale-110 opacity-0";
      break;
    }
    default: {
      transition = "";
    }
  }

  return init + " " + transition;
}
