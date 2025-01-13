import { format } from "date-fns";

export const formatDate = (isoDate, formatPattern = "MMM d, yyyy h:mm a") => {
  if (!isoDate) return "Invalid Date"; // Handle missing or invalid dates
  const parsedDate = new Date(isoDate);

  if (isNaN(parsedDate)) return "Invalid Date"; // Handle invalid dates

  return format(parsedDate, formatPattern);
};
