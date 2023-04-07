import React from 'react'
import './about.scss'
import Nav from '../../Components/Nav/Nav'
import Footer from '../../Components/Footer/Footer'

function About() {
  return (
      <div className='about'>
      <Nav/>
          <h3>Welcome to our Expense Tracker application!</h3>
          <p>Our application is designed to help you manage your finances and track your expenses easily and efficiently. With our user-friendly interface and powerful features, you'll be able to gain control of your finances and achieve your financial goals in no time.</p>
          <p>We understand how challenging it can be to keep track of your expenses and stay within your budget. That's why we created this application to simplify the process and make it as effortless as possible for you.</p>
          <p>Our application has a variety of features that make it easy to track your expenses, including:</p>
          <ul>
              <li>Intuitive categorization: Our application categorizes your expenses automatically so you can see where your money is going and make adjustments as needed.</li>
              <li>Budget tracking: With our application, you can set up budgets and track your progress towards them in real-time. You'll receive notifications when you're approaching your budget limit to help you stay on track.</li>
              <li>Multi-platform support: Our application is available on multiple platforms, including iOS and Android, so you can access your financial information anytime, anywhere.</li>
              <li>Secure data: We take the security of your financial information seriously, and our application uses the latest security protocols to protect your data.</li>
          </ul>
          <p>We believe that managing your finances should be easy and accessible, and our application is designed to make that a reality. Our team is constantly working to improve the application and add new features to make it even more useful for you.</p>
      <p>Thank you for choosing our Expense Tracker application. We hope it helps you achieve your financial goals and gives you peace of mind knowing that your finances are under control.</p>
      <Footer/>
        </div>
  )
}

export default About