import React from 'react'

function Card({radius,height,width,bgcolor,children,CustomClass}) {
    const CardStyle = {
        borderRadius:radius,
        height:height,
        width:width,
        backgroundColor:bgcolor,

    }
  return (
    <div className={`card ${CustomClass}`} style={CardStyle}>{children}</div>
  )
}

export default Card