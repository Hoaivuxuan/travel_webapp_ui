import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#013B94] py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-white text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-xl font-bold">Company Name</h2>
          <p className="text-sm">123 Street Name, City, Country</p>
          <p className="text-sm">contact@example.com</p>
          <p className="text-sm">123-456-7890</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-white hover:text-gray-300">
            <img src="/path/to/facebook-icon.png" alt="Facebook" />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <img src="/path/to/twitter-icon.png" alt="Twitter" />
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <img src="/path/to/instagram-icon.png" alt="Instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
