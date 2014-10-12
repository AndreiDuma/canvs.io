$(document).ready(function() {

  var itemsElem = $("#items");
  itemsElem.draggable();

  var createTextElem = function(textItem) {
    var elem = $('<div class="item item-text"></div>'),
        textElem = $('<div class="text"></div>'),
        inputElem = $('<textarea placeholder="Text..."></textarea>'),
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
    elem.draggable({scroll: true, stack: ".item"});
    elem.resizable({minWidth: 100, minHeight: 100});

    editButton.click(function() {
      textElem.hide();
      inputElem.val(textItem.text).show();
      editButton.hide();
      okButton.show().click(function() {
        // TODO request to server
        textItem.text = inputElem.val();

        $.post('/api/save/text', textItem, function() {
          inputElem.hide();
          textElem.text(textItem.text);
          textElem.show();
          okButton.hide();
          editButton.show();
        });
      });
    });

    deleteButton.click(function() {
      // TODO request to server
      elem.remove();
    });

    return elem;
  };

  var createImageElem = function(imageItem) {
    var elem = $('<div class="item item-image"></div>'),
        imageElem = $('<img></img>'),
        urlElem = $('<input type="text"/>'),
        okButton = $('<div class="ok-button"></div>'),
        editButton = $('<div class="edit-button"></div>'),
        deleteButton = $('<div class="delete-button"></div>');
    elem.append(imageElem, urlElem, okButton, editButton, deleteButton);
    imageElem.attr('src', imageItem.url);
    elem.css({
      left: imageItem.x + "px",
      top: imageItem.y + "px",
      width: imageItem.size + "px"
    });
    elem.appendTo(itemsElem);
    elem.draggable({scroll: true, stack: ".item"});
    elem.resizable({aspectRatio: true, minWidth: 50, minHeight: 50});

    editButton.click(function() {
      imageElem.hide();
      urlElem.val(imageItem.url).show();
      editButton.hide();
      okButton.show().click(function() {
        // TODO request to server
        urlElem.hide();
        imageItem.url = urlElem.val();
        imageElem.attr("src", imageItem.url);
        imageElem.show();
        okButton.hide();
        editButton.show();
      });
    });

    deleteButton.click(function() {
      // TODO request to server
      elem.remove();
    });

    return elem;
  };


  setTimeout(function() {
    $("body").scrollTop(49900);
    $("body").scrollLeft(49900);
  }, 0);

  /* Load the items and render all items of each type */
  $.get("/api/items", function(data) {
    var items = data.items;

    console.log(data);
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

  context.init({
    fadeSpeed: 0,
  });
  context.attach("#items", [{
    text: 'Add text',
    action: function(e) {
      e.preventDefault();
      var newText = createTextElem({
        x: e.pageX,
        y: e.pageY,
        text: "",
        width: 300,
        height: 100
      });
      newText.find('.edit-button').click();
      newText.find('textarea').focus();
    }
  }, {
    text: 'Insert image',
    action: function(e) {
      e.preventDefault();
      var newImage = createImageElem({
        x: e.pageX,
        y: e.pageY,
        url: "",
        size: 400
      });
      newImage.find('.edit-button').click();
      newImage.find('input').focus();
    }
  }, {
    text: 'Create link',
    href: '#' // TODO add links
  }, {
		divider: true
  }, {
		text: 'About',
    href: 'https://github.com/AndreiDuma/canvs.io',
    target: '_blank'
  }]);
});
