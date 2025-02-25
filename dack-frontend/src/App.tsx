import { useState, useEffect } from 'react'
import './App.css'


async function fetchCars() {
  return fetch('http://localhost:5000/getCars')
}

async function fetchTires(id: number) {
  return fetch('http://localhost:5000/getTiresDataByCar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id })
  })
}


class Tire {
  tireID: number
  tireSerial: string
  brand: number
  model: number
  year: number


  constructor(tireID: number, tireSerial: string, brand: number, model: number, year: number) {
    this.tireID = tireID
    this.tireSerial = tireSerial
    this.brand = brand
    this.model = model
    this.year = year
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
      console.log("Car data", data)
      let data2 = data.map((car: any) => new Car(car.id, car.name, car.brand, car.model, car.year))
      console.log("data2", data2)
      setCars(data2)
    })
  }, [])


  const [currentCar, setCurretnCar] = useState(new Car(0, '', '', '', 0))

  const [currentTires, setCurrentTires] = useState([Tire])

  useEffect(() => {
    fetchTires(currentCar.id).then(response => response.json()).then(data => {
      let data3 = data.map((tire: any) => new Tire(tire.id, tire.serial, tire.brand, tire.model, tire.year))
      console.log("data", data3)
      setCurrentTires(data3)
      console.log("currentTires", currentTires)
    })
  }, [currentCar])


  return (
    <>
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
              <td>
                <button>more info</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
