import React, { useState, useEffect } from "react";
import "./App.css";

const initialData = [
  {
    name: "Bob",
    todos: [
      {
        text: "Bob's Todo 1"
      },
      {
        text: "Bob's Todo 2"
      }
    ]
  },
  {
    name: "Steve",
    todos: [
      {
        text: "Steve's Todo 1"
      },
      {
        text: "Steve's Todo 2"
      }
    ]
  },
  {
    name: "Joe",
    todos: [
      {
        text: "Joe's Todo 1"
      },
      {
        text: "Joe's Todo 2"
      }
    ]
  },
  {
    name: "Bill",
    todos: [
      {
        text: "Bill's Todo 1"
      },
      {
        text: "Bill's Todo 2"
      }
    ]
  }
];

function Todo({ todo, first, last, todoIndex, personIndex, data, setData }) {
  function moveLeft(personIndex, todoIndex) {
    let newData = [...data];
    newData[personIndex].todos.splice(todoIndex, 1);
    newData[personIndex - 1].todos.push(todo);
    setData(newData);
  }
  function moveRight() {
    let newData = [...data];
    newData[personIndex].todos.splice(todoIndex, 1);
    newData[personIndex + 1].todos.push(todo);
    setData(newData);
  }
  return (
    <div className="todo">
      {!first ? (
        <button onClick={() => moveLeft(personIndex, todoIndex)}>&lt;</button>
      ) : (
        <p></p>
      )}
      <p>{todo.text}</p>
      {!last ? (
        <button onClick={() => moveRight(personIndex, todoIndex)}>&gt;</button>
      ) : (
        <p></p>
      )}
    </div>
  );
}

// -----------------------------
function Column({ name, todos, personIndex, data, setData, first, last }) {
  function addTodo(index) {
    const newTodoText = window.prompt(`Enter description ${index}`);
    if (newTodoText) {
      const newData = [...data];
      newData[index].todos.push({ text: newTodoText });
      setData(newData);
    }
  }
  return (
    <div className="column">
      <div className="column-header">
        <span>{name}</span>
      </div>
      {todos &&
        todos.map((todo, todoIndex) => {
          return (
            <Todo
              todo={todo}
              key={todoIndex}
              first={first}
              last={last}
              todoIndex={todoIndex}
              personIndex={personIndex}
              data={data}
              setData={setData}
            />
          );
        })}
      <button onClick={() => addTodo(personIndex)} className="add-todo">
        + Add a Card
      </button>
    </div>
  );
}

// -----------------------------
// App
function App() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("todos")) || initialData
  );
  // localStorage to save
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(data));
  });
  return (
    <div className="App">
      {data.map((person, index) => {
        return (
          <Column
            name={person.name}
            todos={person.todos}
            key={index}
            personIndex={index}
            data={data}
            setData={setData}
            first={index === 0}
            last={index === data.length - 1}
          />
        );
      })}
    </div>
  );
}

export default App;
