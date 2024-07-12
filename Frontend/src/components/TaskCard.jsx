import React, { useState } from 'react';
import DateTimePopUp from './DateTimePopUp';

function Task({
    task_id = 1,
    user_id = 1,
    category_id = 1,
    title = 'Task',
    description = '',
    due_date = '2024-07-12 21:44:03',
    completed = false,
    created_at = new Date(),
    updated_at = '2024-06-27 00:00:00',
    downloadAllTasks = () => { },
}) {
    const [titleState, setTitleState] = useState(title)
    const [descriptionState, setDescriptionState] = useState(description)
    const [completedState, setCompletedState] = useState(completed)

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
    function onBlurHandler(e) {
        switch (e.target.name) {
            case 'title':
                updateTask(task_id, e.target.value, descriptionState, due_date, completed, downloadAllTasks, false)
                break;
            case 'description':
                updateTask(task_id, titleState, e.target.value, due_date, completed, downloadAllTasks, false)
                break;
            default:
                break;
        }
    }

    function completedBtnChangeHandler(e) {
        setCompletedState(e.target.checked)
        if (e.target.checked)
            updateTask(task_id, titleState, descriptionState, due_date, true, downloadAllTasks, false)
        else
            updateTask(task_id, titleState, descriptionState, due_date, false, downloadAllTasks, false)
    }
    return (
        <>
            <form className={'card bg-mid-white' + (completed ? " border border-1 border-success bg-light-green" : " ")} onDoubleClick={e => {
                e.currentTarget.style.cssText = 'border: 2px solid dodgerblue;'
            }}>
                <div className='card-body'>
                    <div className='input-group d-flex align-items-center'>
                        <div className="form-check d-flex align-items-center">
                            <label className="form-check-label">
                                <input className="form-check-input border-2 rounded-pill p-2 cursor-pointer" type="checkbox" name="completed" checked={completedState} onChange={e => completedBtnChangeHandler(e)} />
                            </label>
                        </div>
                        <input
                            className='text-dark fw-bold border-0 form-control bg-transparent me-3'
                            style={{ textDecoration: (completed ? "line-through" : "none") }}
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
                        <div className='text-secondary ms-auto d-flex flex-column align-items-center cursor-pointer' data-bs-toggle="modal" data-bs-target={"#popup" + task_id}>
                            <p className='m-0 fw-bold' style={{ fontSize: '0.8rem', textDecoration: (completed ? "line-through" : "none") }} >{due_date.split(' ')[0]}</p>
                            <p className='m-0 fw-bold' style={{ fontSize: '0.8rem', textDecoration: (completed ? "line-through" : "none") }} >{due_date.split(' ')[1]}</p>
                        </div>
                        <button className='btn ms-2' onClick={e => {
                            e.preventDefault();
                            deleteTask(task_id, downloadAllTasks);
                        }}>
                            <img src='delete.svg' width={18} height={18}></img>
                        </button>
                        <div className='btn btn-transparant dropdown-toggle border-0' data-bs-toggle="collapse" data-bs-target={"#" + task_id}></div>
                    </div>
                    <textarea
                        id={task_id}
                        name='description'
                        className="collapse form-control mt-1"
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
                id={'popup' + task_id}
                defaultDueDate={due_date.split(' ')[0]}
                defaultDueTime={due_date.split(' ')[1]}
                saveBtnClickHandler={async (dueDate, dueTime) => {
                    updateTask(task_id, titleState, descriptionState, dueDate + ' ' + dueTime, completed, downloadAllTasks)
                }}
            />
        </>
    )
}

export default Task;