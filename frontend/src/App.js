import React, { Fragment, useEffect, useRef, useState } from "react";
import "./App.css";

const getUser = () => {
  const jsonUser = localStorage.getItem("user-sarafraj-jain");
  let user;
  if (jsonUser && jsonUser != "undefined") {
    user = JSON.parse(jsonUser);
  } else {
    user = { id: `${new Date().toString()} && ${Math.random()}` };
    localStorage.setItem("user-sarafraj-jain", JSON.stringify(user));
  }
  return user;
};

const App = () => {
  const [user, setUser] = useState(getUser());
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (text.length < 3) {
      return alert("Input should be min 3 char");
    }
    try {
      const jsonData = await fetch(`http://localhost:8000/data/${user.id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: text }),
      });
      const data = await jsonData.json();
      setData(data);
      setText("");
    } catch (err) {
      alert(err);
    }
  };

  const hancleDelete = async (idx) => {
    console.log(idx);
    try {
      const jsonData = await fetch(`http://localhost:8000/data/${user.id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index: idx }),
      });
      const data = await jsonData.json();
      setData(data);
      setText("");
    } catch (err) {
      alert(err);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await fetch(`http://localhost:8000/data/${user.id}`);
      const data = await jsonData.json();
      setData(data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Fragment>
      <h1>Simple Todo List</h1>
      <div className="container">
        <div className="input__container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Add Todo"
              value={text}
              onChange={(event) => {
                setText(event.target.value);
              }}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="output__container">
          {data.length != 0 ? (
            data.map((data, idx) => (
              <div key={idx} className="todo__container">
                <span className="todoItems">{data}</span>
                <button
                  onClick={(event) => {
                    hancleDelete(idx);
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <div className="todo__container">
              <span className="todoItems">Please! add some item to list</span>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default App;
