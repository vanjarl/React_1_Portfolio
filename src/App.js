import './scss/app.scss';
import React from 'react';
import { createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './components/Redux/store';
import { Provider } from 'react-redux';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

export const SearchContext = createContext('');

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  return (
    <Router>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
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
      </SearchContext.Provider>
    </Router>
  );
}

export default App;
