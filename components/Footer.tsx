import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#472f91] py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-white text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-xl font-bold">HANOITRAVEL.vn</h2>
          <p className="text-sm">Km10 Nguyễn Trãi, Hà Đông, tp. Hà Nội</p>
          <p className="text-sm">contact@hanoitravel.com.vn</p>
          <p className="text-sm">0392191291</p>
        </div>
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com/ddthumonky88"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FaFacebookF className="text-white hover:text-gray-300 text-2xl" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FaTwitter className="text-white hover:text-gray-300 text-2xl" />
          </a>
          <a
            href="https://www.instagram.com/ddthupapio_88/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FaInstagram className="text-white hover:text-gray-300 text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
