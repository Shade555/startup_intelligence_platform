'use client';

import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <img src="/vercel.svg" alt="Logo" className="navbar-logo-img" />
        </Link>
        <div className="navbar-spacer"></div>
        <div className="navbar-buttons">
          <Link href="/auth/signin" className="navbar-btn signin-btn">
            Sign In
          </Link>
          <Link href="/auth/signup" className="navbar-btn signup-btn">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
