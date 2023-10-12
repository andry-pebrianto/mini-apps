import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Fragment>
      <div className="container mt-4">
        <h1 className="text-center">My Mini Apps Collections</h1>
        <br />
        <br />
        <p>
          1. <Link to="/mobile-legend">Mobile Legend</Link>
        </p>
        <p>
          2. <Link to="/count-duration">Count Duration</Link>
        </p>
        <p>
          3. <Link to="/meme-generator">Meme Generator</Link>
        </p>
        <p>
          4. <Link to="/caesar-cipher">Caesar Cipher</Link>
        </p>
        <p>
          5. <Link to="/word-scramble">Word Scramble</Link>
        </p>
      </div>
    </Fragment>
  );
}
