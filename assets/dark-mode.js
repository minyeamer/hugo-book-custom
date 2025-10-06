document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('dark-mode-toggle');
  const darkClass = 'dark-mode';
  const storageKey = 'hugo-dark-mode';

  function setDarkMode(on) {
    if (on) {
      document.documentElement.classList.add(darkClass);
    } else {
      document.documentElement.classList.remove(darkClass);
    }
    localStorage.setItem(storageKey, on ? 'dark' : 'light');
  }

  function getPref() {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      setDarkMode(!document.documentElement.classList.contains(darkClass));
    });
    setDarkMode(getPref());
  } else {
    setDarkMode(getPref());
  }
});