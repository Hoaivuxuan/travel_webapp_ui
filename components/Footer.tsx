import React from "react";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="bg-[#013B94] py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-white text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-xl font-bold">RedDevilTravel.vn</h2>
          <p className="text-sm">123 Street Name, City, Country</p>
          <p className="text-sm">contact@example.com</p>
          <p className="text-sm">123-456-7890</p>
        </div>
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com/ddthumonky88"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FacebookOutlined className="text-white hover:text-gray-300" style={{ fontSize: '24px' }} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <TwitterOutlined className="text-white hover:text-gray-300" style={{ fontSize: '24px' }} />
          </a>
          <a
            href="https://www.instagram.com/ddthupapio_88/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <InstagramOutlined className="text-white hover:text-gray-300" style={{ fontSize: '24px' }} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
