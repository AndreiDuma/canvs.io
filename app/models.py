from sqlalchemy import Column, Integer, String
from db_utils import Base


class User(Base):
    """
    Just for testing purposes so far.
    """

    __tablename__= 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(128), unique=True)

    def __init__(self, username):
        self.username = username

    def __repr__(self):
        return '<User %r>' % self.username
