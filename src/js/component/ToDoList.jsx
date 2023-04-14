import React, { useState, useEffect } from "react";
import "../../styles/ToDoList.css";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');
  // console.log(currentTask);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && currentTask.trim()) {
      const aux = {
        label: currentTask,
        done: false,
      };

      setTasks([aux, ...tasks])
      setCurrentTask("");
      console.log(currentTask);
    }
  };

  const getAllTaks = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/nicosis")
    .then((response) => response.json())
    .then((data) => setTasks(data))
    .catch((error) => console.log(error))
  }

  useEffect(() => {getAllTaks()}, []);

  // useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/nicosis", {
      method: "PUT",
      body: JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => {
        console.log(error);
      });
  // }, [tasks]);

  return (
    <div className="container my-5 w-50">
      <h1>to do list</h1>
      <input
        className="input form-control mb-3"
        type="text"
        placeholder="Nueva tarea"
        maxLength={120}
        onChange={(e) => setCurrentTask(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
        value={currentTask}
      />
      <ul className="list-group">
        {tasks.map((item, index) => (
          <li
            id="li"
            className="list-group-item d-flex justify-content-between align-items-center"
            key={index}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
