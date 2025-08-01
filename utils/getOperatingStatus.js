export function getOperatingStatus(today) {
  if (!today || !today.open || !today.close) {
    return { status: "Closed" };
  }

  const now = new Date();
  const [openHour, openMinute] = today.open.split(":").map(Number);
  const [closeHour, closeMinute] = today.close.split(":").map(Number);

  const openTime = new Date(now);
  openTime.setHours(openHour, openMinute, 0);

  const closeTime = new Date(now);
  closeTime.setHours(closeHour, closeMinute, 0);

  const diffFromOpen = (openTime - now) / 60000; // in minutes
  const diffToClose = (closeTime - now) / 60000;

  if (now >= openTime && now <= closeTime) {
    if (diffToClose <= 30) {
      return { status: "Closing Soon" };
    }
    return { status: "Open" };
  }

  if (diffFromOpen > 0 && diffFromOpen <= 30) {
    return { status: "Opening Soon" };
  }

  return { status: "Closed" };
}
