from flask import render_template, send_file, request
from app import app
from utils.database import db_session
from app.models import Text, Image


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/api/items', methods=['GET'])
def items():
    return send_file('sample.json')

@app.route('/api/items/add-text', methods=['POST'])
def add_text():
    try:
        x = request.args.get("x")
        y = request.args.get("y")
        width = request.args.get("width")
        text = request.args.get("text")

        new_text = Text(x, y, width, text)
        db_session.add(new_text)
        db_session.commit()

        return "Done."

    except:
        return "Failure."

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
