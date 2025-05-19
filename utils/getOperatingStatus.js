export function getOperatingStatus(timings, bufferMins = 30) {
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const now = new Date();
  const currentDayIndex = now.getDay();
  const currentDay = daysOfWeek[currentDayIndex];
  const todayTiming = timings?.[currentDay];

  if (!todayTiming) {
    return {
      status: "Closed",
      message: "Operating hours info coming soon",
    };
  }

  const extractLocalTime = (isoString) => {
    const date = new Date(isoString);
    return {
      hours: date.getHours(),
      minutes: date.getMinutes(),
    };
  };

  const getTodayDateTime = ({ hours, minutes }) => {
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const open = extractLocalTime(todayTiming.open);
  const close = extractLocalTime(todayTiming.close);

  const openTime = getTodayDateTime(open);
  let closeTime = getTodayDateTime(close);

  // 🔁 Handle overnight closing (e.g., 3:30 PM → 2:00 AM next day)
  if (closeTime <= openTime) {
    closeTime.setDate(closeTime.getDate() + 1);
  }

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const isOpen = now >= openTime && now < closeTime;
  const minutesUntilOpen = (openTime - now) / 60000;
  const minutesUntilClose = (closeTime - now) / 60000;

  if (isOpen) {
    if (minutesUntilClose <= bufferMins) {
      return {
        status: "Closing Soon",
        message: `Closing at ${formatTime(closeTime)}`,
      };
    } else {
      return {
        status: "Open",
        message: `Open until ${formatTime(closeTime)}`,
      };
    }
  } else if (minutesUntilOpen > 0 && minutesUntilOpen <= bufferMins) {
    return {
      status: "Opening Soon",
      message: `Opening at ${formatTime(openTime)}`,
    };
  } else {
    return {
      status: "Closed",
      message: `Closed - Opens at ${formatTime(openTime)}`,
    };
  }
}
