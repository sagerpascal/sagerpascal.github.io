function setBeam(event) {
    $('.torch').css({
        'top': event.pageY,
        'left': event.pageX
    });
}

$(document).mousemove(function (event) {
    setBeam(event);
});

$(document).touchmove(function (event) {
    setBeam(event);
});