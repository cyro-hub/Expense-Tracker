import React,{useState,useEffect,useCallback} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Link, useNavigate} from 'react-router-dom'
import { motion } from "framer-motion";
import Cropper from 'react-easy-crop'
import ReactCrop from 'react-image-crop'
import Slider from '@mui/material/Slider';
import Avatar from '@mui/material/Avatar';
import 'react-image-crop/dist/ReactCrop.css'
import * as imageFunctions from '../../utils/cropImage'

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: 1,
  border: 'none',
  outline: 'none',
  overflow:'scroll',
    height:'100%',
    display:'block'
};

function ProfileViewer({ data:image }) {
  const [openForm, setOpenForm] = useState(true)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [newImage,setNewImage]=useState(null)

  const handleModalCloseOrOpen = () => setOpenForm(!openForm)   
  
    const handleSubmit = () => {
      console.log(newImage)
      imageFunctions.generateDownload(image,crop)
  }

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    const newImage = await imageFunctions.getCroppedImg(image, croppedArea)
    
    setNewImage(newImage);
 }

    return (<>
      <Avatar alt="Selected image"
        // src={URL.createObjectURL(image)}
        src={image}
        sx={{ width: 120, height: 120 }}
        onClick={handleModalCloseOrOpen} />
    <Modal
        open={openForm}
        onClose={handleModalCloseOrOpen}>
        <Box sx={style}>
            <div className='account-form'>
            <motion.form
                variants={container}
                initial="hidden"
                animate="visible">
                    <motion.div className='profile-to-be-edited' variants={item}>
                        {/* <Cropper
                          image={image}
                          crop={crop}
                          zoom={zoom}
                          objectFit='auto-cover'
                          zoomSpeed={4}
                          maxZoom={3}
                          zoomWithScroll={true}
                          onCropChange={setCrop}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                        /> */}
                <ReactCrop crop={crop} aspect={1} onComplete={onCropComplete} onChange={c => setCrop(c)}>
                  <img src={image} />
                </ReactCrop>
              </motion.div>
              {/* {newImage && <img src={newImage.toDataURL()} alt="ssdf" />} */}
              <motion.div variants={item} className='slider'>
                   <Slider
                  size="medium"
                defaultValue={20}
                style={{width:'90%',padding:'1em auto'}}
                      min={1}
                      max={3}
                      step={0.005}
                      value={zoom}
                      aria-label="Small"
                      valueLabelDisplay="auto"
                      onChange={ (e)=>{setZoom(e.target.value)}}
                  />
              </motion.div>
              <motion.div className="controls" variants={item}>
                <Link to='#' className='danger actives' onClick={handleSubmit}>
                  Upload
                </Link>
                <Link to='#' onClick={handleModalCloseOrOpen}>Cancel</Link>
              </motion.div>
          </motion.form>
            </div> 
        </Box>
          </Modal>
    </>
      
  )
}

export default ProfileViewer