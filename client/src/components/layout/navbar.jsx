import React from 'react';
import { Link } from 'react-router-dom';

const navbar = () => {
  return (
    <nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary ">
      <div class="container-fluid">
        <Link className="navbar-brand" to="/">
          RideShare Moto
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link active" to="/add-bike">
                Add New Bike
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link active" to="/about-us">
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default navbar;
