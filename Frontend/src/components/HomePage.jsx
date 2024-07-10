import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { getTasks } from '../scripts/apiCalls';

function ToDosPage({ setIsLogIn }) {
    const [showSideBar, setShowSideBar] = useState(true)

    function closeSideBar() {
        setShowSideBar(false)
    }

    return (
        <div className='h-100' style={{ transition: '0.3s', display: 'grid', gridTemplateColumns: (showSideBar ? ('min(35%,400px) auto') : '100%') }}>
            {showSideBar && <SideBar closeSideBar={closeSideBar} setIsLogIn={setIsLogIn} />}
            <Tasks />
        </div>
    );
}

function Tasks() {
    const [tasks, setTasks] = useState([
        {
            task_id: 1,
            user_id: 1,
            category_id: 1,
            title: 'Task 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            due_date: '2024-06-24',
            completed: false,
            created_at: '2024-06-24 00:00:00',
            updated_at: '2024-06-24 00:00:00',
        },
        {
            task_id: 2,
            user_id: 1,
            category_id: 1,
            title: 'Task 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            due_date: '2024-06-25',
            completed: false,
            created_at: '2024-06-25 00:00:00',
            updated_at: '2024-06-25 00:00:00',
        },
        {
            task_id: 3,
            user_id: 1,
            category_id: 1,
            title: 'Task 3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            due_date: '2024-06-26',
            completed: false,
            created_at: '2024-06-26 00:00:00',
            updated_at: '2024-06-26 00:00:00',
        },
        {
            task_id: 4,
            user_id: 1,
            category_id: 1,
            title: 'Task 4',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            due_date: '2024-06-27',
            completed: false,
            created_at: '2024-06-27 00:00:00',
            updated_at: '2024-06-27 00:00:00',
        },
    ])

    useEffect(() => {
        console.log(getTasks())
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
            <div className='d-flex flex-column' style={{ gap: '0.5rem', overflowY: 'scroll', maxHeight: '100vh' }}>
                {tasks.length <= 0 ? "No Task Added" : tasks.map(task => <Task key={task.task_id} {...task} completedBtnChangeHandler={completedBtnChangeHandler} />)}
            </div>
            <button className='rounded ms-auto mt-auto p-3 border-0' style={{ backgroundColor: 'rgba(0,0,0,0.1)' }} onClick={async () => {
                let newTasks = [...tasks]
                let id = tasks[tasks.length - 1].task_id + 1;
                newTasks.push({
                    task_id: id,
                    user_id: 1,
                    category_id: 1,
                    title: 'Task ' + id,
                    description: '',
                    due_date: '2024-06-27',
                    completed: false,
                    created_at: new Date(),
                    updated_at: '2024-06-27 00:00:00',
                })
                setTasks(newTasks)
            }}>
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
    due_date = '2024-06-27',
    completed = false,
    created_at = new Date(),
    updated_at = '2024-06-27 00:00:00',
    completedBtnChangeHandler = (e, task_id) => { }
}) {
    const [dueDate, setDueDate] = useState('2003-12-12')
    function inputHandler(e) {
        setDueDate(e.target.value)
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
                                <input className="form-check-input border-2 rounded-pill p-2" type="checkbox" name="completed" onChange={e => completedBtnChangeHandler(e, task_id)} />
                            </label>
                        </div>
                        <input className='text-dark fw-bold border-0 form-control' style={{ textDecoration: (completed ? "line-through" : "none") }} placeholder='Task' defaultValue={title}></input>
                        <div className='btn btn-transparant border-0' data-bs-toggle="modal" data-bs-target={"#popup" + task_id}>
                            <img src='edit.svg'></img>
                        </div>
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
                                        <input type="date" name="email" value={dueDate} placeholder='Select a Date' onChange={inputHandler} className='form-control' />
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