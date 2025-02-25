import { useState, useEffect } from 'react'
import './App.css'


function App() {

  /* type RowData = {
    tireSerial: string;
    totalKM: number;
    frontKM: number;
    backKM: number;
  }
  
  interface IState {
    rows: RowData[];
  }

  const [state, setState] = useState<IState>({rows: []});

  const addRow = () => {
    setState({
      rows: [...state.rows, {  tireSerial: "test", totalKM: 10, frontKM: 20, backKM: 30 }]
    })
  } 

  const clearRows = () => {
    setState({
      rows: []
    })
  } */

  const getListOfCars = async (): Promise<Car[]> => {
    const response = await fetch("http://localhost:5000/getCars")
    const data: Car[] = await response.json()
    console.log(data)
    return data
  }

  type Car = {
    id: number;
    name: string;
  }

  interface CarState {
    cars: Car[];
  }

  //const [CarState, Car] = useState<CarState>({cars: []})

  /* const getCars = async () => {
    const listOfCars = await fetchCars()
    setState({
      cars: [...CarState.cars, ...listOfCars]
    })
  } */

  //getCars()


  const [CarState, setState] = useState({ cars: [] });
  const [isMounted, setIsMounted] = useState(true);


  const getCars = async () => {
    const listOfCars = await fetchCars();
    setState((prevState) => ({
      cars: [...prevState.cars, ...listOfCars]
    }));
  };



  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const fetchCars = async () => {
    if (isMounted) {
      await getListOfCars();
    }
  };


  return (
    <>
      <h1>Car</h1>
      <label htmlFor="cars">Select car</label>
      <select name="cars" id="cars">
        {CarState.cars.map((car: {id: number, name: string}) => (
          <option value={car.id}>{car.name}</option>
        ))}
      </select>


      {/* <button onClick={addRow}>
        add tyre
      </button>
      <button onClick={clearRows}>
        clear tyres
      </button>
      <table className="tire-table">
        <thead>
          <tr>
            <th>Däck sn.nummer</th>
            <th>Däck Totalt antal kilometer</th>
            <th>Däck km fram</th>
            <th>Däck km bak</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.rows.map(row => (
            <tr>
              <td>{row.tireSerial}</td>
              <td>{row.totalKM}</td>
              <td>{row.frontKM}</td>
              <td>{row.backKM}</td>
              <td>
                <button>more info</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table> */}
    </>
  )
}

export default App
