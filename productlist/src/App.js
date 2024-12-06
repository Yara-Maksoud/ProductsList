import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import ProductForm from './components/ProductForm';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Navigate to="/products" />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/show/:id' element={<ProductDetails />} />
          <Route path='/products/new' element={<ProductForm />} />
          <Route path='/products/edit/:id' element={<ProductForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
