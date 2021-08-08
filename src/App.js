import './App.css';
import { MakeList } from './Pages/MakeList';
import { MakePage } from './Pages/MakePage';
import { ModelPage } from './Pages/ModelPage';
import { ModelPageEdit } from './Pages/ModelPageEdit';

import { MakeListStore } from './Pages/MakeList.store';
import { ModelPageEditStore } from './Pages/ModelPageEdit.store';

import { WrapWithUiStore } from './HOC/WrapWithUiStore.HOC';


import {
  Route,
  Switch,
  Link
} from 'react-router-dom';

function App() {

  const WrappedMakeList = WrapWithUiStore(MakeList, MakeListStore);
  const WrappedModelPageEdit = WrapWithUiStore(ModelPageEdit, ModelPageEditStore);

  return (<div>

    <Link to='/make-list' >Make List</Link>

    <Switch>
      <Route path="/make-list" component={WrappedMakeList} />
      <Route path="/make/:id" component={MakePage} />
      <Route path="/model/edit/:id" component={WrappedModelPageEdit} />
      <Route path="/model/:id" component={ModelPage} />
      <Route path="/" component={WrappedMakeList} />
    </Switch>

  </div>);
}

export default App;
