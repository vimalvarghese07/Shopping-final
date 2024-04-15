import React from 'react'

export default function Footer() {
  return (
    <>
  {/* Hello world */}
  <div className="footer">
    <div className="maven">
      <div className="footer-head">TimeStore</div>
      <div className=" footer-desc">
        A revolutionary bank card brand,has emerged as the forefront of the
        financial world,redefining the way we experience banking transactions.
      </div>
      {/* <img src="frontend\src\Assets\Images\contact.png" alt="" className="insta" /> */}
    </div>
    <div className="companyy">
      <div className="company-head">Company</div>
      <ul className="detail">
        <li>About Us</li>footer-
        <li>Become a Partner</li>
        <li>Career</li>
        <li>FAQ</li>
      </ul>
    </div>
    <div className="resources">
      <div className="res-head">Resources</div>
      <ul className="detail">
        <li>Accessibility</li>
        <li>Legal</li>
        <li>Help Center</li>
      </ul>
    </div>
    <div className="contact">
      <div className="con-head">Contact Us</div>
      <ul className="detail">
        <li>Maven@customer.com</li>
        <li>(440) 221 4470</li>
      </ul>
    </div>
  </div>
</>

  )
}
