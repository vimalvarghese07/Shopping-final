import React from 'react'

function Button({type,text,width,height,onClick,border,bgcolor,radius,customClass,padding}) {
  const ButtenStyle = {
    width : width,
    height: height,
    border:border,
    backgroundColor:bgcolor,
    outline:'none',
    borderRadius:radius,
    padding:padding
  }
  
  return (
    <button type={type} height={height} width={width} onClick={onClick} style={ButtenStyle} className={`Btn1 ${customClass}`}>{text}</button>
  )
}

export default Button