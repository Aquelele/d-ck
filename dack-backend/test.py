import requests


def test():
    url = "http://localhost:5000/"
    response = requests.get(url)
    return response


def addCar():
    url = "http://localhost:5000/addCar"

    data = {
        "name": "Test Car",
        "brand": "Test Brand",
        "model": "Test Model",
        "year": 2021
    }
    response = requests.post(url, json=data)
    return response


if __name__ == "__main__":
    t = test()

    print(t.status_code)
    print(t.json)

    c = addCar()
    print(c.status_code)
    print(c.json)