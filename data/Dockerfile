FROM python:3.9

WORKDIR /app

COPY ./data/requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY ./data/seed_data.py .
COPY ./data/posts.json .

CMD ["python", "seed_data.py"]