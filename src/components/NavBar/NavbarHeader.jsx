import React from 'react';
import { Link } from 'react-router-dom';
import { FaAlignRight } from 'react-icons/fa';
import style from '../../styles.module.css';

export const NavbarHeader = ({ handleNavbar }) => {
  return (
    <>
      <header>
        <div className={style.logo}>
          <Link to='/'>ExcerTracker</Link>
          <FaAlignRight onClick={handleNavbar} className={style.toggle__icon} />
        </div>
      </header>
    </>
  );
};
