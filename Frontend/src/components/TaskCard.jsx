import React, { useState } from 'react';
import DateTimePopUp from './DateTimePopUp';

function Task({
    taskDetails = {
        task_id: 1,
        user_id: 1,
        category_id: 1,
        title: 'Task',
        description: '',
        due_date: '2024-07-12 21:44:03',
        completed: false,
        created_at: new Date(),
        updated_at: '2024-06-27 00:00:00'
    },
    onDelete = async () => { },
    onTaskDetailsUpdate = async () => { }
}) {
    const [titleState, setTitleState] = useState(taskDetails.title)
    const [descriptionState, setDescriptionState] = useState(taskDetails.description)
    const [completedState, setCompletedState] = useState(taskDetails.completed)

    {/*Handlers for Title and Description Inputs*/ }
    function onChangeHandler(e) {
        switch (e.target.name) {
            case 'title':
                setTitleState(e.target.value)
                break;
            case 'description':
                setDescriptionState(e.target.value)
                break;
            default:
                break;
        }
    }

    {/*calling the update api when user click outside of the task element*/ }
    function onBlurHandler(e) {
        const { task_id, due_date, completed } = taskDetails
        switch (e.target.name) {
            case 'title':
                onTaskDetailsUpdate({ task_id, title: e.target.value, description: descriptionState, due_date, completed })
                break;
            case 'description':
                onTaskDetailsUpdate({ task_id, title: titleState, description: e.target.value, due_date, completed })
                break;
            default:
                break;
        }
    }

    function completedBtnChangeHandler(e) {
        const { task_id, due_date } = taskDetails
        setCompletedState(e.target.checked)
        if (e.target.checked)
            onTaskDetailsUpdate({ task_id, title: titleState, description: descriptionState, due_date, completed: true })
        else
            onTaskDetailsUpdate({ task_id, title: titleState, description: descriptionState, due_date, completed: false })
    }
    return (
        <>
            <form
                className={'card bg-glass bg-mid-white' + (taskDetails.completed ? " border border-1 border-success bg-light-green" : " ")}
                onDoubleClick={e => {
                    e.currentTarget.style.cssText = 'border: 2px solid dodgerblue;'
                }}>
                <div className='card-body'>
                    <div className='input-group d-flex align-items-center'>
                        <div className="form-check d-flex align-items-center">
                            <label className="form-check-label">
                                <input
                                    className="form-check-input border-2 rounded-pill p-2 cursor-pointer"
                                    type="checkbox"
                                    name="completed"
                                    checked={completedState}
                                    onChange={e => completedBtnChangeHandler(e)} />
                            </label>
                        </div>
                        <input
                            className='text-dark fw-bold border-0 form-control bg-transparent me-3'
                            style={{ textDecoration: (taskDetails.completed ? "line-through" : "none") }}
                            name='title'
                            placeholder='Task'
                            value={titleState}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            onKeyDown={e => {
                                if (e.key === 'Enter' || e.keyCode === 13) {
                                    e.currentTarget.blur()
                                }
                            }}
                        />
                        <div className='text-secondary ms-auto d-flex flex-column align-items-center cursor-pointer' data-bs-toggle="modal" data-bs-target={"#popup" + taskDetails.task_id}>
                            <p className='m-0 fw-bold' style={{ fontSize: '0.8rem', textDecoration: (taskDetails.completed ? "line-through" : "none") }} >
                                {taskDetails.due_date.split(' ')[0]}
                            </p>
                            <p className='m-0 fw-bold' style={{ fontSize: '0.8rem', textDecoration: (taskDetails.completed ? "line-through" : "none") }} >
                                {taskDetails.due_date.split(' ')[1]}
                            </p>
                        </div>
                        <button className='btn ms-2' onClick={async e => {
                            e.preventDefault()
                            await onDelete(taskDetails)
                        }}>
                            <img src='delete.svg' width={18} height={18}></img>
                        </button>
                        <div
                            className='btn btn-transparant dropdown-toggle border-0'
                            data-bs-toggle="collapse"
                            data-bs-target={"#" + taskDetails.task_id}></div>
                    </div>
                    <textarea
                        id={taskDetails.task_id}
                        name='description'
                        className="collapse form-control mt-1 bg-deep-white"
                        rows={3}
                        style={{ resize: 'none' }}
                        value={descriptionState}
                        onChange={onChangeHandler}
                        onBlur={onBlurHandler}
                    />
                </div>
            </form>
            <DateTimePopUp
                heading='Edit Task'
                id={'popup' + taskDetails.task_id}
                defaultDueDate={taskDetails.due_date.split(' ')[0]}
                defaultDueTime={taskDetails.due_date.split(' ')[1]}
                saveBtnClickHandler={async (dueDate, dueTime) => {
                    const { task_id } = taskDetails
                    onTaskDetailsUpdate({ task_id, title: titleState, description: descriptionState, due_date: dueDate + ' ' + dueTime, completed: taskDetails.completed })
                }}
            />
        </>
    )
}

export default Task;