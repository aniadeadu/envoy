import React, { FC, ReactNode, useContext } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Signin } from './pages/Signin';
import { Chats } from './pages/Chat';
import { AuthContext } from './contexts/UserProvider';

const App = () => {
  const {user}:any = useContext(AuthContext);
  const navigate:any = useNavigate();
  
  return (
    <div className="h-screen">
      <Routes>
        <Route path="/" element={
         <Signin/> 
        }/>
        <Route path="/envoy-chats" element={<Chats/>}/>
      </Routes>
    </div>
  );
}

export default App;
