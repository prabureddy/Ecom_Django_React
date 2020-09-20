import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

import { signout, isAuthenticated } from "../auth/helper";
import { getCategories } from "../core/helper/categoryHelper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#03989f", textDecoration: "underline" };
  } else {
    return { color: "#3cc34a" };
  }
};

const Menu = ({ history, path }) => {
  const [categories, setCategories] = useState([]);
  const getCategoriesAll = async () => {
    let ac = await getCategories();
    setCategories(ac.map((c) => c.name));
  };
  useEffect(() => {
    getCategoriesAll();
  }, []);
  console.log(categories);
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <a className="navbar-brand" href="#">
          Rabbit Cart
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="nav nav-tabs my-2">
            <li className="nav-item">
              <Link
                style={currentTab(history, "/")}
                className="nav-link nav-text"
                to="/"
              >
                Home
              </Link>
            </li>
            {categories?.length > 0 && (
              <li className="nav-item">
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle nav-link"
                    type="button"
                    id="dropdown-catalog"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="nav-text" style={{ color: "#3cc34a" }}>
                      Catalog
                    </span>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdown-catalog"
                  >
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        className="dropdown-item"
                        onClick={() => {}}
                        type="button"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </li>
            )}
            <li className="nav-item">
              <Link
                style={currentTab(history, "/cart")}
                className="nav-link nav-text"
                to="/cart"
              >
                Cart
              </Link>
            </li>
            {isAuthenticated() && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/user/dashboard")}
                  className="nav-link nav-text"
                  to="/user/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}
            {!isAuthenticated() && (
              <>
                <li className="nav-item">
                  <Link
                    style={currentTab(history, "/signup")}
                    className="nav-link nav-text"
                    to="/signup"
                  >
                    Create Account
                  </Link>
                </li>
                <li className="nav-item nav-text">
                  <Link
                    style={currentTab(history, "/signin")}
                    className="nav-link nav-text"
                    to="/signin"
                  >
                    Log In
                  </Link>
                </li>
              </>
            )}

            {isAuthenticated() && (
              <li className="nav-item">
                <span
                  onClick={() => {
                    signout(() => {
                      history.push("/");
                    });
                  }}
                  className="nav-link nav-text"
                  style={{ cursor: "pointer", color: "#3cc34a" }}
                >
                  Log Out
                </span>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Menu);
