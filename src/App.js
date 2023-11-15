import './scss/app.scss';
import React from 'react';
import { createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart/Cart';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="wrapper">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/cart" element={<Cart />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
