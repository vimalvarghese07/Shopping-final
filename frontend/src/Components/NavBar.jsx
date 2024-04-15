import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/store'
import { useNavigate } from 'react-router-dom';

function NavBar({height,activeElement,About}) {
    const {state,dispatch} = useAuth();
    const navigate = useNavigate();
    const [NavItems,setNavItems] = useState(['Home','About','Shop','Register','Login'])
    const NavStyles = {
        display:'flex',
        justifyContent:'space-between',
        paddingInline:'1em',
        alignItems:'center',

    }
    useEffect(() => {
        if(state.isAuthenticated){
            setNavItems(['Home','About','Shop','Cart',`${activeElement=='Profile'?'Logout':'Profile'}`])

            if(activeElement=='Profile'){
                setNavItems(['Home','About','Shop','Cart',`${activeElement=='Profile'?'Logout':'Profile'}`,'Order'])
            }
        }
        
        else{
            setNavItems(['Home','About','Shop','Register','Login'])
        }
    },[state.isAuthenticated])

const handleClick= (item) =>{
    if(item ==='Home'){
        navigate('/')
    }
    else if (item ==='Logout') {
        dispatch({type:'LOGOUT'})
        navigate('/')
    }
    else if(item === 'About'){
        About()
    }
    else {
        navigate(`/${item}`)
    }
}


  return (
    <nav style={NavStyles} className='NavBar'>
        <span className="left">
            <h1>TimeStore</h1>
        </span>
        <span className="right">
        {
        NavItems.map((item,index) =>(
            <span key={index} onClick={() =>handleClick(item)}>{item}</span>
        ))
        }
        </span>
    </nav>
  )
}

export default NavBar