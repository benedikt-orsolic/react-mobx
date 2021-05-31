import './App.css';
import { MakeList } from './Pages/MakeList';
import { MakePage } from './Pages/MakePage';

import {
  Route,
  Switch,
  Link
} from 'react-router-dom';

function App() {

  return (<div>

    <Link to='/make-list' >Make List</Link>

    <Switch>
      <Route path="/make-list" component={MakeList} />
      <Route path="/make/:id" component={MakePage} />
      <Route path="/" component={MakeList} />
    </Switch>

  </div>);
}

export default App;
