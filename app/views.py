from flask import render_template, send_file, request, Response
from app import app
from app.models import Text, Image

from utils.database import db_session
import base64
import json



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
        'text' : item.text
    } for item in Text.query.all()]

    content['items']['images'] = [{
        'id' : item.id,
        'x' : item.x,
        'y' : item.y,
        'data' : base64.b64encode(item.data)
    } for item in Image.query.all()]

    return Response(json.dumps(content), 200)


@app.route('/api/items/add-text', methods=['POST'])
def add_text():
    try:
        x = request.form.get("x")
        y = request.form.get("y")
        width = request.form.get("width")
        text = request.form.get("text")

        new_text = Text(x, y, width, text)
        db_session.add(new_text)
        db_session.commit()
        return Response("POST finished successfully", status=200)

    except Exception as e:
        return Response("Failure: " + e.message, status=400)


@app.route('/api/items/add-image', methods=['POST'])
def add_image():
    try:
        x = request.form.get("x")
        y = request.form.get("y")
        data = request.form.get("data")

        new_image = Image(x, y, data)
        db_session.add(new_image)
        db_session.commit()

        return Response(status=200)

    except Exception as e:
        print "Failure: " + e.message
        return Response(status=400)


@app.route('/api/items/update-text', methods=['PUT'])
def update_text():
    try:
        id = request.form.get("id")
        if id is None:
            return Response("The id is mandatory for a PUT", status=400)

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

        text = request.form.get("text")
        if text != None and Text.query.get(id).text != text:
            Text.query.get(id).text = text

        db_session.commit()
        return Response("PUT finished successfully", status=200)

    except Exception as e:
        return Response("Failure: " + e.message, status=400)


@app.route('/api/items/update-image', methods=['PUT'])
def update_image():
    try:
        id = request.form.get("id")
        if id is None:
            return Response("Failure: id is mandatory", status=400)

        if Text.query.get(id) is None:
            return Response("Failure: the given id does not exist", status=400)

        x = request.form.get("x")
        if x != None and Text.query.get(id).x != x:
            Text.query.get(id).x = x

        y = request.form.get("y")
        if y != None and Text.query.get(id).y != y:
            Text.query.get(id).y = y

        data = request.form.get("data")
        if data != None and Text.query.get(id).data != data:
            Text.query.get(id).data = data

        db_session.commit()
        return Response(status=200)

    except Exception as e:
        return Response("Failure: " + e.message, status=400)


@app.route('/api/items/delete-<model>', methods=['DELETE'])
def delete_instance(model):
    if model != 'text' or model != 'image':
        return Response("Failure: invalid URL for deleting", status=400)

    id = request.form.get("id")
    if id is None:
        return Response("Failure: id is mandatory", status=400)

    if Text.query.get(id) is None:
        return Response("Failure: the given id does not exist", status=400)

    db_session.delete(Text.query.get(id) if model == 'text' else Image.query.get(id))
    db_session.commit()
    return Response("DELETE finished successfully", status=200)


# @app.route('/api/items/go-to', methods=['POST'])
# def go_to():
#     x_coord = request.form.get("x")
#     y_coord = request.form.get("y")
