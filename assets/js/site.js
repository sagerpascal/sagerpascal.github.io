/*
 * All of the site's behaviour, in one file and without a framework.
 *
 * Everything here degrades: if the script never runs, the page is fully
 * readable — see the `.js` gate in _base.scss.
 */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* --------------------------------------------------------- theme ---- */

    var STORAGE_KEY = 'theme-preference';

    function stored() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;   // Safari private mode throws.
        }
    }

    var toggle = document.getElementById('theme-switch-button');

    if (toggle) {
        toggle.addEventListener('click', function () {
            var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
            document.documentElement.dataset.theme = next;
            try {
                localStorage.setItem(STORAGE_KEY, next);
            } catch (e) {
                // The preference just will not persist.
            }
        });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (event) {
        if (stored()) return;
        document.documentElement.dataset.theme = event.matches ? 'dark' : 'light';
    });

    /* ----------------------------------------------------- navigation ---- */

    var nav = document.getElementById('nav');
    var navToggle = document.getElementById('nav-toggle');

    if (nav) {
        var onScroll = function () {
            nav.classList.toggle('is-stuck', window.scrollY > 8);
        };
        window.addEventListener('scroll', onScroll, {passive: true});
        onScroll();
    }

    if (navToggle && nav) {
        navToggle.addEventListener('click', function () {
            var open = nav.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', String(open));
            navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
            document.body.style.overflow = open ? 'hidden' : '';
        });

        nav.querySelectorAll('.nav-links a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && nav.classList.contains('is-open')) {
                navToggle.click();
            }
        });
    }

    /* ---------------------------------------------------- line reveal ---- */

    // Wrap each visual line of a heading in its own overflow-hidden box so the
    // lines can slide up from behind their own edge. Done by measuring where
    // the browser actually broke the text, so it survives any wrap.
    function splitLines(el) {
        var text = el.textContent.trim();
        if (!text) return;

        el.textContent = '';
        var words = text.split(/\s+/).map(function (word, i) {
            var span = document.createElement('span');
            span.textContent = word;
            span.style.display = 'inline-block';
            el.appendChild(span);
            if (i < text.split(/\s+/).length - 1) el.appendChild(document.createTextNode(' '));
            return span;
        });

        var lines = [];
        var current = null;
        var lastTop = null;

        words.forEach(function (span) {
            var top = span.offsetTop;
            if (lastTop === null || Math.abs(top - lastTop) > 2) {
                current = [];
                lines.push(current);
                lastTop = top;
            }
            current.push(span.textContent);
        });

        el.textContent = '';
        lines.forEach(function (line, i) {
            var outer = document.createElement('span');
            outer.className = 'line';
            var inner = document.createElement('span');
            inner.style.setProperty('--i', i);
            inner.textContent = line.join(' ');
            outer.appendChild(inner);
            el.appendChild(outer);
            // The .line boxes are blocks, so this whitespace collapses visually,
            // but without it textContent runs the lines together — a screen
            // reader would say "went" and "out" as one word.
            if (i < lines.length - 1) el.appendChild(document.createTextNode(' '));
        });
    }

    if (!reduceMotion) {
        document.querySelectorAll('.reveal-lines').forEach(splitLines);
    }

    /* -------------------------------------------------------- reveals ---- */

    var revealTargets = document.querySelectorAll('.reveal, .reveal-lines');

    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealTargets.forEach(function (el) {
            el.classList.add('is-in');
        });
    } else {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-in');
                observer.unobserve(entry.target);
            });
        }, {rootMargin: '0px 0px -10% 0px'});

        revealTargets.forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ------------------------------------------------------- counters ---- */

    // Count a number up once, when it first scrolls into view.
    function runCounter(el) {
        var target = parseFloat(el.dataset.count);
        if (isNaN(target)) return;

        var start = performance.now();
        var duration = 1100;

        var step = function (now) {
            var t = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased).toLocaleString('en-CH');
            if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }

    var counters = document.querySelectorAll('[data-count]');

    if (reduceMotion || !('IntersectionObserver' in window)) {
        counters.forEach(function (el) {
            el.textContent = Number(el.dataset.count).toLocaleString('en-CH');
        });
    } else {
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                runCounter(entry.target);
                counterObserver.unobserve(entry.target);
            });
        }, {threshold: 0.6});

        counters.forEach(function (el) {
            counterObserver.observe(el);
        });
    }

    /* ---------------------------------------------------- copy BibTeX ---- */

    document.querySelectorAll('[data-bib]').forEach(function (btn) {
        var label = btn.querySelector('span');
        var original = label ? label.textContent : '';

        btn.addEventListener('click', function () {
            navigator.clipboard.writeText(btn.dataset.bib).then(function () {
                if (!label) return;
                label.textContent = 'Copied';
                btn.classList.add('is-copied');
                setTimeout(function () {
                    label.textContent = original;
                    btn.classList.remove('is-copied');
                }, 1600);
            }).catch(function () {
                // Clipboard blocked (insecure origin, or the user said no).
                if (label) label.textContent = 'Press Ctrl+C';
            });
        });
    });

    /* ---------------------------------------------------- Zurich clock ---- */

    var clocks = document.querySelectorAll('#clock, #clock-contact');

    if (clocks.length) {
        var fmt = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Europe/Zurich',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        var tick = function () {
            var now = fmt.format(new Date());
            clocks.forEach(function (el) {
                el.textContent = now;
            });
        };
        tick();
        setInterval(tick, 1000);
    }

    /* --------------------------------------------------------- hero net ---- */

    // A field of drifting fragments; nearby ones link up into small networks,
    // and the cursor pulls extra structure out of the field. Decorative only.
    var canvas = document.getElementById('hero-net');

    if (canvas && !reduceMotion) {
        var ctx = canvas.getContext('2d');
        var nodes = [];
        var pointer = {x: -9999, y: -9999};
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        var w = 0;
        var h = 0;

        // The backing store has to be re-sized whenever the hero's own box
        // changes, not just on window resize. Sizing it once at load left the
        // bitmap smaller than its display size after web fonts landed and the
        // hero grew, and the browser then scaled it up, which is what made the
        // nodes look coarse and oversized.
        var resize = function () {
            var r = canvas.getBoundingClientRect();
            if (r.width < 1 || r.height < 1) return;

            w = r.width;
            h = r.height;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            var count = Math.min(Math.round((w * h) / 9000), 160);
            nodes = Array.from({length: count}, function () {
                return {
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.14,
                    vy: (Math.random() - 0.5) * 0.14
                };
            });
        };

        var readInk = function () {
            return getComputedStyle(document.documentElement)
                .getPropertyValue('--ink').trim() || '#2f2625';
        };

        var ink = readInk();

        var frame = function () {
            ctx.clearRect(0, 0, w, h);

            nodes.forEach(function (n) {
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0 || n.x > w) n.vx *= -1;
                if (n.y < 0 || n.y > h) n.vy *= -1;
            });

            for (var i = 0; i < nodes.length; i++) {
                var a = nodes[i];

                for (var j = i + 1; j < nodes.length; j++) {
                    var b = nodes[j];
                    var dx = a.x - b.x;
                    var dy = a.y - b.y;
                    var dist = Math.hypot(dx, dy);
                    if (dist > 96) continue;

                    ctx.globalAlpha = (1 - dist / 96) * 0.16;
                    ctx.strokeStyle = ink;
                        ctx.lineWidth = 0.7;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }

                var pd = Math.hypot(a.x - pointer.x, a.y - pointer.y);
                var near = pd < 150;

                ctx.globalAlpha = near ? 0.5 : 0.2;
                ctx.fillStyle = ink;
                ctx.beginPath();
                ctx.arc(a.x, a.y, near ? 1.5 : 1, 0, Math.PI * 2);
                ctx.fill();

                if (near) {
                    ctx.globalAlpha = (1 - pd / 150) * 0.26;
                    ctx.strokeStyle = ink;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(pointer.x, pointer.y);
                    ctx.stroke();
                }
            }

            ctx.globalAlpha = 1;
            requestAnimationFrame(frame);
        };

        var hero = canvas.closest('.hero, .error-page') || canvas.parentElement;
        hero.addEventListener('pointermove', function (event) {
            var r = canvas.getBoundingClientRect();
            pointer.x = event.clientX - r.left;
            pointer.y = event.clientY - r.top;
        });
        hero.addEventListener('pointerleave', function () {
            pointer.x = pointer.y = -9999;
        });

        // The ink colour changes with the theme.
        new MutationObserver(function () {
            ink = readInk();
        }).observe(document.documentElement, {attributes: true, attributeFilter: ['data-theme']});

        if ('ResizeObserver' in window) {
            new ResizeObserver(resize).observe(hero);
        } else {
            window.addEventListener('resize', resize);
        }

        // Web fonts change the hero's height when they land.
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(resize);
        }

        resize();
        requestAnimationFrame(frame);
    }
})();
