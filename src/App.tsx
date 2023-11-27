import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';

import style from './app.module.scss';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import NotFound from './pages/NotFound';
import ItemBlock from './pages/ItemBlock/ItemBlock';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className={style.root}>
          <div className="content">
            <Routes>
              <Header />
              <Route path="/cart" element={<Cart />} />
              <Route path="/" element={<Home />} />
              <Route path="/item/:id" element={<ItemBlock />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
