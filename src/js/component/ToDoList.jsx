import React, { useState, useEffect } from "react";
import "../../styles/ToDoList.css";
import { FiDelete } from "react-icons/fi";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");

  //actualizo localmente el array con la lista de tareas
  const getAllTaks = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/nicosis")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllTaks();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && currentTask.trim()) {
      const auxTask = {
        label: currentTask,
        done: false,
      };

      let newTasks = [auxTask, ...tasks];

      setTasks(newTasks);
      setCurrentTask("");

      // actualizar el array con la tarea agregada a la lista, en el servidor
      fetch("https://assets.breatheco.de/apis/fake/todos/user/nicosis", {
        method: "PUT",
        body: JSON.stringify(newTasks),
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
          getAllTaks()
          //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
          console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
        })
        .catch((error) => console.log(error));
    }
  };

  const handleDelete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1); // elimina la tarea del array en el índice especificado
    console.log(index);
    setTasks(updatedTasks); // actualizo localmente el array sin la tarea eliminada

    // actualizar el array sin la tarea eliminada en el servidor
    fetch("https://assets.breatheco.de/apis/fake/todos/user/nicosis", {
      method: "PUT",
      body: JSON.stringify(updatedTasks),
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
        getAllTaks();
        console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => console.log(error));
  };

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
            <span>
              <FiDelete
                className={`trash-icon`}
                onClick={() => handleDelete(index)}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
