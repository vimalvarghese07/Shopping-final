import React from 'react'

function SaleCard({title,src,description}) {
  return (
    
        <div className="sale-card">
          <div className="image-box">
            <img src={src} />
          </div>
          <div className="content">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          </div>
  )
}

export default SaleCard