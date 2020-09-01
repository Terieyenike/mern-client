import React from 'react';
import style from '../../styles.module.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const links = [
  {
    id: 0,
    name: 'Exercises',
    path: '/',
  },
  {
    id: 1,
    name: 'Create Exercise',
    path: '/create',
  },
  {
    id: 2,
    name: 'Create User',
    path: '/user',
  },
];

export const NavbarLinks = ({ navbarOpen }) => {
  return (
    <>
      <LinkWrapper open={navbarOpen}>
        <ul className={style.nav__list}>
          {links.map((link) => (
            <li key={link.id} className={style.nav__item}>
              <Link to={link.path} className={style.nav__link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </LinkWrapper>
    </>
  );
};

const LinkWrapper = styled.nav`
  height: ${({ open }) => (open ? '130px' : '0px')};
  overflow: hidden;
  transition: all 1s ease-in-out;
  @media screen and (min-width: 768px) {
    height: auto;
  }
`;
