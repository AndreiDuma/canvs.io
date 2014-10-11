#!/usr/bin/env python

from app import app
from db_utils import init_db

init_db()
app.run(debug=True)
