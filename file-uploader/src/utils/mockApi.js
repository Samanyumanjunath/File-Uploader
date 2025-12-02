// src/utils/mockApi.js

// A helper to pause execution (makes async/await possible for delays)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const uploadFileMock = async (file, updateProgress) => {
  // 1. Determine if this specific upload will fail (25% chance)
  // Math.random() returns 0.0 to 1.0. If < 0.25, it's a fail.
  const shouldFail = Math.random() < 0.25; 

  // 2. Determine WHEN it will fail (randomly between 30% and 80%)
  const failAt = Math.floor(Math.random() * 50) + 30;

  let progress = 0;

  // 3. Start the async loop
  while (progress < 100) {
    // Slower speed: Wait 100ms between chunks
    await sleep(30); 

    // Increment progress by a small random amount (1-3%)
    progress += Math.floor(Math.random() * 3) + 1;

    // Cap at 100
    if (progress > 100) progress = 100;

    // Send progress back to UI
    updateProgress(progress);

    // Check for simulated failure
    if (shouldFail && progress >= failAt) {
      throw new Error("Network Error: Connection lost");
    }
  }

  // If loop finishes, return success
  return { success: true, message: "Upload complete" };
};