import React, { useState } from "react";

const AddTask = ({addTask}) => {
    const [task, setTask]= useState({
        text: "",
        day: ""
    });
  

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTask((prevTask) => {
            return {
                ...prevTask,
                [name]: value
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!task.text ) {
            alert("please add a task")
            return
        }

        addTask({
            text: task.text,
            day: task.day
        });

        setTask({
            text: "",
            day: ""
        });
    };

    return (
        <form className="add-form" onSubmit= {handleSubmit}>
            <div className="form-control">
                <label>Task Name</label>
                <input
                name="text"
                type="text'"
                placeholder="Add Task Name"
                value={task.text}
                onChange={handleChange}
                />

            </div>

            <div className="form-control">
                <label>Day & Time</label>
                <input
                name="day"
                type="text'"
                placeholder="Add Day & Time"
                value={task.day}
                onChange={handleChange}
                />

            </div>
            <input type="submit" value="Save Task" className="btn btn-block"/>


        </form>
    )
}

export default AddTask; 