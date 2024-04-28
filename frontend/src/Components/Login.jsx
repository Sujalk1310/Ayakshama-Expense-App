import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { postAPI } from "../axiosUrls";
import toast from 'react-hot-toast';
import TypingEffect from './TypingEffect';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { setToken } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('uid');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await postAPI("/login", {
                username,
                password,
            });

            setToken(response.token);
            localStorage.setItem("token", response.token);
            localStorage.setItem("uid", response.uid);

            toast.success(response.message);
            navigate("/dashboard");

        } catch (error) {
            toast.error(error.message);
        }
    };
    
    const handleRedirect = (e) => {
      e.preventDefault();
      navigate('/register');
    }

    return (
        <div className="flex flex-col lg:flex-row h-screen overflow-auto">
          {/* Left half with background image */}
          <div className="lg:w-1/2 h-96 lg:h-full bg-cover bg-center shadow-lg rounded-b-2xl lg:rounded-none login-background relative">
            <TypingEffect />
          </div>
          {/* Right half with login form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center form-area p-8">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-md p-8" style={{ width: '90%', maxWidth: '400px' }}>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Username
                </label>
                <input
                  className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
              <p className="text-sm mt-4">Not Registered? <button className="text-sm text-info" onClick={handleRedirect}>Register</button></p>
            </form>
          </div>
        </div>
    );
}
    
export default Login;
