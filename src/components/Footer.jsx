import React from "react";
import { lan } from "../language";
import { Link } from "react-router-dom";

const Footer = ({language}) => {
  return (
    <footer className="footer">
      <div className="w-layout-blockcontainer container w-container">
        <div className="footer-component">
          <a
            id="w-node-c23411aa-4530-e93b-7a07-e0e307260fa1-85e878c5"
            href="#"
            className="footer-link inline"
            onClick={() => window.location = 'mailto:contact@clairmeme.com'}
          >
            contact@clairmeme.com
          </a>
          <img
            src="images/CLAIR.svg"
            loading="lazy"
            id="w-node-_0f0be9e6-08b0-6c18-b4eb-7e66d433b48b-85e878c5"
            alt="clair"
            className="footer-logo"
          />
          <div className="footer-links">
            {lan[language].footerLinks.map((item,idx) => (
              <a href={item.href} key={idx} className="footer-link">
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div className="copy-right">
          {lan[language].footerInfo}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
