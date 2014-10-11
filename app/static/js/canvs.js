$(document).ready(function() {

  var canvas = $("canvas");

  var items = {
    text: [],
    image: [],
    link: []
  };

  var redraw = function() {
    var textItems = items.text;
    for (var i = 0, length = textItems.length; i < length; i++) {
      var item = textItems[i];
      canvas.drawText({
        fillStyle: "#000",
        fontSize: 25,
        align: "left",
        respectAlign: true,
        draggable: true, 
        x: item.x, y: item.y,
        maxWidth: item.width,
        text: item.text,
      });
    }

    var imageItems = items.image;
    for (var i = 0, length = imageItems.length; i < length; i++) {
      var item = imageItems[i];
      canvas.drawImage({
        draggable: true, 
        x: item.x, y: item.y,
        source: item.data,
      });
    }
  };

  $.get("/api/items", function(data) {
    items = data.items;
    redraw();
  });

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
