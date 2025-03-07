FROM python:3.10.12

WORKDIR /dack-backend

COPY requirements.txt ./
COPY requirements.txt /requirements.txt
RUN pip install --no-cache-dir --upgrade -r /requirements.txt

COPY . /dack-backend/

CMD ["gunicorn", "backend:app", "-b", "0.0.0.0:5000"]

