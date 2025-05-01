export function getOperatingStatus(timings) {
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
  const currentDay = daysOfWeek[now.getDay()];
  const todayTiming = timings?.[currentDay];

  if (!todayTiming) {
    return {
      status: "Closed",
      message: "Operating hours info coming soon",
    };
  }

  const openTime = new Date(todayTiming.open);
  const closeTime = new Date(todayTiming.close);

  const isOpen = now >= openTime && now <= closeTime;

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  if (isOpen) {
    return {
      status: "Open",
      message: `Open until ${formatTime(closeTime)}`,
    };
  } else {
    return {
      status: "Closed",
      message: `Closed - Opens at ${formatTime(openTime)}`,
    };
  }
}
