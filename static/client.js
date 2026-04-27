/**
 * UI Elements for Kafka message production.
 * @type {HTMLFormElement}
 */
const singleMessageForm = document.getElementById("single-message-form");

/**
 * @type {HTMLInputElement}
 */
const frequentEvents = document.getElementById("frequent-events");

/**
 * @type {HTMLInputElement}
 */
const intervalLength = document.getElementById("interval-length");

/** Reference to the active interval for automated JSON event production.
 * @type {Timer | null}
 */
let pollInterval = null;

/**
 * Handles the submission of the single message form.
 * Prevents default page reload and sends data via fetch API.
 * @param {SubmitEvent} e - The form submission event.
 * @returns {Promise<void>}
 */
singleMessageForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(singleMessageForm);

  try {
    await fetch("/api/newMessage", {
      method: "POST",
      body: formData,
    });
    singleMessageForm.reset();
  } catch (err) {
    console.error("Failed to send plaintext message:", err);
  }
});

/**
 * Toggles the frequent JSON message production based on checkbox state.
 * When enabled, sends a POST request every 1000ms.
 */
frequentEvents.addEventListener("change", updateInterval);
intervalLength.addEventListener("change", updateInterval);

/**
 * Updates or clears the message production interval.
 * Clears existing intervals and restarts if frequentEvents is checked.
 */
function updateInterval() {
  clearInterval(pollInterval);
  pollInterval = null;

  if (!frequentEvents.checked) return;

  const ms = parseInt(intervalLength.value, 10) || 1000;

  pollInterval = setInterval(() => {
    fetch("/api/sendJSON", {
      method: "POST",
    }).catch((err) => console.error("Frequent event failed:", err));
  }, ms);
}
