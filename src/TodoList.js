import React, { useEffect, useState } from 'react'
import CreateTask from './CreateTask'
import Card from './Card'

export default function TodoList() {
    const [modal, setModal] = useState(false)
    const [taskList,setTaskList] = useState([])


    const saveTask= (taskObj)=>{
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem('taskList',JSON.stringify(tempList))
        setTaskList(taskList)
        setModal(false)
    }



    const deleteTask = (index) => {
        const updatedList = [...taskList];
        updatedList.splice(index, 1);
        setTaskList(updatedList);
        localStorage.setItem('taskList', JSON.stringify(updatedList));
      }
      
  


    useEffect(()=>{
        let arr=localStorage.getItem('taskList')
       
        if(arr){
            let obj=JSON.parse(arr)
            setTaskList(obj)
        }
         
    },[])
    
    const toggle = ()=>{
        setModal(!modal);
    }

    return (
        <>
            <div className='header text-center'>
                <h1>ToDo List</h1>
                <button className='btn btn-primary mt-2' onClick={()=>setModal(true)}>Create Task</button>
            </div>
            <div className='task-cont'>
                {taskList && taskList.map((obj,index)=> <Card taskObj={obj} index={index}
                 deleteTask={deleteTask}
                 /> )}
            </div>
            <CreateTask toggle={toggle} modal={modal} save={saveTask} />
        </>

    )
}
