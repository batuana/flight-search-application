export function getFormattedDate(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;

  return `${day}.${month}.${year}`;
}

export function calculateArrivalTime(departureTime, duration) {
  const [hour, minute] = departureTime.split(":");

  const totalMinutes = +minute + duration;

  const durationHours = Math.floor(totalMinutes / 60);
  const durationMinutes = totalMinutes % 60;

  const newHour = (+hour + durationHours) % 24;
  const newMinute = durationMinutes;

  const newTime = `${newHour}:${newMinute}`;

  return formatTime(newTime);
}

export function formatTime(time) {
  if (time.split(":")[0].length === 1) time = "0" + time;
  if (time.split(":")[1].length === 1)
    time = time.split(":")[0] + ":0" + time.split(":")[1];
  return time;
}

export function reformatMinutes(minutes) {
  const hour = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hour}h${remainingMinutes}m`;
}

export function reformatDate(dateString) {
  const query = dateString.split(".").reverse().join("/");
  return new Date(query);
}
