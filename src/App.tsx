import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';

import style from './app.module.scss';

import Layout from './components/Layout/Layout';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart';
import NotFound from './pages/NotFound/NotFound';
import ItemBlock from './pages/FullShopItem/FullShopItem';
import ShopLayout from './components/ShopLayout/ShopLayout';
import Home from './pages/Home/Home';
import Blog from './pages/Blog/Blog';
import BlogLayout from './components/BlogLayout/BlogLayout';
import FullPost from './pages/FullPost/FullPost';
import AuthForm from './pages/AuthForm/AuthForm';
import RegisterForm from './pages/RegisterForm/RegisterForm';
import AddPost from './pages/AddPost/AddPost';

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
              <Route path="/blog" element={<BlogLayout />}>
                <Route index element={<Blog />} />
                <Route path="/blog/:id" element={<FullPost />} />
                <Route path="/blog/create" element={<AddPost />} />
              </Route>
              <Route path="/auth" element={<AuthForm />} />
              <Route path="/registration" element={<RegisterForm />} />
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
