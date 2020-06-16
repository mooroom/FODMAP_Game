import React, { useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
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

  return <UserContext.Provider>{children}</UserContext.Provider>;
};
