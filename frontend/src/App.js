import './App.css';
import  { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Registration from './Components/Registration';
import Test from './Components/Test';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <div className="App">
      <Toaster position="bottom-center" reverseOrder={true} />
      <Router>
        <Routes>
          <Route element={<Registration />} path="/register" />
          <Route element={<Dashboard />} path="/dashboard/*" />
          <Route element={<Test />} path="/test" />
          <Route element={<Login />} path="/" />
          <Route element={<Navigate to='/dashboard' />} path="*" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
