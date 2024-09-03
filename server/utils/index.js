/**
 * Extracts the domain from a given URL.
 *
 * @param {string} url - The URL from which to extract the domain.
 * @returns {string|null} - The extracted domain or null if the URL is invalid.
 */
function extractDomain(url) {
  try {
    // Create a new URL object
    const parsedUrl = new URL(url);

    // Extract the hostname, e.g., 'www.crio.do'
    const hostname = parsedUrl.hostname;

    // Split the hostname by dots and get the last two parts, e.g., 'crio' and 'do'
    const parts = hostname.split(".").slice(-2);

    // Join the last two parts to form the domain, e.g., 'crio.do'
    const domain = parts.join(".");

    return domain;
  } catch (error) {
    // Log error message for debugging
    console.error(
      "Invalid URL! Enter a full website address including https.",
      error
    );
    return null;
  }
}

/**
 * Formats an ISO date string into a human-readable format.
 *
 * @param {string} isoDateString - The ISO date string to format.
 * @returns {string} - The formatted date and time string in the format 'YYYY-MM-DD HH:MM AM/PM'.
 */
function formatDate(isoDateString) {
  // Create a new Date object from the ISO string
  const date = new Date(isoDateString);

  // Get the components of the date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");

  // Get the hours and minutes
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12 || 12; // Convert 0 to 12 for midnight

  // Format the time string
  const time = `${hours}:${minutes} ${ampm}`;

  // Combine the date and time components
  return `${year}-${month}-${day} ${time}`;
}

module.exports = { extractDomain, formatDate };
