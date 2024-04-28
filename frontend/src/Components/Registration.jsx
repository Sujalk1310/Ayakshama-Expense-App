import React, { useState, useEffect } from "react";
import { postAPI } from "../axiosUrls";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TypingEffect from './TypingEffect';

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const response = await postAPI("/register", {
        username,
        password,
        email,
        mobile,
        name
      });
      
      toast.success(response.message);
      navigate('/');

    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRedirect = (e) => {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className="flex flex-col lg:flex-row lg:h-screen">
      {/* Left half with background image */}
      <div className="lg:w-1/2 h-96 lg:h-full bg-cover bg-center shadow-lg rounded-b-lg lg:rounded-none  login-background relative">
        <TypingEffect />
      </div>
      {/* Right half with signup form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 form-area lg:m-auto mb-5">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-md p-8" style={{ width: '90%', maxWidth: '400px' }}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
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
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
              Mobile
            </label>
            <input
              className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="mobile"
              type="tel"
              placeholder="Enter mobile no."
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <p className="text-sm mt-4">Already Registered? <button type="button" className="text-sm text-info" onClick={handleRedirect}>Login</button></p>
        </form>
      </div>
    </div>
  );
};

export default Registration;