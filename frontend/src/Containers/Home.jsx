import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../Components/NavBar';
import Carousel from '../Components/Carousel'
import { ProductDetails, UserDetails } from '../Helper/Helper';
import SaleCard from '../Components/SaleCard';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import { useAuth } from '../store/store';

function Home() {
  const {dispatch} = useAuth();
  const [product,setproducts] = useState()
  // const navigate = useNavigate()
  const Aboutref = useRef()
  const scrolltoAbout =() =>{
    Aboutref.current.scrollIntoView()
  }
  const fetchuser = ()=>{
    UserDetails().then((user)=>{
      dispatch({type:'USER',payload:{user:user.Userdetails}});

    })
  }
  useEffect(() =>{

    const fetchDetails = async () =>{
      
      ProductDetails().then((res) =>{
        setproducts(res)
      })
    }
    fetchuser()
    fetchDetails()
  },[])

  return (
    <section className="home">
      <NavBar activeElement={'Home'}  About={scrolltoAbout}/>
      <div className="desc">
        <div className="heading">TIMESTORE</div>
        <p className="text">Discover all your popular brands here.</p>
      </div>
      <div className="carousel">
      <Carousel/>
      </div>

      <div className="about" ref={Aboutref}>
        <h2 className="about-head">
          ABOUT
        </h2>
        <div className="about-desc">
        TimeStore's presence in India is as robust as its global character. 
        The brand has strategically positioned itself in the Indian luxury watch market, appealing to those with a penchant for exclusive timepieces. 
        TimeStore's association with India goes beyond mere presence.In India, TimeStore has established a formidable presence, resonating with those who value the art of watchmaking.
        </div>
      </div>

      <div className="sale">
        <div className="sale-head">Summer Season Sale %</div>
        <div className="season-offer">
      {product?.map((data,index) =>(
        <SaleCard title = {data.name} src={data.image} description = {data.description} key = {index}/>
        
      ))}
      </div>
      </div>
      <Footer/>
    </section>
  )
}

export default Home;


{/* <Button text={'Login'} type={'button'} height={'2rem'} width={'5rem'} bgcolor={'aqua'} onClick={() =>alertFunction()}/> */}

