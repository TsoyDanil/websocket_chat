import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import Layout from './Components/Layout/Layout';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Authentication from './Container/Authentication/Authentication';
import Chat from './Container/Chat/Chat';
import './App.css';

function App() {
  const {user} = useSelector(state => state.users, shallowEqual);

  return (
    <div className="App">
        <BrowserRouter>
                  <Routes>
                      <Route path='/' element={<Layout/>}>
                          <Route index element={<Authentication/>}/>
                          <Route path='/chat' element={
                            <ProtectedRoute isAllowed={user?.token} redirectedPath='/'>
                                <Chat/>
                            </ProtectedRoute>}
                          />
                      </Route>
                  </Routes>
              </BrowserRouter>
    </div>
  );
}

export default App;
