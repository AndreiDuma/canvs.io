$(document).ready(function() {

  var itemsElem = $("#items");
  itemsElem.draggable();

  var createTextElem = function(textItem) {
    var elem = $('<div class="item item-text"></div>'),
        textElem = $('<div class="text"></div>'),
        inputElem = $('<textarea></textarea>'),
        okButton = $('<div class="ok-button"></div>'),
        editButton = $('<div class="edit-button"></div>'),
        deleteButton = $('<div class="delete-button"></div>');
    elem.append(textElem, inputElem, okButton, editButton, deleteButton);
    textElem.text(textItem.text);
    elem.css({
      left: textItem.x + "px",
      top: textItem.y + "px",
      width: textItem.width + "px",
      height: textItem.height + "px"
    });
    elem.appendTo(itemsElem);
    elem.draggable({scroll: true});
    elem.resizable({minWidth: 100, minHeight: 100});

    editButton.click(function() {
      textElem.hide();
      inputElem.val(textItem.text).show();
      editButton.hide();
      okButton.show().click(function() {
        // TODO request to server
        inputElem.hide();
        textItem.text = inputElem.val();
        textElem.text(textItem.text);
        textElem.show();
        okButton.hide();
        editButton.show();
      });
    });

    elem.find('.delete-button').click(function() {
      // TODO request to server
      elem.remove();
    });
  };


  setTimeout(function() {
    $("body").scrollTop(49900);
    $("body").scrollLeft(49900);
  }, 0);

  $.get("/api/items-mock", function(data) {
    var items = data.items;

    var textItems = items.text;
    for (var i = 0, length = textItems.length; i < length; i++) {
      var item = textItems[i];

      /*
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
      */
      createTextElem(item);
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
