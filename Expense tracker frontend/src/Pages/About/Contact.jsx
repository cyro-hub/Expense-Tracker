import React from 'react'
import './about.scss'
import Nav from '../../Components/Nav/Nav'
import Footer from '../../Components/Footer/Footer'

function Contact() {
  return (
      <div className='about'>
      <Nav/>
          <h3>Welcome to our Expense Tracker application contact page!</h3>
          <p>We appreciate your interest in our application, and we're here to help you with any questions or issues you may have. You can contact us through the following methods:</p>
          <ul>
              <li>Email: You can send an email to our support team at cyrocyro2@gmail.com. We'll do our best to respond to your inquiry as soon as possible.</li>
              <li>Contact form: You can also fill out the contact form on our website by clicking on the "Contact Us" button. Please provide as much detail as possible about the issue you're experiencing, including the device you're using, the version of our application, and any error messages you're seeing. This will help us to diagnose and resolve the issue more quickly.</li>
              <li>Social media: You can also reach out to us on our social media channels, including Twitter, Facebook, and Instagram. We're active on these platforms and will respond to your messages as soon as possible.</li>
          </ul>
          <p>We value your feedback and suggestions, and we're constantly working to improve our application to meet your needs. Please don't hesitate to contact us if you have any questions, concerns, or feedback. We're here to help, and we look forward to hearing from you!</p>
      <Footer/>
        </div>
  )
}

export default Contact