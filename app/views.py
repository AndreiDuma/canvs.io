from flask import render_template, send_file, request
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

    return json.dumps(content)


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

        return "Done."

    except Exception as e:
        return "Failure: " + e.message


@app.route('/api/items/add-image', methods=['POST'])
def add_image():
    try:
        x = request.form.get("x")
        y = request.form.get("y")
        data = request.form.get("data")

        new_image = Image(x, y, data)
        db_session.add(new_image)
        db_session.commit()

        return "Done."

    except:
        return "Failure."
