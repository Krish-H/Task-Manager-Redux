import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../redux/features/taskSlice'

const TaskForm = () => {

    const [text,setText] = useState('')
      
        const dispatch  = useDispatch()

    const handleSubmit = (e)=>{
        e.preventDefault();
      
        if(text.trim().length === 0 ) return alert('Please enter a task')

    
  // dispatch add task action
        dispatch(addTask(
            {
                id: Date.now(),
                text:text.trim(),
                completed:false,   
            }
        ))

        setText('');

    }
  return (
<form onSubmit={handleSubmit} className="flex items-center mb-4">
  <input
    type="text"
    value={text}
    placeholder="Add a new task..."
    className="flex-1 border border-blue-500 rounded-l-full px-4 py-2 h-12"
    onChange={(e)=>setText(e.target.value)}
  />
  <button
    type="submit"
    className="bg-blue-500 hover:bg-blue-700 text-white border border-blue-500 rounded-r-full px-4 py-2 h-12"
    
  >
    Add Task
  </button>
</form>

  )
}

export default TaskForm