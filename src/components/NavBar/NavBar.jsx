import React, { useState } from 'react';
import { NavbarHeader } from './NavbarHeader';
import { NavbarLinks } from './NavbarLinks';
import style from '../../styles.module.css';

export const NavBar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };
  return (
    <>
      <div className={style.navContainer}>
        <div className={style.container}>
          <div className={style.navWrapper}>
            <NavbarHeader handleNavbar={handleNavbar} />
            <NavbarLinks navbarOpen={navbarOpen} />
          </div>
        </div>
      </div>
    </>
  );
};
