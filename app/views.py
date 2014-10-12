from flask import render_template, send_file, request, jsonify, Response
from app import app
from app.models import Text, Image

from utils.database import db_session


"""
Auxiliar function used for adding a new entry in the texts table.
"""
def add_text():
    try:
        x = request.form.get("x")
        y = request.form.get("y")
        width = request.form.get("width")
        height = request.form.get("height")
        text = request.form.get("text")

        new_text = Text(x, y, width, height, text)
        db_session.add(new_text)
        db_session.commit()
        return Response("POST finished successfully", status=200)

    except Exception as e:
        return Response("Failure: " + e.message, status=400)

"""
Auxiliar function used for updating an existing item from the texts table,
through its id.
"""
def update_text(id):
    if Text.query.get(id) is None:
        return Response("Failure: the given id does not exist", status=400)

    x = request.form.get("x")
    if x != None and Text.query.get(id).x != x:
        Text.query.get(id).x = x

    y = request.form.get("y")
    if y != None and Text.query.get(id).y != y:
        Text.query.get(id).y = y

    width = request.form.get("width")
    if width != None and Text.query.get(id).width != width:
        Text.query.get(id).width = width

    height = request.form.get("height")
    if height != None and Text.query.get(id).height != height:
        Text.query.get(id).height = height

    text = request.form.get("text")
    if text != None and Text.query.get(id).text != text:
        Text.query.get(id).text = text

    db_session.commit()
    return Response("PUT finished successfully", status=200)

"""
Auxiliar function used for adding a new entry in the images table.
"""
def add_image():
    try:
        x = request.form.get("x")
        y = request.form.get("y")
        size = request.form.get("size")
        url = request.form.get("url")

        new_image = Image(x, y, size, url)
        db_session.add(new_image)
        db_session.commit()

        return Response(status=200)

    except Exception as e:
        print "Failure: " + e.message
        return Response(status=400)

"""
Auxiliar function used for updating an existing item from the images table,
through its id.
"""
def update_image(id):
    if Text.query.get(id) is None:
        return Response("Failure: the given id does not exist", status=400)

    x = request.form.get("x")
    if x != None and Text.query.get(id).x != x:
        Text.query.get(id).x = x

    y = request.form.get("y")
    if y != None and Text.query.get(id).y != y:
        Text.query.get(id).y = y

    size = request.form.get("size")
    if size != None and Text.query.get(id).size != size:
        Text.query.get(id).size = size

    url = request.form.get("url")
    if url != None and Text.query.get(id).url != url:
        Text.query.get(id).url = url

    db_session.commit()
    return Response(status=200)



@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/api/items-mock', methods=['GET'])
def items_mock():
    return send_file('sample.json')


@app.route('/api/items', methods=['GET'])
def items():
    content = {"items" : {}}

    content['items']['text'] = [{
        'id' : item.id,
        'x' : item.x,
        'y' : item.y,
        'width' : item.width,
        'height' : item.height,
        'text' : item.text
    } for item in Text.query.all()]

    content['items']['image'] = [{
        'id' : item.id,
        'x' : item.x,
        'y' : item.y,
        'size' : item.size,
        'url' : item.url
    } for item in Image.query.all()]

    return jsonify(content)


@app.route('/api/save/<model>', methods=['POST', 'PUT'])
def save_instance(model):
    if model != 'text' and model != 'image':
        return Response("Failure: invalid URL for deleting", status=400)

    id = request.form.get("id")
    return (add_text() if id is None else update_text(id)) if model == 'text'\
           else (add_text() if id is None else update_text(id))


@app.route('/api/delete/<model>', methods=['DELETE'])
def delete_instance(model):
    if model != 'text' and model != 'image':
        return Response("Failure: invalid URL for deleting", status=400)

    id = request.form.get("id")
    if id is None:
        return Response("Failure: id is mandatory", status=400)

    if Text.query.get(id) is None:
        return Response("Failure: the given id does not exist", status=400)

    db_session.delete(Text.query.get(id) if model == 'text' else Image.query.get(id))
    db_session.commit()
    return Response("DELETE finished successfully", status=200)


# TODO
# @app.route('/api/items/go-to', methods=['POST'])
# def go_to():
#     x_coord = request.form.get("x")
#     y_coord = request.form.get("y")
