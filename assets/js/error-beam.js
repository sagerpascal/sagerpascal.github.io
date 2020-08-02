function setBeam(x, y) {
    $('.torch').css({
        'left': x,
        'top': y
    });
}

$(document).mousemove(function (event) {
    setBeam(event.pageX, event.pageY);
});

$(document).touchmove(function (event) {
    setBeam(event.touches[0].clientX, event.touches[0].clientY);
});