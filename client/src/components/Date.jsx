import axios from 'axios'
import React, { useState } from 'react'

const Date = () => {
    const[data,setData] = useState("");
    async function getData(){
        const response = axios.get("https://leetcode.com/problemset/")
        console.log(response);
    }
  return (
    <div onClick={getData}>
      Data --
    </div>
  )
}

export default Date
