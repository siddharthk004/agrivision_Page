import React from "react";
import "./about.css";

const Creators = () => {
  return (
    <div className="creators-page">
      <h1>Meet the Creators</h1>
      <p>
        This project was created by a team of passionate developers. Here are
        the people behind it:
      </p>

      <div className="creator">
        <h2>Siddharth Kardile</h2>
        <p>Backend Developer & API Specialist</p>
        <p>This project is an implementation of an idea from Siddharth.</p>
        <a
          href="https://www.linkedin.com/in/siddharthkardile" // Update with the real URL
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>

        <a
          href="https://www.linkedin.com/in/siddharthkardile" // Update with the real URL
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>

      <div className="creator">
        <h2>Sakshi Ladkat</h2>
        <p>Backend Developer & API Specialist</p>
        <p>
          Sakshi works on building and maintaining the server-side logic and
          APIs.
        </p>
        <a
          href="https://www.github.com/sakshiladkat" // Update with the real URL
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>

      <div className="creator">
        <h2>Atharva</h2>
        <p>Front-End Developer</p> {/* Changed "Alex" to "Atharva" */}
        <p>
          Atharva works on developing the user interface and ensures a smooth
          user experience across the app.
        </p>
        <a
          href="https://www.twitter.com/atharva" // Update with the real URL
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </div>

      <footer>
        <p>Thank you for visiting our site!</p>
      </footer>
    </div>
  );
};

export default Creators;
