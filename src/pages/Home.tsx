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
      </div>
    </Fragment>
  );
}
