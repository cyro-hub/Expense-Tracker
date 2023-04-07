import Nav from "../../Components/Nav/Nav"
import "./home.scss"
import welcome from '../../assets/welcome/welcome.mp4'
import { Link } from "react-router-dom"
import { TbBrandGoogleAnalytics } from 'react-icons/tb'
import { IoMdAnalytics} from 'react-icons/io'
import { CgRecord} from 'react-icons/cg'
import Footer from "../../Components/Footer/Footer"
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: .5,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

function Home() {
  return (
      <>
          <Nav />
          <div className="container welcome">
                <video src={welcome} autoPlay loop muted className="welcome-video" />
                <div className="welcome-cover">
                    <div className="welcome-message">                      
                            <h1>Tracking</h1>
                            <h3>is</h3>
                            <h1>Regulating</h1>
                    </div>  
                    <Link to='/panel' className="start">Get Started</Link>
                </div>
          </div>
          <div className="container-services">
              <h2>Services</h2>
                <motion.div className="services"
                variants={container}
                initial="hidden"
                animate="visible">                  
                <motion.div className="service" variants={item}>
                    <h3>Transactions</h3>
                      <TbBrandGoogleAnalytics size={30}/>
                      <p>Using this application you can record your daily transactions easily</p>
                  </motion.div>
                  <motion.div className="service" variants={item}>
                    <h3>Tracking</h3>
                      <IoMdAnalytics size={30}/>
                      <p>This application lets you build a strong tracking mentallity of your expenses</p>
                  </motion.div>
                  <motion.div className="service" variants={item}>
                    <h3>Income</h3>
                      <CgRecord size={30}/>
                      <p>Recording your source of income can help int tracking of your finances</p>
                </motion.div>
        </motion.div>
        </div>
          <Footer/>
      </>
  )
}

export default Home