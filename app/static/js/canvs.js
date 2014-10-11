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

    deleteButton.click(function() {
      // TODO request to server
      elem.remove();
    });
  };

  var createImageElem = function(imageItem) {
    var elem = $('<div class="item item-image"></div>'),
        imageElem = $('<img></img>'),
        deleteButton = $('<div class="delete-button"></div>');
    elem.append(imageElem, deleteButton);
    imageElem.attr('src', imageItem.data);
    elem.css({
      left: imageItem.x + "px",
      top: imageItem.y + "px",
      width: imageItem.size + "px"
    });
    elem.appendTo(itemsElem);
    elem.draggable({scroll: true});
    elem.resizable({aspectRatio: true, minWidth: 50, minHeight: 50});

    deleteButton.click(function() {
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
      createTextElem(item);
    }

    var imageItems = items.image;
    for (var i = 0, length = imageItems.length; i < length; i++) {
      var item = imageItems[i];
      createImageElem(item);
    }
  });

});
