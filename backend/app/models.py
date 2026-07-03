from sqlalchemy import Column, Integer, String, ForeignKey
from .database import Base


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    company = Column(String, nullable=False)
    location = Column(String)
    description = Column(String)
    skills = Column(String)


class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String)

    resume = Column(String)

    extracted_skills = Column(String)

    match_score = Column(Integer, default=0)

    status = Column(String, default="Applied")

    job_id = Column(Integer, ForeignKey("jobs.id"))


class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)

    candidate_id = Column(Integer, ForeignKey("candidates.id"))

    job_id = Column(Integer, ForeignKey("jobs.id"))

    date = Column(String)

    time = Column(String)

    mode = Column(String)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)