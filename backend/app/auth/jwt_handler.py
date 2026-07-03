from jose import jwt
from datetime import datetime, timedelta

SECRET = "AIRecruitSecretKey"

ALGORITHM = "HS256"

def create_token(data):

    payload = data.copy()

    payload["exp"] = datetime.utcnow() + timedelta(hours=10)

    return jwt.encode(
        payload,
        SECRET,
        algorithm=ALGORITHM
    )