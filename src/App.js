import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Product Catalog</h1>
        <Switch>
          <Route path="/" exact component={ProductList} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;