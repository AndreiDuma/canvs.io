from sqlalchemy import Column, Integer, String, Binary
from utils.database import Base


class Text(Base):
    """
    Class for handling texts in our website.
    """

    __tablename__ = 'text'
    id = Column(Integer, primary_key=True)
    x = Column(Integer)
    y = Column(Integer)
    width = Column(Integer)
    text = Column(String)

    def __init__(self, x, y, width, text):
        self.x = x
        self.y = y
        self.width = width
        self.text = text

    def __repr__(self):
        return '<Text: Position: (%d, %d), Width: %d, Text: %r>' % (self.x, self.y, self.width, self.text)

class Image(Base):
    """
    Class for handling images in our website.
    """

    __tablename__ = 'images'
    id = Column(Integer, primary_key=True)
    x = Column(Integer)
    y = Column(Integer)
    url = Column(String)

    def __init__(self, x, y, url):
        self.x = x
        self.y = y
        self.url = url

    def __repr__(self):
        return '<Image: Position: (%d %d)>' % (self.x, self.y)
