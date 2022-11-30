import React from 'react';
import styles from '../styles/Home.module.css'
import book from '../public/images/books.png'

export function Navbar() {
    return (
        <nav className={styles.navbar}>
          <a href="#" className="LogoTitle grid grid-cols-10 content-start">
            <div/>
            <div className='rounded-full'>
              <img src={book.src} className="w-2/5 h-3/5 m-5"></img>
            </div>
            <h1 className='font-face-sz text-5xl self-center mb-4'>StudentHelp</h1>
          </a>
        </nav>
    );
};

export default Navbar;