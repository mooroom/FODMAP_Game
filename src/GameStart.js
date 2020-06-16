import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const GameStart = ({ username, phone, onChange, onCreate, users }) => {
  const RankContainer = styled.div`
    position: absolute;
    top: 50px;
    right: 50px;
  `;
  return (
    <div className="containerBox">
      <h1 className="mb-5">FODMAP game</h1>

      <div className="input-group input-group-lg mb-5 w-50">
        <div className="input-group-prepend">
          <span className="input-group-text" id="username">
            Name
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          name="username"
          value={username}
          onChange={onChange}
          aria-describedby="username"
        />
      </div>
      <div className="input-group input-group-lg mb-5 w-50">
        <div className="input-group-prepend">
          <span className="input-group-text" id="phone">
            Phone
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          name="phone"
          value={phone}
          onChange={onChange}
          aria-describedby="phone"
        />
      </div>
      <Link to="/game">
        <button
          type="button"
          className="btn btn-lg btn-light"
          onClick={onCreate}
        >
          시작하기
        </button>
      </Link>
      <RankContainer>
        <ul>
          {users.map((user) => (
            <li>
              {user.username}/{user.score}
            </li>
          ))}
        </ul>
      </RankContainer>
    </div>
  );
};

export default GameStart;
