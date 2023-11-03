import React from "react";
import { useState,useEffect } from "react";
import AddTask from "./AddTask";
import Tasks from "./Tasks";
import '../index.css'


//get items(tasks) stored from local storage
const getLocalStorage =() => {
    let tasks = localStorage.getItem("myTasks");
    if(tasks) {
        return JSON.parse(localStorage.getItem("myTasks"));
    } else {
        return [];
    }
};

function Main() {
    //use state for toggling "add" button to reveal task form
    const [showAddButton, setShowAddButton] = useState(false);

    //use state for adding tasks
    const [tasks, setTasks] = useState(getLocalStorage());

    //function for adding a task
    const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000 +1);

        //adding new id generated to the task array
        const newTask = {
            id: id,
            ... task
        };
        setTasks([...tasks, newTask]);
    }

    //function for deleting a task
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    //Show Add form/button
    const showTaskForm = () => {
        setShowAddButton(!showAddButton);
    };

    useEffect(() => {
        localStorage.setItem("myTasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className="container">
            <header className="header">
                <h1>Task Tracker</h1>
                <button className="btn"
                style ={{backgroundColor:showAddButton ? "red" : "green"}}
                onClick={showTaskForm}
                > {showAddButton ? "Close" : "Add"}


                </button>
            </header>
            {showAddButton && <AddTask addTask ={addTask} />}
            {tasks.length > 0 ? (
                <Tasks
                tasks ={tasks}
                onDelete = {deleteTask}
                />
                
            ):(
                "No Tasks to Show"
            )}

        </div>
    );


}

export default Main;
