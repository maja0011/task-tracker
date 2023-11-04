import React from "react";
import { useState,useEffect } from "react";
import AddTask from "./AddTask";
import Tasks from "./Tasks";
import SearchIcon from '../search.svg'
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
    //use state for keeping track of search term
    const [searchTerm, setSearchTerm] = useState('');

   
    

    //function for adding a task
    const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000 +1);
        const taskEstimationDate = new Date(task.estimationDate);
        const taskStartDate = new Date(task.startDate);

        //various date conversions to calculate other variables
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

        //adding new id to task object then added to the task array
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

    //function for deleting a task using task ID
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    //function for searching for task using it's name
    const taskSearch = (taskName) =>{
        if(taskName.length > 0){
            setTasks(tasks.filter((task) => task.text.includes(taskName)));
        }

    };

    // const editTaskFunction = (id) => {
    // setTasks(tasks.map(task => task.id === id ? {...task, isEditing: !task.isEditing} : task))
    // };

    //Show Add form/button
    const showTaskForm = () => {
        setShowAddButton(!showAddButton);
    };

   
    
    // use effect used to retrieve information from local storage at load
    useEffect(() => {
        localStorage.setItem("myTasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className="container">
             <div className='search'>
                <input
                type="text"
                    placeholder='Search for Tasks'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} //keeping track of user input in searchbar
                />
                
                <img
                    src={SearchIcon}
                    alt="an icon for searching"
                    onClick={() => taskSearch(searchTerm)} //onclick for calling the searchTerm function
                />
            </div>
            <header className="header">

                <h1>Task Tracker</h1>
                <button className="btn"
                style ={{backgroundColor:showAddButton ? "red" : "green"}} //switching button color based on showaddbutton being true or false
                onClick={showTaskForm}
                > {showAddButton ? "Close" : "Add"}


                </button>
            </header>
            {/* calling addtask class to add new task when add button is clicked */}
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
