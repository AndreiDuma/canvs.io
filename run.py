#!/usr/bin/env python

from app import app
from utils.database import init_db

init_db()
app.run(debug=True)
