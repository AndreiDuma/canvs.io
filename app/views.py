from flask import render_template, send_file, request
from app import app
from app.models import Text, Image

from utils.database import db_session
import base64
import json



@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


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
        x = request.args.get("x")
        print x
        y = request.args.get("y")
        width = request.args.get("width")
        text = request.args.get("text")

        new_text = Text(x, y, width, text)
        print new_text
        db_session.add(new_text)
        db_session.commit()

        return "Done."

    except Exception as e:
        return "Failure: " + e.message


@app.route('/api/items/add-image', methods=['POST'])
def add_image():
    try:
        x = request.args.get("x")
        y = request.args.get("y")
        data = request.args.get("data")

        new_image = Image(x, y, data)
        db_session.add(new_image)
        db_session.commit()

        return "Done."

    except:
        return "Failure."
