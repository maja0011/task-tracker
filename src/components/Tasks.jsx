import React from "react";
import Task from "./Task";

const Tasks = ({tasks, onDelete}) => {
    return (
        <>
        {tasks.map((task) => {
            return (
                <Task
                key={task.id}
                task={task}
                handleDelete={onDelete}
                
                />
            );
        })}
        
        </>
    );
};

export default Tasks;