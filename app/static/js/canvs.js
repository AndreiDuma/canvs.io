$(document).ready(function() {

  /*
  var canvas = $("canvas");

  var loadItems = function() {
    $.get("/api/items", function(data) {
      var items = data.items;

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
    });
  };

  var resizeCanvas = function() {
    canvas.get(0).width = $(window).width();
    canvas.get(0).height = $(window).height();
    canvas.drawLayers();
  };

  var initialize = function() {
    $(window).resize(resizeCanvas);
    resizeCanvas();
    loadItems();
  };

  initialize();
  */

  $("#items").draggable();

  $("body").scrollTop(50000);
  $("body").scrollLeft(50000);

  $.get("/api/items-mock", function(data) {
    var items = data.items,
        itemsElem = $("#items");

    var textItems = items.text;
    for (var i = 0, length = textItems.length; i < length; i++) {
      var item = textItems[i];

      var elem = $('<div class="item text"></div>');
      elem.text(item.text);
      elem.css({
        left: item.x,
        top: item.y,
        width: item.width
      });
      elem.draggable({scroll: true});
      elem.appendTo(itemsElem);
    }

    var imageItems = items.image;
    for (var i = 0, length = imageItems.length; i < length; i++) {
      var item = imageItems[i];

      var elem = $('<div class="item image"></div>'),
          imgElem = $('<img></img>');
      imgElem.attr("src", item.data).appendTo(elem);
      elem.css({
        left: item.x,
        top: item.y,
        width: item.width,
        height: item.height
      });
      elem.draggable({scroll: true});
      elem.appendTo(itemsElem);
    }
  });

});
