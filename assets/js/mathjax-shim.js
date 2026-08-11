/*
 * kramdown renders maths as <script type="math/tex"> blocks, which is the
 * MathJax 2 convention. Rewrite them into the \( \) and \[ \] delimiters
 * MathJax 3 expects, then load MathJax — but only if the page has any maths,
 * so text-only posts do not pay for a ~1 MB download.
 *
 * Previously this lived inline in the post layout and loaded MathJax on every
 * post regardless.
 */
(function () {
    'use strict';

    function stripCdata(text) {
        // kramdown wraps the TeX in a CDATA comment for XHTML compatibility.
        if (text.startsWith('% <![CDATA[') && text.endsWith('%]]>')) {
            return text.substring(11, text.length - 4);
        }
        return text;
    }

    var inline = document.querySelectorAll("script[type='math/tex']");
    var display = document.querySelectorAll("script[type='math/tex; mode=display']");

    if (inline.length === 0 && display.length === 0) return;

    inline.forEach(function (el) {
        el.outerHTML = '\\(' + stripCdata(el.textContent) + '\\)';
    });

    display.forEach(function (el) {
        el.outerHTML = '\\[' + stripCdata(el.textContent) + '\\]';
    });

    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js';
    script.async = true;
    document.head.appendChild(script);
})();
