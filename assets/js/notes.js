/*
 * Client-side filtering for the notes index.
 *
 * The searchable text is already in the DOM as data attributes, so there is no
 * index to fetch and no library to load. With a handful of notes that is the
 * right trade. If this ever passes a few dozen entries, move the index into a
 * generated JSON file and fetch it once.
 */
(function () {
    'use strict';

    var input = document.getElementById('notes-q');
    var list = document.getElementById('notes-list');
    if (!input || !list) return;

    var rows = Array.prototype.slice.call(list.querySelectorAll('.note-row'));
    var count = document.getElementById('notes-count');
    var empty = document.getElementById('notes-empty');
    var clear = document.getElementById('notes-clear');
    var tagButtons = Array.prototype.slice.call(document.querySelectorAll('.notes-tag'));

    var activeTag = '';

    function matches(row, terms) {
        var haystack = row.dataset.title + ' ' + row.dataset.tags + ' ' + row.dataset.text;
        // Every term must appear somewhere, so "robot data" narrows rather than widens.
        return terms.every(function (t) {
            return haystack.indexOf(t) !== -1;
        });
    }

    function apply() {
        var terms = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
        var shown = 0;

        rows.forEach(function (row) {
            var tagOk = !activeTag || row.dataset.tags.split(',').indexOf(activeTag) !== -1;
            var textOk = terms.length === 0 || matches(row, terms);
            var visible = tagOk && textOk;
            row.hidden = !visible;
            if (visible) shown++;
        });

        empty.hidden = shown !== 0;
        clear.hidden = input.value.length === 0;

        var total = rows.length;
        count.textContent = shown === total
            ? total + (total === 1 ? ' note' : ' notes')
            : shown + ' of ' + total + ' notes';
    }

    input.addEventListener('input', apply);

    clear.addEventListener('click', function () {
        input.value = '';
        input.focus();
        apply();
    });

    input.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && input.value) {
            input.value = '';
            apply();
        }
    });

    tagButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            activeTag = btn.dataset.tag.toLowerCase();
            tagButtons.forEach(function (b) {
                b.classList.toggle('is-on', b === btn);
                b.setAttribute('aria-pressed', String(b === btn));
            });
            apply();
        });
    });

    // "/" focuses search, the way most documentation sites behave.
    document.addEventListener('keydown', function (event) {
        if (event.key === '/' && document.activeElement !== input) {
            event.preventDefault();
            input.focus();
        }
    });

    apply();
})();
