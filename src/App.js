import './App.css';
import { WrapWithUiStore, WrapWithPageStore } from './HOC/WrapWithUiStore.HOC';

/** Pages for router */
import { MakeList } from './Pages/MakeList';

import { MakePage } from './Pages/MakePage';
import { MakePageStore } from './Pages/MakePage.store';
import { MakePageEditStore } from './Pages/MakePageEdit.store';

import { ModelPage } from './Pages/ModelPage';
import { ModelPageStore } from './Pages/ModelPage.store';
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
  const WrappedMakePage = WrapWithPageStore(MakePage, MakePageStore);
  const WrappedModelPage = WrapWithPageStore(ModelPage, ModelPageStore);
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
      <Route path="/make/:id" component={WrappedMakePage} />
      <Route path="/model/edit/:makeId/:id" component={WrappedModelPageEdit} />
      <Route path="/model/:id" component={WrappedModelPage} />
      <Route path="/login" component={WrappedLogin} />
      <Route path="/" component={WrappedMakeList} />
    </Switch>

  </div>);
}

export default App;