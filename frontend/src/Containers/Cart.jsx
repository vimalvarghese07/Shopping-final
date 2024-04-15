import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import { useSelected } from '../Helper/selectedContext'
import { useNavigate } from 'react-router-dom'
import Button from '../Components/Button'
import { CartProducts, deleteCart } from '../Helper/Helper'
import { Toaster }from "react-hot-toast";

export const Cart = () => {
  const navigate = useNavigate()
  const {setItem} = useSelected();
  const [cartProductz,setCartProducts] = useState() 
  const [cartItems,setCartItems] = useState() 
  const [quantity,setQuantity] = useState(1)
  const fetchProducts = async () =>{
    const response = await CartProducts()
    setCartProducts(response.products)
    setCartItems(response.cart_items)
  }
  useEffect(() =>{
    fetchProducts()
  },[])
  const handleBuyButtonClick = ({item,index}) => {
    setItem({
      category:item.category,
      description:item.description,
      image:item.image,
      id:item.id,
      name:item.name,
      price:item.price * cartItems[index].quantity,
      quantity:cartItems[index].quantity
    })
    navigate('/checkout');
}
  const handleRemoveButtonClick =async (item) => {
    const response = await deleteCart({values:item})
  }
  // const handleQuantity = ({item,index,type}) =>{
  //   let element = document.getElementById(`${index}_${item.id}`)
  //   switch (type) {
  //     case 'PLUS':
  //       setQuantity(quantity + 1)
  //       element.innerHTML= `Quantity : ${quantity}`
  //       break;
  //     case 'MINUS':
  //       setQuantity(quantity - 1)
  //       element.innerHTML= `Quantity : ${quantity}`
  //     default:
  //       break;
  //   }
  // }
  const handleQuantity = ({ item, index, type }) => {
    const updatedCartProducts = [...cartItems];
    const currentItem = updatedCartProducts[index];
    let updatedQuantity = currentItem.quantity;
  
    switch (type) {
      case 'PLUS':
        updatedQuantity++;
        break;
      case 'MINUS':
        if (updatedQuantity > 1) {
          updatedQuantity--;
        }
        break;
      default:
        break;
    }
  
    currentItem.quantity = updatedQuantity;
    setCartItems(updatedCartProducts);
  };
  

  return (
    < section className='cart1'>
    <Toaster position='top-center' reverseOrder={false}/>

      <NavBar/>
      <div className='mycart'>
        <div class="cart">
          <h2>Your Shopping Cart</h2>
          {cartProductz && <>
          {cartProductz?.map((item,index) =>(
            <div class="cart-item" key={index}>
            <div class="cart-item-image">
                {/* <img class="product-image" src="https://www.casio.com/content/dam/casio/product-info/locales/in/en/timepiece/product/watch/D/DW/DW6/dw-6900ums-1/assets/DW-6900UMS-1.png.transform/main-visual-pc/image.png"/> */}
                <img class="product-image" src={`http://127.0.0.1:8000${item?.image}`}/>
            </div>
            <div class="cart-item-info">
                <div class="product-info">
                    <h3>{item?.name}</h3>
                    <p> MRP:{item?.price * cartItems[index].quantity} </p>
                </div>
                <div class="product-quanity">
                    <button id="quantity-down" className='qua-btn' onClick={() =>handleQuantity({item:item,index:index,type:'MINUS'})}>-</button>
                    <button id="quantity-up" className='qua-btn' onClick={() =>handleQuantity({item:item,index:index,type:'PLUS'})}>+</button>
                    <div class="total-quantity" id={`${index}_${item.id}`}>Quantity : {cartItems[index].quantity}</div>
                    {/* <p class="total-price">Total Price available at checkout</p> */}
                </div>
                <Button text={'Buy Now'} padding={'0.5em'} bgcolor={'gold'} onClick={() => handleBuyButtonClick({item:item,index:index})} radius={'0.5'} />
            </div>
              <Button text={'Remove'} onClick={() =>handleRemoveButtonClick(item.id)} customClass={'btn5'}/>
        </div>
          ))}
          </>}
          <div class="cart-checkout">
              <button class="btn-checkout">Checkout</button>
          </div>
      </div>
        
      </div>

    </section>
  )
}