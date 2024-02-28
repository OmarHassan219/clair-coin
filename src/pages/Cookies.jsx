import React from "react";
import { cookiesLan } from "../language";

const Cookies = ({ language }) => {
  const {cookies, what, how, managing} = cookiesLan[language]
  return (
    <main className="page-wrapper">
      <section className="cookies-section container">
        <div className="cookies-hero block">
          <h2>{cookies.title}</h2>
          <p>{cookies.text}</p>
        </div>
        <div className="block">
          <h3>{what.title}</h3>
          <p>{what.text}</p>
        </div>
        <div className="block">
          <h3>{how.title}</h3>
          <div className="block-list">
            {how.texts.map((item,idx) => (
              <div className="info" key={idx}>
              <h3 style={{textWrap: "nowrap"}}>{item.title}</h3>
              <p>
                {item.text}
              </p>
            </div>
            ))}
          </div>
        </div>
        <div className="block">
          <h3>{managing.title}</h3>
          {managing.text.map((item,idx) => (
            <p key={idx}>{item}</p>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Cookies;
