import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import GameStart from "./GameStart";
import Game from "./Game";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e5ded7;
    height: 100vh;
    overflow: hidden;
  }
`;

function App() {
  const [inputs, setInputs] = useState({
    username: "",
    phone: "",
  });
  const { username, phone } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const [users, setUsers] = useState([
    { username: "전호용", phone: "01028054538", score: 0 },
  ]);

  const onCreate = () => {
    const user = {
      username,
      phone,
      score: 0,
    };
    setUsers([...users, user]);
  };

  const handleScore = (phone, score) => {
    setUsers(
      users.map((user) =>
        user.phone === phone ? { ...user, score: score } : user
      )
    );
  };

  return (
    <>
      <Router>
        <GlobalStyle />
        <Switch>
          <Route
            exact
            path="/gamestart"
            render={() => (
              <GameStart
                username={username}
                phone={phone}
                onChange={onChange}
                onCreate={onCreate}
                users={users}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <Game
                username={username}
                phone={phone}
                handleScore={handleScore}
              />
            )}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
