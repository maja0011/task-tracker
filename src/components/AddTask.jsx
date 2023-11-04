import React, { useState } from "react";


const AddTask = ({addTask}) => {
    //usestate for creating task object as well as setting values to it
    const [task, setTask]= useState({
        text: "",
        description:"",
        estimationDate:"",
        startDate: "",
        completionDate:"",
    });
  
    //handlechange for keeping track of user input
    const handleChange = (e) => {
        const {name, value} = e.target;
        setTask((prevTask) => {
            return {
                ...prevTask,
                [name]: value
            };
        });
    };
    //handles validations while creating a task
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
         
        
          //adds data from form to task object
        addTask({
            text: task.text,
            description: task.description,
            estimationDate: task.estimationDate,
            startDate: task.startDate,
            completionDate: task.completionDate
        });

        //resets's parameters of variables to accept new ones
        setTask({
            text: "",
            description:"",
            estimationDate:"",
            startDate: "",
            completionDate:""
        });
    };

    return (
        //form used to retrieve information for Task objects
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

            <div className="form-control">
                <label>Actual Completion Date</label>
                <input
                name="completionDate"
                type="date"
                placeholder="Completion Date"
                value={task.completionDate}
                onChange={handleChange}
                />

            </div>
            <input type="submit" value="Save Task" className="btn btn-block"/>


        </form>
    )
}

export default AddTask; 