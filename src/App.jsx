import { useState } from 'react'

export default function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  
  const spacing = 6

  function handleNewTodoChange(event) {
    setNewTodo(event.target.value);
  }

  function handleNewTodoSubmit(event) {
    event.preventDefault();
    if (newTodo == '') {
      return;
    }
    setTodos([...todos, newTodo]);
    setNewTodo("");
  }

  function handleTodoEdit(index) {
    const todoToEdit = todos[index];
    const newText = window.prompt("Edit todo item:", todoToEdit);
    if (newText !== null) {
      const newTodos = [...todos];
      newTodos[index] = newText;
      setTodos(newTodos);
    }
  }

  function handleTodoComplete(index) {
    const newTodos = [...todos];
    const todoToComplete = newTodos[index];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setCompletedTodos([...completedTodos, todoToComplete]);
  }

  function handleTodoDelete(index, completed) {
    if(completed) {
      const newTodos = completedTodos.filter((todo, i) => i !== index);
      setCompletedTodos(newTodos);
    }
    else {
      const newTodos = todos.filter((todo, i) => i !== index);
      setTodos(newTodos);
    }
  }

  return (
    <div>
      <h2>Todo List</h2>
      <form onSubmit={handleNewTodoSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={handleNewTodoChange}
          placeholder='Enter todo name here...'
        />
        <button type="submit" style={{marginLeft: spacing + 'px'}}>Add Todo</button>
      </form>
      <h4>In Progress Todos</h4>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button style={{marginRight: spacing + 'px', marginLeft: spacing + 'px'}} 
              onClick={() => handleTodoEdit(index)}>
              Edit
            </button>
            <button onClick={() => handleTodoComplete(index)}>Complete</button>
            <button style={{marginRight: spacing + 'px', marginLeft: spacing + 'px'}} 
              onClick={() => handleTodoDelete(index, false)}>Delete</button>
          </li>
        ))}
      </ul>
      <h4>Completed Todos</h4>
      <ul>
      {completedTodos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button  style={{marginRight: spacing + 'px', marginLeft: spacing + 'px'}} 
              onClick={() => handleTodoDelete(index, true)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
