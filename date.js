
exports.getDate = function() {
  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "2-digit"
  }
  return today.toLocaleDateString("en-AU", options);
}

exports.getTimeDate = function() {
  const timeToday = new Date();

  const options2 = {
    day: "numeric",
    month: "numeric",
    year: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  }
  return timeToday.toLocaleDateString("en-AU", options2);
}
