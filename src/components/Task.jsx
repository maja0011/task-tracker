import React from "react";
import {FaTimes,FaEdit} from "react-icons/fa";


const Task = ({task, handleDelete}) => {
    return(
    <div 
    className="task">
    <h3>
        <div className="left">Task Name: {task.text}{" "}</div>
        
        <div className="right">
        <FaEdit
        style= {{color: "blue", cursor: "pointer"}}
        
        />
        <FaTimes
        style={{color: "red", cursor: "pointer"}}
        onClick={()=> handleDelete(task.id)}
        />
        </div>
       
    </h3>
    <p>Task Description: {task.description}</p>
    <p>Task Estimation Date: {task.estimationDate}</p>
    <p>Task Start Date: {task.startDate}</p>
    <p>Task Actual Completion Date: {!task.completionDate ? "Completion Date not selected" : task.completionDate}</p>
    <p>Task Estimate to Completion: {task.estimateToCompletion} days</p>
    <p>Task Actual Completion: {!task.actualCompletion ? "No completion Date given" : `${task.actualCompletion} days`}</p>
    <p>Task Status: {task.status}</p>
    <p>Task Health: {!task.health ? "No completion Date given": task.health}</p>
</div>
);
};

export default Task;
