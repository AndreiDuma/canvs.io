from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from config import SQLALCHEMY_DATABASE_URI
from app import app


engine = create_engine(SQLALCHEMY_DATABASE_URI, convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))

Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    from app.models import Text
    Base.metadata.create_all(bind=engine)

@app.teardown_appcontext
def teardown_db(exception=None):
    db_session.remove()
