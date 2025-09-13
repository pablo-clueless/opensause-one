export const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat("en-NG", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  }).format(new Date(date));
};

export const formatTime = (date: Date | string) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false,
    minute: "numeric",
    second: "numeric",
  }).format(new Date(date));
};
