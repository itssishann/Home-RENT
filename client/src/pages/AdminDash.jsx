import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import Toast, { Toaster, toast } from "react-hot-toast"
import Loader from '../components/Loader';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import baseURL from '../config';
import Swal from 'sweetalert2';
const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [bills, setBills] = useState([]);
  const [meName, setMeName] = useState('');
  const [meEmail, setMeEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState("");
  const [unit, setUnit] = useState("")
  const [dueAmount, setDueAmount] = useState("")
  const [renterName, setRenterName] = useState("")
  const navigate = useNavigate();

  async function getUserInfo() {
    try {
      const response = await axios.get(`${baseURL}/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const { data } = response.data;
      setMeName(data.userName);
      setMeEmail(data.email);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }
  async function getBillUserId() {
    try {
      const response = await axios.get(`${baseURL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const { data } = response.data;
      setUserData(data); 
      
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }
async function addUserBill() {
  if (userId === "" || unit === "") {
    return;
  }
  try {
    const {data} = await axios.post(`${baseURL}/admin/add-unit`, {
      userId: userId,
      billingPeriodStart: startDate,
      billingPeriodEnd: endDate,
      renterName,
      unitsConsumed: parseInt(unit),
      amountDue: dueAmount
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });
    console.log(data);
    const swalName = data.billCreated.renterName;
    const swalUnit = data.billCreated.unitsConsumed;
    // Show success alert using SweetAlert
    await Swal.fire({
      icon: 'success',
      title: 'Bill Added',
      text: `${swalName} <----> ${swalUnit}`,
      confirmButtonText: 'OK'
    });
    console.log(data); 
  } catch (error) {
    console.log("Error -> ", error);
    toast.error("Error Adding Bill");
  }
}
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    } else {
      setLoading(false); // Stop loading once token is checked
    }
  }, [navigate]);

useEffect(()=>{
  getUserInfo(),
  getBillUserId()
},[])

  return (
    <>
      <Navbar name={meName} email={meEmail} />
      <div className="flex scroll-smooth bg-zinc-900 gap-4 text-zinc-100 w-full flex-wrap">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Toaster></Toaster>
            <div className="w-[100vh]   mx-2 h-full rounded-lg border-blue-400 text-2xl text-center border-2 p-2"> 
              Add Electricity Bill
            <div className='flex flex-col gap-4  flex-wrap'>
                Start Month Date 
               
                
                <input className='text-zinc-600 rounded-md mx-2' type="date" onChange={(e)=>{
                    setStartDate(e.target.value)
                }} name="date" id="" />
               
                End Month Date 
                <input className='text-zinc-600 rounded-md mx-2' type="date" onChange={(e)=>{
                    setEndDate(e.target.value)
                }}  name="date" id="" />
                Unit Consumption
                <input type='number' className='p-2 text-zinc-600' onChange={(e)=>{
                  setUnit(e.target.value)
                  console.log(unit);
                }} placeholder='1xxx1'/>
                Due Amount
                <input className='p-2 text-zinc-600' type='number' onChange={(e)=>{
                  setDueAmount(e.target.value)
                  console.log(unit);
                }} placeholder='1xxx1'/>
            <div className='flex  flex-col'>
           <span className='mb-4 bg-orange-500  w-[50%] mx-auto p-2 rounded-md'> Select User </span>
           
{userData.map((user) => (
  <div className='border-blue-300 border-2  rounded-md mb-2 gap-4' key={user._id}>
    <p onClick={()=>{
      setUserId(user.Id)
      Toast.success(`Copied-> ${userId}`)
      console.log(userId);
    }} className='italic bold'>User ID: {user.Id}</p>
    <p onClick={()=>{
      setRenterName(user.name)
      toast.success(`Copied -> ${renterName}`)
      console.log(renterName);
    }} className='text-md text-orange-300'>Name: {user.name}</p>
    <p>Room ID: <span className='italic  '> {user.roomId}</span></p>
    <button
                onClick={addUserBill} // Attach the handler to the button
                className="relative  inline-flex items-center justify-center p-2 mt-2 mb-2 me-2 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              >Add Bill</button>
  </div>
))}

            </div>
            </div>
            
            </div>
            <div className="w-[100vh] rounded-lg border-blue-400 text-2xl text-center border-2 p-2 mx-2">
              House Rent
              <div className="bold text-yellow-400">
                This Section is Under Development 🛠️
                <img
                  className="h-[45vh] w-[100vw]"
                  src="https://cdni.iconscout.com/illustration/premium/thumb/website-under-construction-6074343-5006819.png?f=webp"
                  alt="Working-Dev"
                />
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
