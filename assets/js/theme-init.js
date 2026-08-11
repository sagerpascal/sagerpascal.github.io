/*
 * Applies the stored theme before first paint so the page never flashes the
 * wrong palette. Must stay a small blocking script in <head>.
 */
(function () {
    // Runs before the stylesheet paints, so `.js` is the safe hook for styles
    // that would hide content if the script never arrived — the reveal
    // animation starts every element at opacity 0.
    document.documentElement.classList.add('js');
    document.documentElement.classList.remove('no-js');

    var theme;
    try {
        theme = localStorage.getItem('theme-preference');
    } catch (e) {
        theme = null;
    }
    if (!theme) {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.dataset.theme = theme;
})();
