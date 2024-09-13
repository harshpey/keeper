import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";

const Todo = () => {

    const[todoList, setTodoList] = useState(localStorage.getItem("todos")?
        JSON.parse(localStorage.getItem("todos")):[]);
        const [editId,setEditId] = useState(null)

    const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();

        if(inputText == ""){
            return null;
        }

        const newTodo = {
            id:Date.now(),
            text:inputText,
            isComplete: false,
        }
        setTodoList((prev)=>[...prev, newTodo]);
        inputRef.current.value = "";
    }

    const update = () => {
    //   const listCopy =[...todoList]
    //   listCopy[editId]['text'] = inputRef.current.value
    //   setTodoList([...listCopy])
        
        setTodoList((prevTodos)=>{
            return prevTodos.map((todo)=>{
                if(todo.id===editId){
                    return {...todo, text: inputRef.current.value}
                }
                return todo;
            })
        })
    }

    const deleteTodo = (id) =>{
        setTodoList((prevTodos)=>{
            return prevTodos.filter((todo) => todo.id !==id)
        })
    }

    const checkCompleted = (id) =>{
        setTodoList((prevTodos)=>{
          return  prevTodos.map((todo)=>{
                if(todo.id===id){
                    return {...todo, isComplete: !todo.isComplete}
                }
                return todo;
            })
        })
    }

    const editTodo = (id,text, index) =>{
        setEditId(id)
        todoList.map((todo)=>{
                if(todo.id===id){
                    inputRef.current.value = text
                }
            })
    }

    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todoList))},[todoList])

  return (
    <div className="bg-white place-self-center min-h-height-[550px] flex flex-col  w-11/12 max-w-md p-7 rounded-xl">
      
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      <div className="flex items-center my-7 bg-gray-200 rounded-full gap-1">
        <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder="Add your task..."/>
        <button className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointor" onClick={()=>add()}>ADD +</button>
        <button className="border-none rounded-full bg-emerald-500 w-32 h-14 text-white text-lg font-medium cursor-pointor" onClick={()=>update()}>Update</button>
      </div>

      <div>
        {todoList.map((item,index)=>{
            return <TodoItems key ={item.id} index ={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} checkCompleted={checkCompleted} editTodo = {editTodo} update={update} />
        })}
      </div>
    </div>

  );
};

export default Todo;
