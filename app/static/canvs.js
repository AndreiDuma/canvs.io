$(document).ready(function() {

  var canvas = $('canvas');

  var redraw = function() {
    canvas.drawRect({
      fillStyle: '#000',
      x: 0, y: 0,
      width: 100, height: 100
    });

  canvas.drawText({
    fillStyle: 'red',
    x: 100, y: 100,
    fontSize: '50px',
    text: 'Hello'
  });
  };

  var resizeCanvas = function() {
    canvas.get(0).width = $(window).width();
    canvas.get(0).height = $(window).height();
    redraw();
  };

  var initialize = function() {
    $(window).resize(resizeCanvas);
    resizeCanvas();
  };

  initialize();

});
