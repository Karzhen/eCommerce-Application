export default function formatDateTime(dateString: string) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  const timezoneOffset = date.getTimezoneOffset();
  const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffset / 60))
    .toString()
    .padStart(2, '0');
  const timezoneOffsetMinutes = (Math.abs(timezoneOffset) % 60)
    .toString()
    .padStart(2, '0');
  const timezoneSign = timezoneOffset >= 0 ? '-' : '+';
  const formattedTimezone = `GMT${timezoneSign}${timezoneOffsetHours}:${timezoneOffsetMinutes}`;

  return `${formattedDate} ${formattedTime} ${formattedTimezone}`;
}
