from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime, timezone
from enum import Enum

app = Flask(__name__)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True

app.debug = True


# sqlite:///./tires.db

db_uri = "sqlite:///./tires.db"

app.config["SQLALCHEMY_DATABASE_URI"] = db_uri

db = SQLAlchemy()

db.init_app(app)


with app.app_context():
    if os.path.exists("instance/tires.db"):
        pass
    #os.remove("instance/tires.db")
    db.drop_all()
    db.create_all()





class TirePosition(Enum):
    FRONT_LEFT = 1
    FRONT_RIGHT = 2
    REAR_LEFT = 3
    REAR_RIGHT = 4


class Track(db.Model):
    __tablename__ = "tracks"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True, index=True)
    country = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    length = db.Column(db.Float, nullable=False)                                # in km
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))


class Tire(db.Model):
    __tablename__ = "tires"

    id = db.Column(db.Integer, primary_key=True)
    serial = db.Column(db.String(50), nullable=False, unique=True, index=True)
    brand = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))


class Car(db.Model):
    __tablename__ = "cars"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True, index=True)
    brand = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))


class TireEntry(db.Model):
    __tablename__ = "tire_entries"

    id = db.Column(db.Integer, primary_key=True)
    tire_serial = db.Column(db.String(50), db.ForeignKey("tires.serial"), nullable=False)
    car_id = db.Column(db.Integer, db.ForeignKey("cars.id"), nullable=False)
    position = db.Column(db.Enum(TirePosition), nullable=False)
    laps = db.Column(db.Integer, nullable=False)
    mileage = db.Column(db.Integer, nullable=False)
    track_id = db.Column(db.Integer, db.ForeignKey("tracks.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))




@app.route("/")
def hello():
    return "Hello World!", 200


@app.route("/addCar", methods=["POST"])
def add_car():
    data = request.json
    car = Car(name=data["name"],  brand=data["brand"], model=data["model"], year=data["year"])
    db.session.add(car)
    db.session.commit()
    return jsonify({"message": "Car added"}), 201


@app.route("/getCars", methods=["GET"])
def get_cars():
    cars = Car.query.all()
    cars = [{"id": car.id, "name":car.name, "brand": car.brand, "model": car.model, "year": car.year} for car in cars]
    return jsonify(cars), 200


@app.route("/addTire", methods=["POST"])
def add_tire():
    data = request.json
    tire = Tire(serial=data["serial"], brand=data["brand"], model=data["model"], year=data["year"])
    db.session.add(tire)
    db.session.commit()
    return jsonify({"message": "Tire added"}), 201


@app.route("/getTires", methods=["GET"])
def get_tires():
    tires = Tire.query.all()
    tires = [{"id": tire.id, "serial": tire.serial, "brand": tire.brand, "model": tire.model, "year": tire.year} for tire in tires]
    return jsonify(tires), 200


@app.route("/getTiresDataByCar", methods=["POST"])
def get_tires_data_by_car():
    car = request.json["id"]
    tires = Tire.query.all()
    tires_data = []
    for tire in tires:
        tire_entries = TireEntry.query.filter_by(car_id=car).all()
        tire_entries = [{"id": tire_entry.id, "car_id": tire_entry.car_id, "position": tire_entry.position.name, "laps": tire_entry.laps, "mileage": tire_entry.mileage, "track_id": tire_entry.track_id} for tire_entry in tire_entries]
        tires_data.append({"id": tire.id, "serial": tire.serial, "brand": tire.brand, "model": tire.model, "year": tire.year, "entries": tire_entries})
    return jsonify(tires_data), 200


@app.route("/addTrack", methods=["POST"])
def add_track():
    data = request.json
    track = Track(name=data["name"], country=data["country"], city=data["city"], length=data["length"])
    db.session.add(track)
    db.session.commit()
    return jsonify({"message": "Track added"}), 201


@app.route("/getTracks", methods=["GET"])
def get_tracks():
    tracks = Track.query.all()
    tracks = [{"id": track.id, "name": track.name, "country": track.country, "city": track.city, "length": track.length} for track in tracks]
    return jsonify(tracks), 200


@app.route("/addTireEntry", methods=["POST"])
def add_tire_entry():
    data = request.json
    tire_entry = TireEntry(tire_serial=data["tire_serial"], car_id=data["car_id"], position=data["position"], laps=data["laps"], mileage=data["mileage"], track_id=data["track_id"])
    db.session.add(tire_entry)
    db.session.commit()
    return jsonify({"message": "Tire entry added"}), 201


@app.route("/getTireEntries", methods=["post"])
def get_tire_entries():
    id = request.json["id"]
    tire_entries = TireEntry.query.filter_by(tire_serial=id).all()
    tire_entries = [{"id": tire_entry.id, "tire_serial": tire_entry.tire_serial, "car_id": tire_entry.car_id, "position": tire_entry.position.name, "laps": tire_entry.laps, "mileage": tire_entry.mileage, "track_id": tire_entry.track_id} for tire_entry in tire_entries]
    return jsonify(tire_entries), 200





if __name__ == "__main__":
    app.run(debug=True)