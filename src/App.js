import './App.css';
import { MakeList } from './Pages/MakeList';
import { MakePage } from './Pages/MakePage';
import { ModelPage } from './Pages/ModelPage';

import { MakeListStore } from './Pages/MakeList.store';

import { StoreWrapper } from './HOC/StoreWrapper.HOC';


import {
  Route,
  Switch,
  Link
} from 'react-router-dom';

function App() {

  const WrappedMakeList = StoreWrapper(MakeList, new MakeListStore());
  // (props) => <MakeList name="hello" uiStore={new MakeListStore()} />;

  return (<div>

    <Link to='/make-list' >Make List</Link>

    <Switch>
      <Route path="/make-list" component={WrappedMakeList} />
      <Route path="/make/:id" component={MakePage} />
      <Route path="/model/:id" component={ModelPage} />
      <Route path="/" component={MakeList} />
    </Switch>

  </div>);
}

export default App;
