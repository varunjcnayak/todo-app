import React, { useEffect, useState } from 'react';
import './App.css';
import CountdownTimer from './CountdownTimer';
import DialogComponent from './DialogComponent';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [dueDateInput, setDueDateInput] = useState('');
  const [id, setId] = useState(0);
  const [dialogRender,setDialogRender] = useState(false);

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      const selectedDueDate = new Date(dueDateInput);
      const currentDate = new Date();
      if (selectedDueDate < currentDate || isNaN(selectedDueDate)) {
        alert('Please select appropriate due date.');
        return; // Don't add the task
      }

      const dueDate = dueDateInput !== '' ? selectedDueDate : null;

      setTasks([...tasks, { name: taskInput, completion: 0, dueDate, id: id }]);
      setId((prev) => prev + 1);
      setTaskInput('');

    }

  };


  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };
  const handleTaskCompletionChange = (index, newCompletion) => {
    let newTasks = tasks.map((task, i) => {
      if (i === index) {
        if (parseInt(newCompletion) === 100) {
          return null;
        }
        return { ...task, completion: parseInt(newCompletion) };
      }
      return task;
    })
    const filteredTask = newTasks.filter(task => task !== null);

    setTasks(filteredTask);
    console.log(filteredTask);
  };

  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.ctrlKey && event.altKey && event.key === 'o') {
        
        setDialogRender((prev) => !prev)
      }
    }
    window.addEventListener('keyup', handleKeyUp)
    return () => window.removeEventListener('keyup',handleKeyUp)
  }, [])




  return (
    <div >
      <div className='App'>
        <h1>Task Reminder App</h1>
        <div>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter a task..."
          />
          <input
            type="datetime-local"
            value={dueDateInput}
            onChange={(e) => setDueDateInput(e.target.value)}
            min={new Date().toISOString().slice(0, 16)}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      </div>
      {dialogRender ? <DialogComponent /> : (
        <div className="App">
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className='task'>

              <span>{task.name}</span>
              {task.dueDate && (
                <>
                  <span>Due: {task.dueDate.toLocaleString()}</span>
                  <CountdownTimer dueDate={task.dueDate} /> {/* Integrate CountdownTimer */}
                </>
              )}

              <div className="task-progress">
                <progress value={task.completion} max={100}></progress>
                <span>{task.completion}%</span>
              </div>
              <input
                type="range"
                value={task.completion}
                min={0}
                max={100}
                onChange={(e) => handleTaskCompletionChange(index, e.target.value)}
              />
              <button onClick={() => handleDeleteTask(index)} className='comic-button'> Delete</button>

            </li>
          ))}
        </ul>
      </div> )}
    </div> 
  );
}

export default App;
