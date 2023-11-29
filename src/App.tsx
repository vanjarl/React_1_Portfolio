import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';

import style from './app.module.scss';

import Layout from './components/Layout/Layout';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart';
import NotFound from './pages/NotFound';
import ItemBlock from './pages/ItemBlock/ItemBlock';
import ShopLayout from './components/ShopLayout/ShopLayout';
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className={style.root}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/shop" element={<ShopLayout />}>
                <Route index element={<Shop />} />
                <Route path="/shop/cart" element={<Cart />} />
                <Route path="/shop/item/:id" element={<ItemBlock />} />
              </Route>
              <Route path="*" element={<NotFound />} />
              {/* <Route path="/blog" element={<Layout />} /> */}
            </Route>

            {/* <Route path="/cart" element={<Cart />} /> */}
            {/* <Route path="/" element={<Home />} /> */}
            {/* <Route path="/item/:id" element={<ItemBlock />} /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
