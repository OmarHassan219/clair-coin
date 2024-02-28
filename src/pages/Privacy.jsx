import React from "react";
import { privacyLan } from "../language";

const Privacy = ({ language }) => {
  const {privacy, collection, utilisation, security, retention, connect} = privacyLan[language]

  return (
    <main className="page-wrapper">
      <section className="privacy-section container">
        <div className="privacy-hero block">
          <h2>{privacy.title}</h2>
          <p>{privacy.text}</p>
        </div>
        <div className="block">
          <h3>{collection.title}</h3>
          <p>{collection.text}</p>
          {collection.texts.map((item,idx) => (
            <div className="info" key={idx}>
              <h3 style={{textWrap: "nowrap"}}>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
        <div className="block">
          <h3>{utilisation.title}</h3>
          <p>{utilisation.text}</p>
        </div>
        <div className="block">
          <h3>{security.title}</h3>
          <p>{security.text}</p>
        </div>
        <div className="block">
          <h3>{retention.title}</h3>
          <p>{retention.text}</p>
        </div>
        <div className="block">
          <h3>{connect.title}</h3>
          <p>{connect.text}</p>
        </div>
      </section>
    </main>
  );
};

export default Privacy;
