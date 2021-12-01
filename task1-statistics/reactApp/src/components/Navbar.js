import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './Navbar.css';
import {Button} from './Button';


function Navbar()
{
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960)
        {
            setButton(false);
        }
        else{
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []); //doesn't show register button when it is to be resized

    window.addEventListener('resize', showButton); //resizing and showing menu

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        PARKING-KYS <i className='fab fa-typo3' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/statistics' className='nav-links' onClick={closeMobileMenu}>
                                Statistics
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/cars' className='nav-links' onClick={closeMobileMenu}>
                                Cars
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/register' className='nav-links-mobile' onClick={closeMobileMenu}>
                                Register 
                            </Link>
                        </li>
                    </ul>
                    {button && <Button buttonStyle='btn--outline'> REGISTER YOUR CAR </Button>}
                </div>
            </nav>

        </>

    )
}

export default Navbar