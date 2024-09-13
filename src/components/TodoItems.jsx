import React from 'react'
import tick from "../assets/tick.png";
import delete_icon from "../assets/delete.png";

const TodoItems = ({text,id,isComplete,deleteTodo,checkCompleted,editTodo, index}) => {
  return (
    <div className='flex items-center my-3 gap-2'>
      <div onClick = {()=>checkCompleted(id)} className='flex flex-1 items-center cursor-pointer'>
        <img src={isComplete?tick:""} alt='' className='w-7'/>
        <p className={`text-slate-700 ml-4 text-p[17px] decoration-slate-500 ${isComplete?"line-through":""}`}>{text}</p>
      </div>

      <img onClick = {()=>deleteTodo(id)} src={delete_icon} className='w-3.5 cursor-pointer'/>
      <p onClick={()=>editTodo(id,text, index)} className='edit cursor-pointer'>Edit</p>
    </div>
  )
}

export default TodoItems
