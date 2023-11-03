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
        const taskEstimationDate = new Date(task.estimationDate);
        const taskStartDate = new Date(task.startDate);


        const taskCompletionDate = new Date(task.completionDate);
        let currentDate =new Date().toJSON().slice(0, 10);
        let status;
        let EstimationDatePlusFive = new Date(task.estimationDate);
        let EstimationDatePlusOne = new Date(task.estimationDate);
        let EstimationDateMinusSeven = new Date(task.estimationDate);
        EstimationDatePlusFive.setDate(EstimationDatePlusFive.getDate() +5);
        EstimationDatePlusOne.setDate(EstimationDatePlusOne.getDate() +1);
        EstimationDateMinusSeven.setDate(EstimationDateMinusSeven.getDate() -7);
        let convEstimationDatePlusFive = EstimationDatePlusFive.toJSON().slice(0, 10);
        let convEstimationDatePlusOne = EstimationDatePlusOne.toJSON().slice(0, 10);
        
        let health;

    
      

        const estimateDifference = taskEstimationDate.getTime() - taskStartDate.getTime();
        const estimateToCompletion = estimateDifference / (1000 * 3600 * 24);

        if(currentDate <= task.estimationDate){
            status = "On track";
        } else if (currentDate > task.estimationDate){
            status = "Late";
        }

        if(task.completionDate){
            const completionDifference = taskCompletionDate.getTime() - taskStartDate.getTime();
            var actualCompletion = completionDifference / (1000 * 3600 * 24);
            status = "Terminated";

            if(task.estimationDate >= task.completionDate){
                health = "Green";
                status = "On track";
            } else if((task.completionDate >= convEstimationDatePlusOne ) && task.completionDate <= convEstimationDatePlusFive){
                health = "Yellow";

            } else if (task.completionDate > convEstimationDatePlusFive){
                health = "Red";
                status = "Late";
            }
            
        } else {
            actualCompletion = null;
        }

        //adding new id generated to the task array
        const newTask = {
            id: id,
            estimateToCompletion: estimateToCompletion,
            actualCompletion: actualCompletion,
            status: status,
            health: health,
            ...task
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
