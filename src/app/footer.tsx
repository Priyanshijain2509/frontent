'use client'

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-100 p-3 custom-footer">
      <div className="container mx-auto flex justify-between">
        <div>
          <p>&copy; 2024 Redmine</p>
        </div>
        <div>
          <Link href="/about" className="mx-2">
            About
          </Link>
          <Link href="/contact" className="mx-2">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
