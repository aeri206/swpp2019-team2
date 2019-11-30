import React from 'react';
import './App.css';
import {
  Route, Redirect, Switch, BrowserRouter,
} from 'react-router-dom';
import MainPage from './Containers/MainPage';
import LogIn from './Containers/LogIn';
import BudgetSearch from './Containers/BudgetSearch';
import SkinTone from './Containers/SkinTone';
import SalesInfo from './Containers/SalesInfo';
import Search from './Containers/Search';
import Signup from './Containers/Signup';
import MyPage from './Containers/MyPage';

function App({ history }) {
  return (
    <BrowserRouter history={history}>
      <div className="App">
        <Switch>
          <Route path="/login" exact component={LogIn} />
          <Route path="/signup" exact component={Signup} />
          <Route path = '/mypage' exact component = {MyPage} />
          <Route path="/main" exact component={MainPage} />
          <Route path="/search" exact component={Search} />
          <Route path="/budget" exact component={BudgetSearch} />
          <Route path="/skintone" exact component={SkinTone} />
          {/* <Route path = '/skintone/result' exact component = {} /> */}
          <Route path="/sale" exact component={SalesInfo} />
          <Redirect path="*" to="/login" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
