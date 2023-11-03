import React from "react";
import {FaTimes,FaEdit} from "react-icons/fa";

const Task = ({task, handleDelete}) => {
    return(
    <div 
    className={`task`}>
    <h3>
        Task Name: {task.text}{" "}
        <FaTimes
        style={{color: "red", cursor: "pointer"}}
        onClick={()=> handleDelete(task.id)}
        />
    </h3>
    <p>Task Description: {task.description}</p>
    <p>Task Estimation Date: {task. estimationDate}</p>
    <p>Task Start Date: {task.startDate}</p>
</div>
);
};

export default Task;
