import { useState, useEffect } from 'react'
import './App.css'


async function fetchCars() {
  return fetch('http://127.0.0.1:5000/getCars')
}

async function fetchTires(id: number) {
  return fetch('http://127.0.0.1:5000/getTiresDataByCar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({"id": id })
  })
}


class TireEntry {
  entryID: number
  tireID: number
  created_at: string
  mileage: number
  laps: number
  track_id: number
  position: string

  constructor(entryID: number, tireID: number, created_at: string, mileage: number, laps: number, track: number, position: string) {
    this.entryID = entryID
    this.tireID = tireID
    this.created_at = created_at
    this.mileage = mileage
    this.laps = laps
    this.track_id = track
    this.position = position
  }
}

class Tire {
  tireID: number
  tireSerial: string
  brand: number
  model: number
  year: number
  mileage: number
  entries: [TireEntry]


  constructor(tireID: number, tireSerial: string, brand: number, model: number, year: number, entries: [TireEntry]) {
    this.tireID = tireID
    this.tireSerial = tireSerial
    this.brand = brand
    this.model = model
    this.year = year
    this.entries = entries
    this.mileage = 0
    for (let entry of entries) {
      //console.log("entry", entry)
      this.mileage += entry.mileage
    }
  }
}
class Car {
  id: number
  name: string
  brand: string
  model: string
  year: number


  constructor(id: number, name: string, brand: string, model: string, year: number) {
    this.id = id
    this.name = name
    this.brand = brand
    this.model = model
    this.year = year
  }
}


function App() {

  const [cars, setCars] = useState([Car])

  useEffect(() => {
    fetchCars().then(response => response.json()).then(data => {
      //console.log("Car data", data)
      let data2 = data.map((car: any) => new Car(car.id, car.name, car.brand, car.model, car.year))
      //console.log("data2", data2)
      setCars(data2)
    })
  }, [])


  const [currentCar, setCurretnCar] = useState(new Car(1, '', '', '', 0))

  const [currentTires, setCurrentTires] = useState([Tire])

  const [currentTire, setCurrentTire] = useState(new Tire(1, '', 0, 0, 0, [new TireEntry(1, 1, '', 0, 0, 0, '')]))

  useEffect(() => {
    fetchTires(currentCar.id).then(response => response.json()).then(data => {
      //console.log("car id", currentCar.id, "Tire data", data)
      if (data === null) {
        setCurrentTires([])
        return
      }
      let data3 = data.map((tire: any) => new Tire(tire.id, tire.serial, tire.brand, tire.model, tire.year, tire.entries))
      //console.log("data", data3)
      setCurrentTires(data3)
      //console.log("currentTires", currentTires)
    })
  }, [currentCar])


  useEffect(() => {
    console.log("currentTire", currentTire)
  }, [currentTire])

  function viewTireInfo(tire: Tire) {
    if (tire) {
      setCurrentTire(tire)
      let div = document.getElementById('tire-info')
      if (div ) {
        div.style.display = 'block'
      }
    }
  }

  function closeTireInfo() {
    let div = document.getElementById('tire-info')
    if (div) {
      div.style.display = 'none'
    }
  }


  return (
    <>
      <div id='tire-info' className="tire-info">
        <button onClick={() => closeTireInfo()}>Close</button>
        <h2>Tire Information</h2>
        <span>Serial: {currentTire.tireSerial}</span><br />
        <span>Brand: {currentTire.brand}</span><br />
        <span>Model: {currentTire.model}</span><br />
        <span>Year: {currentTire.year}</span><br />
        <span>Mileage: {currentTire.mileage}</span><br />
        <span>Entries</span>
        <table>
          <thead>
            <tr>
              <th>EntryID</th>  
              <th>Date</th>
              <th>Mileage</th>
              <th>Laps</th>
              <th>Track</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {currentTire.entries.map(entry => (
              <tr>
                <td>{entry.entryID}</td>
                <td>{entry.created_at}</td>
                <td>{entry.mileage}</td>
                <td>{entry.laps}</td>
                <td>{entry.track_id}</td>
                <td>{entry.position}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <h1>Car</h1>
      <label htmlFor="cars">Select car</label>
      <select name="cars" id="cars" onChange={(e) => {
        const id = parseInt(e.target.value)
        const car2 = cars.find(car => car.id === id)
        setCurretnCar(car2)
      }}>
        {cars.map(car => (
          <option value={car.id}>{car.name}</option>
        ))}
      </select>
      <div className="carInfo" id="car-info">
        <span>Car id: {currentCar.id}, Car Name: {currentCar.name}</span>
      </div>

      <h1>Tires</h1>
      <table className="tire-table">
        <thead>
          <tr>
            <th>Däck sn.nummer</th>
            <th>Däck brand</th>
            <th>Däck model</th>
            <th>Däck year</th>
            <th>Däck mileage</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentTires.map(tire => (
            <tr>
              <td>{tire.tireSerial}</td>
              <td>{tire.brand}</td>
              <td>{tire.model}</td>
              <td>{tire.year}</td>
              <td>{tire.mileage}</td>
              <td>
                <button onClick={() => viewTireInfo(tire)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}


export default App
