import React, { useEffect, useState } from "react";
import { Link, animateScroll as scroll } from 'react-scroll';
import {lan} from "../language"

const lans = [
  {
    name: "English",
    text: "English (United States)",
    id: 'en'
  },
  {
    name: "Spanish",
    text: "Spanish",
    id: 'es'
  },
  {
    name: "Hindu",
    text: "Hindu",
    id: 'hi'
  },
]

const Header = ({setLanguage, language}) => {
  const [open, setOpen] = useState(false);
  const [t, setT] = useState(false);
  const [selectL, setSelectL] = useState('English (United States)')
  const path = window.location.pathname

  const handleSelectLanguage = (id,name) => {
    setSelectL(name);
    setLanguage(id)
    localStorage.setItem('selectedLanguage', id);
    setOpen(false);
  };

  const handleMenu = () => {
    setT(!t);
    setOpen(false)
  }

  useEffect(() => {
    lans.map(item => {
      if(item.id === language){
        setSelectL(item.name);
      }
    })
  }, [])

  return (
    <div className="navbar-logo-left">
      <Link to="ico" spy={true} smooth={true} duration={500} className="nav-banner w-inline-block">
        <div className="text-block">
          {lan[language].bonus}
        </div>
      </Link>
      <div
        data-animation="default"
        data-collapse="medium"
        data-duration={400}
        data-easing="ease"
        data-easing2="ease"
        role="banner"
        className="navbar-logo-left-container shadow-three w-nav"
      >
        <div className="container">
          <div className="navbar-wrapper">
            <a href="/" className="brand w-nav-brand">
              <img
                src="images/clair-logo-image.png"
                alt="logo"
                className="image-3"
              />
              <img
                src="images/clair-svg.svg"
                loading="lazy"
                alt="svg"
                className="image-4"
              />
            </a>
            <nav role="navigation" className="nav-menu-wrapper w-nav-menu">
              <ul role="list" className="nav-menu-two w-list-unstyled">
                <li className="menulist">
                  {lan[language].menu.map((item,idx) => (
                    path === '/' ? <Link to={item.href} spy={true} smooth={true} duration={500} className="nav-link" style={{cursor: 'pointer'}} key={idx}>
                      {item.name}
                    </Link> : <a href={`/#${item.href}`} key={idx} className="nav-link">
                    {item.name}
                    </a>
                  ))}
                  <a
                    href="https://baby-sinclair.gitbook.io/docs/"
                    target="_blank"
                    className="nav-link"
                  >
                    {lan[language].whitePaper}
                  </a>
                  <div className="locales-wrapper w-locales-list">
                    <div
                      data-hover="false"
                      data-delay={0}
                      className="dropdown w-dropdown"
                    >
                      <div
                        data-w-id="09c0577c-1a12-8c75-b683-9a634ffd05ee"
                        className="lan-toggle w-dropdown-toggle"
                        onClick={() => setOpen(!open)}
                      >
                        <div className="nav-link">{selectL}</div>
                        <svg
                          style={{ color: "rgb(104,122,122)" }}
                          className="ikonik-p7oqm"
                          xmlns="http://www.w3.org/2000/svg"
                          width={18}
                          height={18}
                          fill="none"
                          viewBox="0 0 10 7"
                          app="ikonik"
                        >
                          <path
                            className="path-wwalg"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="m1 1.444 4 3.791 4-3.79"
                            app="ikonik"
                          />
                        </svg>
                      </div>
                      <nav
                        className={`dropdown-list w-dropdown-list ${
                          open ? "w--open" : ""
                        }`}
                      >
                        <div role="list" className="w-locales-items">
                          {lans.map((item,idx) => (
                            <span
                              onClick={() => handleSelectLanguage(item.id, item.name)}
                              className="nav-link w-locales-item"
                              id={item.id}
                              key={idx}
                              style={{ whiteSpace: "nowrap", cursor: "pointer" }}
                            >
                              {item.text}
                            </span>
                          ))}
                        </div>
                      </nav>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
            <div onClick={handleMenu} className="menu-button w-nav-button">
              <div className="w-icon-nav-menu" />
            </div>
            <div
              className="w-nav-overlay"
              id="w-nav-overlay-0"
              style={{ height: "7295.27px", display: t ? 'block' : 'none' }}
            >
              <nav
                role="navigation"
                className="nav-menu-wrapper w-nav-menu"
                style={{
                  transform: `${t ?  'translateY(0px)' : 'translateY(-100%)'} translateX(0px)`,
                  transition: "transform 400ms ease 0s"
                }}
                data-nav-menu-open
              >
                <ul role="list" className="nav-menu-two w-list-unstyled" style={{background: "#000"}}>
                  <li style={{display: 'flex', flexDirection: "column"}}>
                    {lan[language].menu.map((item,idx) => (
                      path === '/' ? <Link to={item.href} spy={true} smooth={true} duration={500} className="nav-link" style={{cursor: 'pointer'}} key={idx}>
                        {item.name}
                      </Link> : <a href={`/#${item.href}`} key={idx} className="nav-link">
                      {item.name}
                      </a>
                    ))}
                    <a
                      href="https://baby-sinclair.gitbook.io/docs/"
                      target="_blank"
                      className="nav-link"
                    >
                      {lan[language].whitePaper}
                    </a>
                    <div className="locales-wrapper w-locales-list">
                      <div
                        data-hover="false"
                        data-delay={0}
                        className="dropdown w-dropdown"
                      >
                        <div
                          data-w-id="09c0577c-1a12-8c75-b683-9a634ffd05ee"
                          className="lan-toggle w-dropdown-toggle"
                          onClick={() => setOpen(!open)}
                        >
                          <div className="nav-link">{selectL}</div>
                          <svg
                            style={{ color: "rgb(104,122,122)" }}
                            className="ikonik-p7oqm"
                            xmlns="http://www.w3.org/2000/svg"
                            width={18}
                            height={18}
                            fill="none"
                            viewBox="0 0 10 7"
                            app="ikonik"
                          >
                            <path
                              className="path-wwalg"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="m1 1.444 4 3.791 4-3.79"
                              app="ikonik"
                            />
                          </svg>
                        </div>
                        <nav
                          className={`dropdown-list w-dropdown-list ${
                            open ? "w--open" : ""
                          }`}
                        >
                          <div role="list" className="w-locales-items">
                            {lans.map((item,idx) => (
                              <span
                                onClick={() => {
                                  handleSelectLanguage(item.id, item.name)
                                  handleMenu()}}
                                className="nav-link w-locales-item"
                                id={item.id}
                                key={idx}
                                style={{ whiteSpace: "nowrap", cursor: "pointer" }}
                              >
                                {item.text}
                              </span>
                            ))}
                          </div>
                        </nav>
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
