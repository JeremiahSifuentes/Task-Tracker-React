import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'


function App() {
  //State for App
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  // Using Fetch API when the page first loads
  // Every time it loads, it will get the tasks
  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }
    getTasks()
    //Dependencies go in this array
    //If you want above logic to run depending on the change of a value, it goes in here
  }, [])

//Fetch Tasks
const fetchTasks = async () => {
  //Have to create function to use async on
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()

  return data
}

// Fetch Task (Singular)
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()

return data
}

// Add task
// Bring props and logic in form AddTask.js 
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    //add headers to specify content type
    headers: {
      'Content-type': 'application/json'
    },
    // Want this to turn js object into json string so we can extract and show on UI
      body: JSON.stringify(task)
  })

  const data = await res.json()

  setTasks([...tasks, data])


  // Not NEEDED for json-server and BACKEND
  // const id = Math.floor(Math.random() * 10000) + 1
  // // Create new const for new tasks that are being typed in
  // // Using spread operator to bring in object ({id, [text, day, reminder, ]})
  // const newTask = {id, ...task}
  // // Adds new tasks to current task
  // setTasks([...tasks, newTask])
}

//Delete Task
const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
  

  setTasks(tasks.filter((task) => task.id !== id))
}

//Toggle Reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask = {...taskToToggle,
  reminder: !taskToToggle.reminder}
    
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {'Content-type' : 'application/json'},
    body: JSON.stringify(updTask)
  })

  const data = await res.json()

  
  
  setTasks(
      tasks.map((task) => 
      task.id === id ? {...task, reminder:
      data.reminder} : task
      )
    )
  }

  return (
    <div className="container">
      {/* when onAdd is fired off AKA button clicked, we set to opposite of showAddTask
      to show form and hide form*/}
      <Header onAdd={() => setShowAddTask (!showAddTask)} showAdd={showAddTask}/>
      {/* Props are passed in like this */}
      {/* But we need to bring in onAdd as a prop in Addtask ^^^ */}
      {/* curly brackets so I can add js if statement */}
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? (
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
      ) : ( 
        'No Tasks To Show' 
        )}   </div>
  )
}

export default App;
