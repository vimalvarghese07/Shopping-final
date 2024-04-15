import React, { useEffect, useState } from 'react'
import { GetOrder } from '../Helper/Helper'

function Order() {
    const [orderItems,setorderItems]=useState()

    useEffect(()=>{
        const fetchDetails = async ()=>{
            const response = await GetOrder()
            setorderItems(response)
            console.log(response)
        }
        fetchDetails()
    },[])
  return (
    <div table-div>
        <table className='order-table'>
            <tr >
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Status</th>
            </tr>
        {orderItems?.order_products.map((item,index)=>  
        (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.price * orderItems?.order_items[index].quantity}</td>
                        <td><img src={`http://127.0.0.1:8000${item.image}`} alt="" className='table-img' /></td>
                        <td>Ordered Succesfully</td>
                    </tr>
                
            
        ))}
        </table>
    </div>
  )
}

export default Order