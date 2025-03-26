import Image from 'next/image'
import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'black',
  border: '2px solid #000',
  p: 4,
}

export default function VideoIntroduction() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Image
        className='videoPlay'
        src='/[home]_slicePlayVideo.png'
        alt='videoPlay'
        width={89}
        height={19}
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style} className='modalVideo'>
          <iframe
            className='homeVideo'
            src='https://www.youtube.com/embed/UbCxzZ_J3_w?si=_ZGYNqKbNBpGbof8&amp;start=4'
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          ></iframe>
          <div
            style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 10,
              right: 10,
            }}
          >
            <FontAwesomeIcon
              icon={faTimes}
              size='lg'
              className='closeVideo'
              onClick={handleClose}
              color='grey'
            />
          </div>
        </Box>
      </Modal>
    </div>
  )
}
