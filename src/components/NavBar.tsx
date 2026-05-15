import React from 'react'
import '../styles/NavBar.css'
import { useState,useEffect } from 'react'

    
const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle state if scrolled more than 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
    
    
  return (
    <div>
      <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo">DISA</div>
        <ul className="nav-links">
            <li><a href="#" className='nav-item'>Home</a></li>
            <li><a href="#" className='nav-item'>Events</a></li>
            <li><a href="#" className='nav-item'>Datasets</a></li>
            <li><a href="#" className='nav-item'>About</a></li>
            <li><a href="#" className='nav-item'>Contact</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar






  