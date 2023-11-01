import React from "react";
import {FaTimes,FaEdit} from "react-icons/fa";

const Task = ({task, handleDelete}) => {
    return(<div className="task">
    <h3>
        {task.text}{""}
        <FaTimes
        style={{color: "red", cursor: "pointer"}}
        onClick={()=> handleDelete(task.id)}
        />
    </h3>
    <p>{task.day}</p>
</div>
);
};

export default Task;
