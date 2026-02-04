/*
  PinUp Valentine Adventure Script
  - Handles screen navigation and transitions
  - Keeps interactions clean and modular
*/

const screens = Array.from(document.querySelectorAll('.screen'));
const buttons = Array.from(document.querySelectorAll('[data-next]'));

/**
 * Show the requested screen by id and hide the rest.
 * @param {string} nextId - The id of the screen to display.
 */
const showScreen = (nextId) => {
  screens.forEach((screen) => {
    if (screen.id === nextId) {
      screen.classList.add('active');
    } else {
      screen.classList.remove('active');
    }
  });
};

// Listen for all button clicks that should navigate screens.
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const nextId = button.getAttribute('data-next');
    if (nextId) {
      showScreen(nextId);
    }
  });
});
// Initialize the first screen as active on load.
