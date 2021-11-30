import React, { useState } from 'react';
import './style.css'

const tasksArr = [
  { id: 1, name: "Sacar la ropa", done: false },
  { id: 2, name: "Hacer la cama", done: true },
  { id: 3, name: "Leer un rato", done: false }
]

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

const App = () => {
  const [tasks, setTask] = useState(tasksArr)
  const [value, setValue] = useState('')
  const [ifError, setIfError] = useState(false)

  const handleSubmit = (evento) => {
    evento.preventDefault()
    if(value !== ''){
      const newTasks = {id: tasks.length + 1, name: value, done:false}
      setTask(tasks.concat(newTasks))
      setValue('')
      setIfError(false)
    } else if(value === ''){
      setIfError(true)
    }
  }
  
  const handleChange = ({target}) => {
    setValue(target.value)
  }

  const handleClick = (id) => {
    let indx = undefined
    const selectTasks = tasks.find( (identi, indice) => {
      indx = indice
      return identi.id === id
    })
    selectTasks.done = !selectTasks.done
    const newArr = tasks.map((elem, i) =>
      indx === i ? selectTasks : elem
    );
    setTask(newArr)
  }
 
  return (
    <div className="wrapper">
      <div className="list">
        <h3>Por hacer:</h3>
        <ul className="todo">
          {tasks.map((task, index) => <li onClick={() => handleClick(task.id)} className={task.done? 'done' : null} key={task.id}>{task.name}</li>)}
        </ul>
        <form onSubmit={handleSubmit}>
          <input type="text" id="new-task" value={value} className={ifError? 'error' : null} onChange={handleChange} placeholder="Ingresa una tarea y oprime Enter" />
        </form>
      </div>
    </div>
  )

}

export default App;
