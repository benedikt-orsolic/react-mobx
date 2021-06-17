import './App.css';
import { MakeList } from './Pages/MakeList';
import { MakePage } from './Pages/MakePage';
import { ModelPage } from './Pages/ModelPage';

import { MakeListStore } from './Pages/MakeList.store';

import { WrapWithUiStore } from './HOC/WrapWithUiStore.HOC';


import {
  Route,
  Switch,
  Link
} from 'react-router-dom';

function App() {

  const WrappedMakeList = WrapWithUiStore(MakeList, MakeListStore);

  return (<div>

    <Link to='/make-list' >Make List</Link>

    <Switch>
      <Route path="/make-list" component={WrappedMakeList} />
      <Route path="/make/:id" component={MakePage} />
      <Route path="/model/:id" component={ModelPage} />
      <Route path="/" component={WrappedMakeList} />
    </Switch>

  </div>);
}

export default App;
