"use client"
import Task from './Task'; 
import Urgent from './Urgent'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { TEInput, TERipple } from "tw-elements-react";

function Home() {

  const [todo, setTodo] = useState ('')
  const [isUrgent, setIsUrgent] = useState (false)
  const [tasksDB, setTasksDB]=useState([])
  const [urgenttasksDB, setUrgentTasksDB]=useState([])

  const username = useSelector((state) => state.user.value.username)
  const firstname = useSelector( (state)  => state.user.value.firstname)
  // const urgentStore = useSelector((state) => state.tasks.value.urgent)
  
  useEffect(() => {
    fetch(`http://localhost:3000/users/tasks/${username}`)
    .then((response) => response.json())
    .then((data) => {
      setTasksDB(data.tasks)
  })
  fetch(`http://localhost:3000/users/urgent/${username}`)
  .then((response) => response.json())
  .then((data) => {
    setUrgentTasksDB(data.tasks)
})
  }, []);

  //add task to store
  // const addToStore = (task) => {
  //   if (isUrgent){
  //     dispatch(addUrgent(task))
  //     setTodo ('')
  //   }
  //   else {
  //     dispatch(addTask(task))
  //     setTodo('')
  //   }
  // }
  
  
  const tasks = tasksDB.map((data, i) => {
    return <Task key={i} task={data.task} id={data._id} />;
  });

  
  const urgent = urgenttasksDB.map((data, i) => {
    return <Urgent task={data.task} id={data._id} />;
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col p-10 w-full h-full justify-center">
      <h5 className="mb-4 border-b border-secondary-500 pb-4 text-5xl leading-tight">Welcome {firstname}</h5>
        <div className="flex w-full justify-end space-x-4 items-center mb-10">
        <TEInput
          type="text"
          id="taskName"
          label="New task"
          onChange={(e) => setTodo(e.target.value)}
          className="bg-secondary-50"
          ></TEInput>
          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
        <input
          className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-warning-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-warning checked:bg-warning checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
          type="checkbox"
          value=""
          id="urgent" 
          onChange={() => setIsUrgent(!isUrgent)}/>
        <label
          className="inline-block pl-[0.15rem] hover:cursor-pointer"
          htmlFor="checkboxDefault">
          URGENT
        </label>
      </div>
      <TERipple rippleColor="light">
        <button
          type="button"
          onClick={() => addToStore(todo)}
          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          ADD 
        </button>
      </TERipple>
         
        </div>

        <div className=" w-full h-5/6 ">
          {urgent}
          {tasks}
        </div>
      </div>
    </div>
  );
}

export default Home;
