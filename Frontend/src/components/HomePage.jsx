import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { addTask, deleteTask, getTasksByCategoryId, updateTask } from '../scripts/API Calls/tasksApiCalls';
import { deleteCategory, getCategories } from '../scripts/API Calls/categoryApiCalls';

function ToDosPage({ setIsLogIn }) {
    const [showSideBar, setShowSideBar] = useState(true)
    const [activeCategory, setActiveCategory] = useState('')

    function closeSideBar() {
        setShowSideBar(false)
    }

    function logOutFunction() {
        setIsLogIn(false);
        localStorage.clear();
    }

    return (
        <div className='h-100' style={{ transition: '0.3s', display: 'grid', gridTemplateColumns: (showSideBar ? ('min(35%,400px) auto') : '100%') }}>
            {showSideBar && <SideBar closeSideBar={closeSideBar} logOutFunction={logOutFunction} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />}
            {activeCategory.length <= 0 ? <div className='m-auto'>Create a category first</div> : <Tasks logOutFunction={logOutFunction} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />}
        </div>
    );
}

function Tasks({ logOutFunction = () => { }, activeCategory, setActiveCategory }) {
    const [tasks, setTasks] = useState([])

    const downloadAllTasks = async () => {
        const tasksArray = await getTasksByCategoryId(activeCategory.category_id, logOutFunction)
        if (await tasksArray) {
            setTasks(tasksArray)
        } else {
            setTasks([])
        }
    }

    useEffect(() => {
        downloadAllTasks()
    }, [activeCategory])

    return (
        <div className='col p-3 d-flex flex-column' style={{ gap: '0.5rem', overflowY: 'scroll', maxHeight: '100vh' }}>
            <div className='d-flex justify-content-between'>
                <div>
                    <div className='fw-bold fs-3' style={{ lineHeight: 1.2 }}>{activeCategory.name} <p className='text-muted m-0' style={{ fontSize: '0.8rem' }}>ID: {activeCategory.category_id}</p></div>
                    <div className='fs-6 text-secondary mt-1'>{activeCategory.created_at}</div>
                </div>
                <div className='d-flex align-items-center'>
                    <button className='btn btn-secondary px-2 py-0 pb-2 border-0' style={{ backgroundColor: 'rgba(0,0,0,0.2)' }} onClick={async () => {
                        deleteCategory(activeCategory.category_id, async () => {
                            getCategories().then((data) => {
                                setActiveCategory(data[0])
                            })
                        })
                    }}>
                        <img src='delete.svg' width={18} height={18}></img>
                    </button>
                </div>
            </div>

            <div className='d-flex flex-column flex-grow-1 scroll' style={{ gap: '0.5rem', maxHeight: '100vh' }}>
                {
                    tasks.length <= 0 ?
                        <div className='m-auto'>No Task Added</div> :
                        tasks.map(task => <Task key={task.task_id} {...task} downloadAllTasks={downloadAllTasks} />)
                }
            </div>
            <PopUp
                heading='Add Task'
                id={"addTaskPopup"}
                saveBtnClickHandler={async (dueDate, dueTime) => {
                    addTask(activeCategory.category_id, 'Task', 'Description', dueDate + ' ' + dueTime, downloadAllTasks)
                }}
            />
            <button className='rounded ms-auto mt-auto p-3 border-0' style={{ backgroundColor: 'rgba(0,0,0,0.1)' }} data-bs-toggle="modal" data-bs-target={"#addTaskPopup"}>
                <div className='btn-close' style={{ transform: 'rotate(45deg)' }}></div>
            </button>
        </div>
    )
}

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
            <form className={'card' + (completed ? " border border-2 border-success" : "")} onDoubleClick={e => {
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
                            className='text-dark fw-bold border-0 form-control'
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
            <PopUp
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

function PopUp({ heading, saveBtnClickHandler = (a, b) => { }, id, onChangeClickHanlder = (e) => { }, defaultDueDate, defaultDueTime }) {
    function getCurrentTime() {
        const now = new Date();

        let hours = now.getHours();
        let minutes = now.getMinutes();

        // Ensure two digits for hours
        hours = hours < 10 ? `0${hours}` : hours;

        const time = `${hours}:${minutes}`;

        return time;
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const [dueDate, setDueDate] = useState(defaultDueDate ? defaultDueDate : formatDate(new Date()))
    const [dueTime, setDueTime] = useState(defaultDueTime ? defaultDueTime : getCurrentTime())

    function onChangeClickHanlderInner(e) {
        switch (e.target.name) {
            case 'date':
                setDueDate(e.target.value)
                break;
            case 'time':
                setDueTime(e.target.value)
                break;
            default:
                break;
        }
        onChangeClickHanlder(e)
    }
    return (
        <div className="modal" id={id}>
            <div className="modal-dialog w-100">
                <div className="modal-content">

                    <div className="modal-header border-0">
                        <h4 className="modal-title">{heading}</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body">
                        <form className='form card-body d-flex flex-column px-5' style={{ gap: '0.5rem' }}>
                            <div>
                                <label className='form-label'>
                                    Due Date:
                                    <input type="date" name="date" value={dueDate} placeholder='Select a Date' onChange={onChangeClickHanlderInner} className='form-control mt-2' />
                                </label>
                            </div>
                            <div>
                                <label className='form-label'>
                                    Due Time:
                                    <input type="time" name="time" value={dueTime} placeholder='Select a time' onChange={onChangeClickHanlderInner} className='form-control mt-2' />
                                </label>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer border-0">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => saveBtnClickHandler(dueDate, dueTime)}>Save</button>
                        <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ToDosPage;