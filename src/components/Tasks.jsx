import React from "react";
import Task from "./Task";

const Tasks = ({tasks, onDelete}) => {
    return (
        <>
        {/* Map through all tasks to retrieve all buil tasks */}
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