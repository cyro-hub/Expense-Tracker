import React from 'react'
import { Link } from 'react-router-dom'
import {FaFacebook,FaLinkedin} from 'react-icons/fa'
import { AiFillInstagram, AiFillGithub } from 'react-icons/ai'
import './footer.scss'

function Footer() {
  return (<div className="footer">
              <div className="footer-links">
                  <Link to='/about'>About us</Link>
                  <Link to='/contact'>Contact us</Link>
                  <Link to='/support'>Support information</Link>
              </div>
              <div className="footer-icons">
                  <a href="#" target="_blank"><FaFacebook  size={21}/></a>
                  <a href="#" target="_blank"><FaLinkedin  size={21}/></a>
                  <a href="#" target="_blank"><AiFillInstagram  size={21}/></a>
                  <a href="#" target="_blank"><AiFillGithub size={21}/></a>
              </div>
      <h5>Copyright © {new Date().getFullYear()} Bong's Co. All rights reserved.</h5>
      <h5>Disclaimer: The information provided by our Expense Tracker application is for general informational purposes only. We do not make any warranties about the completeness, reliability, and accuracy of this information.</h5>
          </div>)
}

export default Footer
// import React from 'react';

// const Footer = () => {
//   return (
//     <footer style={styles.footer}>
//       <p style={styles.text}>
//         © 2023 Expense Tracker. All rights reserved.
//       </p>
//     </footer>
//   );
// };

// const styles = {
//   footer: {
//     backgroundColor: '#f1f1f1',
//     padding: '1rem',
//     textAlign: 'center',
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//   },
//   text: {
//     fontSize: '0.8rem',
//     color: '#888',
//     margin: 0,
//   },
// };

// export default Footer;