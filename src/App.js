import './App.css';
import { WrapWithUiStore } from './HOC/WrapWithUiStore.HOC';

/** Pages for router */
import { MakeList } from './Pages/MakeList';

import { MakePage } from './Pages/MakePage';
import { MakePageEditStore } from './Pages/MakePageEdit.store';

import { ModelPage } from './Pages/ModelPage';
import { ModelPageEdit } from './Pages/ModelPageEdit';

import { MakeListStore } from './Pages/MakeList.store';
import { ModelPageEditStore } from './Pages/ModelPageEdit.store';

import { Login } from './Pages/LogIn';
import { LoginStore } from './Pages/LogIn.store';


/** Components */
import { MessageLog } from './Components/MessageLog';
import { MessageLogStore } from './Components/MessageLog.store';
import { NavBar } from './Components/NavBar';


/** Services */
import { MessageService } from './Common/MessageService.store';

/** Stores */
import { User } from './Common/User.store';


import {
  Route,
  Switch
} from 'react-router-dom';
import { MakePageEdit } from './Pages/MakePageEdit';

function App() {

  window.msgService = new MessageService();
  window.user = User;

  const WrappedMakeList = WrapWithUiStore(MakeList, MakeListStore);
  const WrappedModelPageEdit = WrapWithUiStore(ModelPageEdit, ModelPageEditStore);
  const WrappedMakePageEdit = WrapWithUiStore(MakePageEdit, MakePageEditStore);
  const WrappedLogin = WrapWithUiStore(Login, LoginStore);

  const WrappedMessageLog = WrapWithUiStore(MessageLog, MessageLogStore)


  return (<div>

    
    <NavBar />

    <WrappedMessageLog />

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