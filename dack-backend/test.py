import requests
from enum import Enum


def test():
    url = "http://localhost:5000/"
    response = requests.get(url)
    return response


def addCar():
    url = "http://localhost:5000/addCar"

    data = {
        "name": "Test Car 2",
        "brand": "Test Brand 2",
        "model": "Test Model 2",
        "year": 2022
    }
    response = requests.post(url, json=data)
    return response


def addTire():
    url = "http://localhost:5000/addTire"

    data = {
        "serial": "Serial 4",
        "brand": "IDLERS",
        "model": "DEM WIDE BOYS",
        "year": 2021
    }
    response = requests.post(url, json=data)
    return response


def addTrack():
    url = "http://localhost:5000/addTrack"

    data = {
        "name": "Test Track 1",
        "country": "Test Country 1",
        "city": "Test City 1",
        "length": 1000
    }
    response = requests.post(url, json=data)
    return response


def tireEntry():
    url = "http://localhost:5000/addTireEntry"

    data = {
        "car_id": 1,
        "tire_serial": 4,
        "position": "FRONT_LEFT",
        "laps": 10,
        "track_id": 1
    }
    response = requests.post(url, json=data)
    return response


if __name__ == "__main__":
    t = test()

    print(t.status_code)
    print(t.json)

    """ c = addCar()
    print(c.status_code)
    print(c.json) """

    """ t = addTire()
    print(t.status_code)
    print(t.json) """

    """ track = addTrack()
    print(track.status_code)
    print(track.json) """

    tireEntry = tireEntry()
    print(tireEntry.status_code)
    print(tireEntry.json)


