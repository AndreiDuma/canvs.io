from flask import render_template, send_file
from app import app

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/api/items', methods=['GET'])
def items():
    return send_file('sample.json')
