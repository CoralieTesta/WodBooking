import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { CalendarPage } from './pages/CalendarPage/CalendarPage';
import { Login } from './pages/Login/Login';
import { DayPage } from './pages/DayPage/DayPage';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';

import { UserContextProvider } from './store/user-context';
import { MyBookings } from './pages/MyBookings/MyBookings';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          {/*<Route path='/' element={<ProteinQuantity/>}/>*/}
          <Route path='/' element={<Login/>}/>
          <Route path='/calendar' element={<CalendarPage/>}/>
          <Route path='/day' element={<DayPage/>}/>
          <Route path='/bookings' element={<MyBookings />}/>
        </Route>
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
  </UserContextProvider>
);
