interface CarInfoProps {
    id: number;
    name: string;
    brand: string;
    model: string;
    year: number;
}

const CarInfo: React.FC<CarInfoProps> = ({ id, name, brand, model , year}) => {


    return (
        <div>
            <span>Car id:{id}, Car Name: {name}</span>
        </div>
    )
}

export default CarInfo