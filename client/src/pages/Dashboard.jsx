import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import baseURL from '../config'
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [bills, setBills] = useState([]);
  const [meName, setMeName] = useState('');
  const [meEmail, setMeEmail] = useState('');
  const navigate = useNavigate();

  async function getUserInfo() {
    try {
      const response = await axios.get(`${baseURL}/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const { data } = response.data;
      setMeName(data.userName);
      setMeEmail(data.email);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      setLoading(false); // Stop loading once token is checked
    }
  }, [navigate]);

  const billCheckHandler = async () => {
    try {
      setLoading(true); // Start loading when fetching bills
      const response = await axios.get(`${baseURL}/checkBill`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setBills(response.data.bills); // Set fetched bills to state
      setLoading(false); // Stop loading after fetching bills
    } catch (error) {
      setLoading(false); // Stop loading if there is an error
      console.error("Error fetching bills:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  useEffect(() => {
    getUserInfo();
    billCheckHandler() // Call the function
  }, []);
  return (
    <>
      <Navbar name={meName} email={meEmail} />
      <div className='flex scroll-smooth bg-zinc-900 gap-4 text-zinc-100 w-full flex-wrap'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className='w-[100vh] mx-2 h-[50vh] rounded-lg border-blue-400 text-2xl text-center border-2 p-2'>
              Electricity Bill
              <div className='mt-2 animate-bounce'>
                Press <span className='font-bold'>Check Bill Button👇</span>
              </div>
              <button 
                onClick={billCheckHandler} // Attach the handler to the button
                className="relative inline-flex items-center justify-center p-0.5 mt-2 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Check Bill
                </span>
              </button>
              {bills.length > 0 && (
                <div className='mt-4'>
                  <h3 className='text-xl font-bold'>Your Bills:</h3>
                  <ul>
                    {bills.map(bill => (
                      <li key={bill._id}>
                        <p>Billing Period: {formatDate(bill.billingPeriodStart)} to {formatDate(bill.billingPeriodEnd)}</p>
                        <p>This Month Bill: {bill.unitsConsumed * 5.25}₹</p>
                        <p>Previous Month Amount Due: {bill.amountDue}₹</p>
                        <p>Paid: {bill.paid ? 'Yes' : 'No'}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className='w-[100vh] rounded-lg border-blue-400 text-2xl text-center border-2 p-2 mx-2'>
              House Rent
              <div className='bold text-yellow-400'>
                This Section is Under Development 🛠️
                <img
                  className='h-[45vh] w-[100vw]'
                  src='https://cdni.iconscout.com/illustration/premium/thumb/website-under-construction-6074343-5006819.png?f=webp'
                  alt='Working-Dev'
                />
              </div>
            </div>
          </>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Dashboard;
