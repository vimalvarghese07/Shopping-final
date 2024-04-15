import React from 'react'

function ProductView({children,isShow,closeModel}) {
    const ProViewStyle = {
        backgroundColor:'#ffff',
        borderRadius:'.5em',
        zIndex:'4',
        minHeight:'90vh',
        minWidth:'90vw',
        position:'fixed',
        display:`${isShow? 'block':'none'}`,
        left:'50%',
        top:'50%',
        transform:'translate(-50%,-50%)',
        padding:'1em',
    } 
    const SectionStyle = {
        zIndex:'3',
        minHeight:'100vh',
        minWidth:'100vw',
        backgroundColor:'rgba(136,136,136,0.7)',
        position:'fixed',
    }
    return (
    <div >
        <div style={SectionStyle} onClick={() =>closeModel()}></div>
        <div style={ProViewStyle}>
        {children}
        </div>
    </div>
  )
}

export default ProductView