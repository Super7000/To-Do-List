import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { addTask, deleteTask, getTasks } from '../scripts/apiCalls';
import { convert12hrTo24hr } from '../scripts/utils';

function ToDosPage({ setIsLogIn }) {
    const [showSideBar, setShowSideBar] = useState(true)

    function closeSideBar() {
        setShowSideBar(false)
    }

    function logOutFunction(){
        setIsLogIn(false);
        localStorage.clear();
    }

    return (
        <div className='h-100' style={{ transition: '0.3s', display: 'grid', gridTemplateColumns: (showSideBar ? ('min(35%,400px) auto') : '100%') }}>
            {showSideBar && <SideBar closeSideBar={closeSideBar} logOutFunction={logOutFunction} />}
            <Tasks logOutFunction={logOutFunction} />
        </div>
    );
}

function Tasks({ logOutFunction = () => { } }) {
    const [tasks, setTasks] = useState([])

    const downloadAllTasks = async () => {
        const tasksArray = await getTasks(logOutFunction)
        if (await tasksArray) {
            setTasks(tasksArray)
        } else {
            setTasks([])
        }
    }

    useEffect(() => {
        downloadAllTasks()
    }, [])

    function completedBtnChangeHandler(e, task_id) {
        if (e.target.checked) {
            let newTasks = [...tasks]
            newTasks = newTasks.map(task => {
                if (task.task_id === task_id) {
                    task.completed = true
                }
                return task
            })
            setTasks(newTasks)
        } else {
            let newTasks = [...tasks]
            newTasks = newTasks.map(task => {
                if (task.task_id === task_id) {
                    task.completed = false
                }
                return task
            })
            setTasks(newTasks)
        }
    }

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

    const [dueDate, setDueDate] = useState(formatDate(new Date()))
    const [dueTime, setDueTime] = useState(getCurrentTime())
    return (
        <div className='col p-3 d-flex flex-column' style={{ gap: '0.5rem', overflowY: 'scroll', maxHeight: '100vh' }}>
            <div className='d-flex justify-content-between'>
                <div>
                    <div className='fw-bold fs-3'>List</div>
                    <div className='fs-6 text-secondary'>24th-june-2024</div>
                </div>
                <div className='d-flex align-items-center'>
                    <button className='btn btn-secondary px-2 py-0 pb-2 border-0' style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                        <img src='delete.svg' width={18} height={18}></img>
                    </button>
                </div>
            </div>

            <div className='d-flex flex-column flex-grow-1' style={{ gap: '0.5rem', overflowY: 'scroll', maxHeight: '100vh' }}>
                {
                    tasks.length <= 0 ?
                        <div className='m-auto'>No Task Added</div> :
                        tasks.map(task => <Task key={task.task_id} {...task} completedBtnChangeHandler={completedBtnChangeHandler} downloadAllTasks={downloadAllTasks} />)
                }
            </div>


            <div className="modal" id={'addTaskPopup'}>
                <div className="modal-dialog w-100">
                    <div className="modal-content">

                        <div className="modal-header border-0">
                            <h4 className="modal-title">New Task</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <form className='form card-body d-flex flex-column px-5'>
                                <div>
                                    <label className='form-label'>
                                        Due Date:
                                        <input type="date" name="email" value={dueDate} placeholder='Select a Date' onChange={e => setDueDate(e.target.value)} className='form-control' />
                                    </label>
                                </div>
                                <div>
                                    <label className='form-label'>
                                        Due Time:
                                        <input type="time" name="time" value={dueTime} placeholder='Select a Time' onChange={e => setDueTime(e.target.value)} className='form-control' />
                                    </label>
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={async () => {
                                addTask('Task', 'Description', dueDate + ' ' + dueTime, downloadAllTasks)
                            }}>Save</button>
                            <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
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
    completedBtnChangeHandler = (e, task_id) => { },
    downloadAllTasks = () => { },
}) {
    const [dueDate, setDueDate] = useState(due_date.split('T')[0])
    const [dueTime, setDueTime] = useState(due_date.split('T')[1].split('.')[0].split(':').slice(0, 2).join(':'))
    return (
        <>
            <form className={'card' + (completed ? " border border-2 border-success" : "")} onDoubleClick={e => {
                e.currentTarget.style.cssText = 'border: 2px solid dodgerblue;'
            }}>
                <div className='card-body'>
                    <div className='input-group d-flex align-items-center'>
                        <div className="form-check d-flex align-items-center">
                            <label className="form-check-label">
                                <input className="form-check-input border-2 rounded-pill p-2" type="checkbox" name="completed" onChange={e => completedBtnChangeHandler(e, task_id)} />
                            </label>
                        </div>
                        <input className='text-dark fw-bold border-0 form-control' style={{ textDecoration: (completed ? "line-through" : "none") }} placeholder='Task' defaultValue={title}></input>
                        <div className='text-secondary ms-auto d-flex flex-column align-items-center' data-bs-toggle="modal" data-bs-target={"#popup" + task_id}>
                            <p className='m-0 fw-bold' style={{ fontSize: '0.8rem', textDecoration: (completed ? "line-through" : "none") }} >{dueDate}</p>
                            <p className='m-0 fw-bold' style={{ fontSize: '0.8rem', textDecoration: (completed ? "line-through" : "none") }} >{dueTime}</p>
                        </div>
                        <button className='btn ms-2' onClick={e => {
                            e.preventDefault();
                            deleteTask(task_id, downloadAllTasks);
                        }}>
                            <img src='delete.svg' width={18} height={18}></img>
                        </button>
                        <div className='btn btn-transparant dropdown-toggle border-0' data-bs-toggle="collapse" data-bs-target={"#" + task_id}></div>
                    </div>
                    <textarea id={task_id} className="collapse form-control mt-1" rows={3} style={{ resize: 'none' }} defaultValue={description}></textarea>
                </div>
            </form>
            <div className="modal" id={'popup' + task_id}>
                <div className="modal-dialog w-100">
                    <div className="modal-content">

                        <div className="modal-header border-0">
                            <h4 className="modal-title">Task</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <form className='form card-body d-flex flex-column px-5'>
                                <div>
                                    <label className='form-label'>
                                        Due Date:
                                        <input type="date" name="email" value={dueDate} placeholder='Select a Date' onChange={e => setDueDate(e.target.value)} className='form-control' />
                                    </label>
                                </div>
                                <div>
                                    <label className='form-label'>
                                        Due Time:
                                        <input type="time" name="time" value={dueTime} placeholder='Select a time' onChange={e => setDueTime(e.target.value)} className='form-control' />
                                    </label>
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                            <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ToDosPage;