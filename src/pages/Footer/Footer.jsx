import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <footer className='footer'>
        <div className='footer-content'>
            <div className='footer-logo'>
                <img src={'./Peer2Peer2.png'} alt='Peer2PeerU Logo' />
            </div>
            <p>© 2025 Peer2PeerU. All rights reserved.</p>
            <div className='footer-links'>
                <a href="/about">About us</a>
                <a href="/contact">Contact</a>
                <a href="/terms">Terms of Service</a>
                <a href="/privacy">Privacy Policy</a>
            </div>
        </div>
      
    </footer>
  )
}

export default Footer
