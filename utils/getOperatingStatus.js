// export function getOperatingStatus(timings) {
//   const daysOfWeek = [
//     "sunday",
//     "monday",
//     "tuesday",
//     "wednesday",
//     "thursday",
//     "friday",
//     "saturday",
//   ];

//   const now = new Date();
//   const currentDay = daysOfWeek[now.getDay()];
//   const todayTiming = timings?.[currentDay];

//   if (!todayTiming) {
//     return {
//       status: "Closed",
//       message: "Operating hours info coming soon",
//     };
//   }

//   const openTime = new Date(todayTiming.open);
//   const closeTime = new Date(todayTiming.close);

//   const isOpen = now >= openTime && now <= closeTime;

//   const formatTime = (date) =>
//     date.toLocaleTimeString("en-US", {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     });

//   if (isOpen) {
//     return {
//       status: "Open",
//       message: `Open until ${formatTime(closeTime)}`,
//     };
//   } else {
//     return {
//       status: "Closed",
//       message: `Closed - Opens at ${formatTime(openTime)}`,
//     };
//   }
// }
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
  const currentDay = daysOfWeek[now.getDay()];
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
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  };

  const openTime = getTodayDateTime(extractLocalTime(todayTiming.open));
  const closeTime = getTodayDateTime(extractLocalTime(todayTiming.close));

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const isOpen = now >= openTime && now < closeTime;
  const minutesUntilOpen = (openTime - now) / 60000; // in minutes
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
