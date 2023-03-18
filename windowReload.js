Object.defineProperty(window.location, 'reload', {
  configurable: true,
});
window.location.reload = jest.fn();