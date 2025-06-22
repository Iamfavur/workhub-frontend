import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> services for your need
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='Try "Plumbing"'
                onChange={(e) => setInput(e.target.value)}
                style={{ width: "800px",height:"50px"}}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Home Cleaning</button>
            <button>Plumbing</button>
            <button>Tailoring</button>
            <button>Carpentry </button>
          </div>
        </div>
        <div className="right">
        </div>
      </div>
    </div>
  );
}

export default Featured;
