import React from 'react'
import { Link } from 'react-router-dom'
import {FaFacebook,FaLinkedin} from 'react-icons/fa'
import { AiFillInstagram, AiFillGithub } from 'react-icons/ai'
import './footer.scss'

function Footer() {
  return (<div className="footer">
              <div className="footer-links">
                  <Link to='/about'>About us</Link>
                  <Link to='/about'>Contact us</Link>
                  <Link to='/about'>Support information</Link>
              </div>
              <div className="footer-icons">
                  <a href="#" target="_blank"><FaFacebook  size={21}/></a>
                  <a href="#" target="_blank"><FaLinkedin  size={21}/></a>
                  <a href="#" target="_blank"><AiFillInstagram  size={21}/></a>
                  <a href="#" target="_blank"><AiFillGithub size={21}/></a>
              </div>
              <h5>Developed and Maintained by Bongs's.co All copyright reserved &copy 2023</h5>
          </div>)
}

export default Footer