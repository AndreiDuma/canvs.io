$(document).ready(function() {

  $("#items").draggable();

  setTimeout(function() {
    $("body").scrollTop(50000);
    $("body").scrollLeft(50000);
  }, 0);

  $.get("/api/items-mock", function(data) {
    var items = data.items,
        itemsElem = $("#items");

    var textItems = items.text;
    for (var i = 0, length = textItems.length; i < length; i++) {
      var item = textItems[i];

      var elem = $('<div class="item text"></div>');
      elem.html('<div class="inner">' + item.text + '</div>');
      elem.css({
        left: item.x + "px",
        top: item.y + "px",
        width: item.width + "px",
        height: item.height + "px"
      });
      elem.appendTo(itemsElem);
      elem.draggable({scroll: true});
      elem.resizable({minWidth: 100, minHeight: 100});
      elem.dblclick(function(e) {
        var el = $(e.target),
            text = el.text();
        el.html('<textarea></textarea>');
        el.find('textarea').text(text);
      });
    }

    var imageItems = items.image;
    for (var i = 0, length = imageItems.length; i < length; i++) {
      var item = imageItems[i];

      var elem = $('<div class="item image"></div>'),
          imgElem = $('<img></img>');
      imgElem.attr("src", item.data).appendTo(elem);
      elem.css({
        left: item.x + "px",
        top: item.y + "px",
        width: item.width + "px",
        height: item.height + "px"
      });
      elem.appendTo(itemsElem);
      elem.draggable({scroll: true});
      elem.resizable({aspectRatio: true, minWidth: 100, minHeight: 100});
    }
  });

});
