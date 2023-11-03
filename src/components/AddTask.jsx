import React, { useState } from "react";

const AddTask = ({addTask}) => {
    const [task, setTask]= useState({
        text: "",
        description:"",
        estimationDate:"",
        startDate: ""
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
        if (!task.text) {
            alert("Please add a task");
            return
          }
          if(task.estimationDate < task.startDate){
            alert("Start date must be lesser than estimation date");
            return
          }
        

        addTask({
            text: task.text,
            description: task.description,
            estimationDate: task.estimationDate,
            startDate: task.startDate
        });

        setTask({
            text: "",
            description:"",
            estimationDate:"",
            startDate: ""
        });
    };

    return (
        <form className="add-form" onSubmit= {handleSubmit}>
            <div className="form-control">
                <label>Task Name</label>
                <input
                required
                maxLength={10}
                name="text"
                type="text"
                placeholder="Add Task Name"
                value={task.text}
                onChange={handleChange}
                />

            </div>

            <div className="form-control">
                <label>Description</label>
                <input
                required
                maxLength={30}
                name="description"
                type="textarea"
                placeholder="Add Descriptions/Comments"
                value={task.description}
                onChange={handleChange}
                />

            </div>

            <div className="form-control">
                <label>Estimate Completion Date</label>
                <input
                required
                name="estimationDate"
                type="date"
                placeholder="Estimation Start Date"
                value={task.estimationDate}
                onChange={handleChange}
                />

            </div>

            <div className="form-control">
                <label>Start Date</label>
                <input
                required
                name="startDate"
                type="date"
                placeholder="Start Date"
                value={task.startDate}
                onChange={handleChange}
                />

            </div>
            <input type="submit" value="Save Task" className="btn btn-block"/>


        </form>
    )
}

export default AddTask; 