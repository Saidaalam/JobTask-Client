import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root';
import Home from './components/Home/Home';
import Login from './components/Login';
import Register from './components/Register';
import AuthProvider from './components/Provider/AuthProvider'
import { HelmetProvider } from 'react-helmet-async';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import ProductDetails from './components/ProductDetails';
import Category from './components/Category';
import BrandSlider from './components/Home/BrandSlider';
import ContactUs from './components/Home/ContactUs';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path:'/',
        element: <Home></Home>
      },
      {
        path:'/login',
        element: <Login></Login>
      },
      {
        path:'/register',
        element: <Register></Register>
      },
      {
        path:'/brand',
        element: <BrandSlider></BrandSlider>
      },
      {
        path:'/product',
        element: <Products></Products>
      },
      {
        path:'/contact',
        element: <ContactUs></ContactUs>
      },
      {
        path:'/category',
        element: <Category></Category>
      },
      {
        path:'/addProduct',
        element: <AddProduct></AddProduct>
      },
      {
        path:'/productDetails/:id',
        element: <ProductDetails></ProductDetails>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProvider>
   <HelmetProvider>
   <RouterProvider router={router} />
   </HelmetProvider>
   </AuthProvider>
  </React.StrictMode>,
)
