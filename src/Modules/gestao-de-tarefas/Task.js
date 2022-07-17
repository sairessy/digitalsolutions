import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import "./Task";
import { Checkbox, IconButton } from "@mui/material";

const Task = ({ id, title, getTodos, _done, date }) => {
  const [done, setDone] = useState(_done);

  const deleteTodo = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/todo/task/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: localStorage.getItem("user"),
        }),
      }
    );

    const json = await res.json();

    getTodos();
  };

  const toggleDone = async (e) => {
    setDone(e.target.checked);

    const res = await fetch(`${process.env.REACT_APP_API_URL}/todo/task/done`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: localStorage.getItem("user"),
        id,
        done: e.target.checked,
      }),
    });

    const json = await res.json();
  };

  return (
    <div className="task">
      <div>
        <p>{title}</p>
        {/* <span className="date">{new Date(date).toLocaleDateString()}</span> */}
      </div>
      <div className="action-icons">
        <Checkbox checked={done} color="success" onChange={toggleDone} />
        <IconButton aria-label="delete" onClick={deleteTodo}>
          <MdDelete size={20} />
        </IconButton>
      </div>
    </div>
  );
};

export default Task;
