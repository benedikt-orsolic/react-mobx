import './App.css';
import { VehicleMake } from './VehicleMake';

import { vehicleMakeList } from './vehicleList';

function App() {

  return (
    
    <div>
      {vehicleMakeList.map(
        el =>{ 
          return (<VehicleMake id={el.id} />)
        }
      )}
    </div>
  );
}

export default App;
