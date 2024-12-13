import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SupplierManagement from './components/SupplierManagement';
import InventoryManagement from './components/InventoryManagement';
import LogisticsManagement from './components/LogisticsManagement';
import FinancialManagement from './components/FinancialManagement';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" exact component={Dashboard} />
          <PrivateRoute path="/suppliers" component={SupplierManagement} />
          <PrivateRoute path="/inventory" component={InventoryManagement} />
          <PrivateRoute path="/logistics" component={LogisticsManagement} />
          <PrivateRoute path="/financial" component={FinancialManagement} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

