// Import Components
import { PrivateRoute, LoginAndRegisterRoute } from './components/PrivateRoute';
import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// Import Pages
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import CreatePage from './pages/CreatePage';
import OrderPage from './pages/OrderPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <LoginAndRegisterRoute path="/login">
          <LoginPage />
        </LoginAndRegisterRoute>
        <LoginAndRegisterRoute path="/register">
          <RegisterPage />
        </LoginAndRegisterRoute>
        <Route path="/home">
          <HomePage />
        </Route>
        <PrivateRoute path='/create'>
          <CreatePage />
        </PrivateRoute>
        <PrivateRoute path='/orders'>
          <OrderPage />
        </PrivateRoute>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  )
}