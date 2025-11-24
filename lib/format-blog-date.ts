export function formatBlogDate(dateString: string): string {
  // Parse the input UTC date
  const utcDate = new Date(dateString);
  
  // Get current time
  const now = new Date();
  
  // Calculate difference using UTC timestamps (no timezone conversion needed)
  const diffMs = now.getTime() - utcDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // If less than 30 days old → show relative time
  if (diffDays < 8) {
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 0) return "Just now"; // Handle future dates
    return `${diffDays} days ago`;
  }

  // Otherwise → show formatted absolute date in IST (UTC+5:30)
  return utcDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Kolkata", // IST timezone
  });
}
