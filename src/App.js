import './App.css';
import './Vehicle';
import { Vehicle } from './Vehicle';

function App() {

  let list = [{make: 'Jaguar', model: 'F-Type'},
              {make: 'Renault', model: 'Clio'}];
  return (
    
    <div>
      <p>Hello</p>
      {list.map(el =>{ 
                      return (<Vehicle make={el.make} model={el.model} />)
      })}
    </div>
  );
}

export default App;
