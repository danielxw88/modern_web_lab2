function simulateDelay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}