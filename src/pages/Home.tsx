import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Fragment>
      <div className="container mt-4">
        <h1 className="text-center">Home</h1>
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
      </div>
    </Fragment>
  );
}
