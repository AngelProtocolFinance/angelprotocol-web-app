export default function formatTimer(deadline: string | number) {
  const dueTime =
    typeof deadline === "string"
      ? new Date(deadline.replace(/-/g, "/")).getTime()
      : new Date(deadline).getTime();
  const now = new Date().getTime();
  var seconds = Math.floor((dueTime - now) / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

  return {
    days: days >= 10 ? days : `0${days}`,
    hours: hours >= 10 ? hours : `0${hours}`,
    minutes: minutes >= 10 ? minutes : `0${minutes}`,
    seconds: seconds >= 10 ? seconds : `0${seconds}`,
  };
}
