
import './App.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
 

  return (
    <>
    <div className='max-w-xl mx-auto p-12'>
    
    <div className='text-3xl mb-5 font-bold'>Task Manager</div>
  
    <TaskForm/>
    <TaskList/>

    </div>

    </>
  )
}

export default App
