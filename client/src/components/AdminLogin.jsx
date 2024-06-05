import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader'; // Ensure you have this component created
import Footer from './Footer';
import 'animate.css';
import baseURL from '../config';
 export default function AdminLogin  ()  {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  async function loginHandler() {
    setLoading(true); // Show loader
    try {
      if (email ==""){
        return 
      }
      const response = await axios.post(`${baseURL}\signin`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      toast.success('Login Success');
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 800);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log('Login Error-> ', error.response.data.message);
    } finally {
      setLoading(false); // Hide loader
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col  items-center justify-center bg-zinc-900">
        <Toaster />
        {loading ? (
          <Loader />
        ) : (
          <div
            className="
              flex flex-col
              bg-white
              shadow-md
              px-4
              sm:px-6
              md:px-8
              lg:px-10
              py-8
              rounded-3xl
              w-50
              mx-4
              max-w-md
              animate__animated
              animate__slideInUp
              animate__faster
            "
          >
            <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
              Welcome Back
            </div>
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
              Enter your credentials to access your account
            </div>

            <div className="mt-10">
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs tracking-wide text-gray-600"
                >
                  E-Mail Address:
                </label>
                <div className="relative">
                  <div
                    className="
                      inline-flex
                      items-center
                      justify-center
                      absolute
                      left-0
                      top-0
                      h-full
                      w-10
                      text-gray-400
                    "
                  >
                    <i className="fas fa-at text-blue-500"></i>
                  </div>

                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    required
                    name="email"
                    className="
                      text-sm
                      placeholder-gray-500
                      pl-10
                      pr-4
                      rounded-2xl
                      border border-gray-400
                      w-full
                      py-2
                      focus:outline-none focus:border-blue-400
                    "
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Password:
                </label>
                <div className="relative">
                  <div
                    className="
                      inline-flex
                      items-center
                      justify-center
                      absolute
                      left-0
                      top-0
                      h-full
                      w-10
                      text-gray-400
                    "
                  >
                    <span>
                      <i className="fas fa-lock text-blue-500"></i>
                    </span>
                  </div>

                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="
                      text-sm
                      placeholder-gray-500
                      pl-10
                      pr-4
                      rounded-2xl
                      border border-gray-400
                      w-full
                      py-2
                      focus:outline-none focus:border-blue-400
                    "
                    placeholder="Enter your password"
                  />
                  <div
                    className="
                      inline-flex
                      items-center
                      justify-center
                      absolute
                      right-0
                      top-0
                      h-full
                      w-10
                      text-gray-400
                      cursor-pointer
                    "
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <i className="fa-solid text-blue-500 fa-eye-slash"></i>
                    ) : (
                      <i className="fa-solid text-blue-500 fa-eye"></i>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex w-full">
                <button
                  onClick={loginHandler}
                  className="
                    flex
                    mt-2
                    items-center
                    justify-center
                    focus:outline-none
                    text-white text-sm
                    sm:text-base
                    bg-blue-500
                    hover:bg-blue-600
                    rounded-2xl
                    py-2
                    w-full
                    transition
                    duration-150
                    ease-in
                    
                   
                  "
                >
                  <span className="mr-2 uppercase">Sign In</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};


