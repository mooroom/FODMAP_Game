import React, { useState, useRef, useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import normal from "./img/1.png";
import high from "./img/2.png";
import low from "./img/3.png";
import classNames from "classnames";
import { Link } from "react-router-dom";
import img1 from "./img/1.png";
import img2 from "./img/2.png";
import img3 from "./img/3.png";
import clear from "./sound/clear.mp3";
import fail from "./sound/fail.mp3";

const Game = ({ username, users, phone, handleScore }) => {
  const [number, setNumber] = useState(0);
  let step = useRef(0);
  const [render, setRender] = useState(false);
  const [success, setSuccess] = useState([]);
  const [imgHigh, setImgHigh] = useState(false);
  const [imgLow, setImgLow] = useState(false);

  var clearSound = new Audio(clear);
  var failSound = new Audio(fail);

  const onIncrease = () => {
    setNumber((prevNumber) => prevNumber + 1);
    step.current += 1;

    handleScore(phone, number);
    clearSound.play();
    setImgLow(true);
    setTimeout(() => {
      setImgLow(false);
    }, 1000);
    setSuccess([...success, "O"]);
    if (step.current === 5) setRender(true);
  };

  const onDecrease = () => {
    setNumber((prevNumber) => prevNumber - 1);
    step.current += 1;

    handleScore(phone, number);
    failSound.play();
    setImgHigh(true);
    setTimeout(() => {
      setImgHigh(false);
    }, 1000);
    setSuccess([...success, "X"]);
    if (step.current === 5) setRender(true);
  };

  const onReset = () => {
    step.current = 0;
    setNumber(0);
    setRender(false);
    setSuccess([]);
  };

  let mission = "";

  if (step.current === 5) {
    let successCount = 0;
    for (let i = 0; i < success.length; i++) {
      if (success[i] === "O") {
        successCount += 1;
      }
    }
    if (successCount >= 2) {
      mission = "미션 성공! 상품을 받아가세요~";
    } else {
      mission = "미션 실패ㅠㅠ 다음기회에";
    }
  }

  const ImgTemplate = styled.div`
    width: 1500px;
    height: 1500px;
    background: no-repeat center url(${img1});
    background-size: cover;
    position: relative;
    bottom: 0;
  `;

  const ImgItem = styled.div`
    width: 1500px;
    height: 1500px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  `;

  // const ScoreContainer = styled.div`
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  //   position: absolute;
  //   top: 50px;
  //   left: 50px;
  //   background: white;
  //   padding: 30px;
  // `;

  const LifeContainer = styled.div`
    position: absolute;
    top: 50px;
    left: 50px;
    font-size: 100px;
  `;

  const ButtonContainer = styled.div`
    position: absolute;
    bottom: 50px;
    left: 50px;
  `;

  const MissionContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-size: 100px;
    font-weight: bolder;
    z-index: 100;
    background: white;
  `;

  return (
    <div className="containerBox" style={{ color: "black" }}>
      <ImgTemplate>
        <ImgItem
          style={{ zIndex: "100", backgroundImage: `url(${img2})` }}
          className={classNames({ "animate-flicker": imgHigh })}
        />
        <ImgItem
          style={{ zIndex: "99", backgroundImage: `url(${img3})` }}
          className={classNames({ "animate-flicker": imgLow })}
        />
      </ImgTemplate>

      {/* <ScoreContainer>
        <h1>{username}</h1>
        <h3>score</h3>
        <h1>{number}</h1>
        <h4>high score:</h4>
      </ScoreContainer> */}

      <ButtonContainer>
        <div className="btn-group">
          <button
            className={classNames("btn", "btn-lg", {
              "d-none": render,
            })}
            onClick={onIncrease}
          >
            +
          </button>
          <button
            className={classNames("btn", "btn-lg", {
              "d-none": render,
            })}
            onClick={onDecrease}
          >
            -
          </button>

          <button
            style={{ display: "none" }}
            className={classNames("btn", "btn-lg", "btn-secondary", {
              "d-block": render,
            })}
            onClick={onReset}
          >
            게임종료
          </button>
        </div>
      </ButtonContainer>

      <LifeContainer>
        <div className="succsessState">
          <ul class="list-group list-group-horizontal">
            {success.map((scs) => (
              <li class="list-group-item">{scs}</li>
            ))}
          </ul>
        </div>
      </LifeContainer>

      <MissionContainer>{mission}</MissionContainer>
    </div>
  );
};

export default Game;
