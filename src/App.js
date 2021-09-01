import './App.css';
import { User } from './Common/User.store';

import { MakeList } from './Pages/MakeList';

import { MakePage } from './Pages/MakePage';
import { MakePageEditStore } from './Pages/MakePageEdit.store';

import { ModelPage } from './Pages/ModelPage';
import { ModelPageEdit } from './Pages/ModelPageEdit';

import { MakeListStore } from './Pages/MakeList.store';
import { ModelPageEditStore } from './Pages/ModelPageEdit.store';

import { Login } from './Pages/LogIn';
import { LoginStore } from './Pages/LogIn.store';

import { MessageLog } from './Components/MessageLog';
import { MessageLogStore } from './Components/MessageLog.store';

import { UserLink } from './Components/UserLink';

import { WrapWithUiStore } from './HOC/WrapWithUiStore.HOC';


import {
  Route,
  Switch,
  Link
} from 'react-router-dom';
import { MakePageEdit } from './Pages/MakePageEdit';

function App() {

  const messageStore = new MessageLogStore();

  const WrappedMakeList = WrapWithUiStore(MakeList, MakeListStore);
  const WrappedModelPageEdit = WrapWithUiStore(ModelPageEdit, ModelPageEditStore);
  const WrappedMakePageEdit = WrapWithUiStore(MakePageEdit, MakePageEditStore);
  const WrappedLogin = WrapWithUiStore(Login, LoginStore);


  return (<div>

    <Link to='/make-list' >Make List</Link>
    <UserLink />
    

    <MessageLog uiStore={messageStore} />

    <Switch>
      <Route path="/make-list" component={WrappedMakeList} />
      
      <Route path="/make/edit/:id" component={WrappedMakePageEdit} />
      <Route path="/make/:id" component={MakePage} />
      <Route path="/model/edit/:id" component={WrappedModelPageEdit} />
      <Route path="/model/:id" component={ModelPage} />
      <Route path="/login" component={WrappedLogin} />
      <Route path="/" component={WrappedMakeList} />
    </Switch>

  </div>);
}

export default App;