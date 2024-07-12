import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { addTask, getTasksByCategoryId } from '../scripts/API Calls/tasksApiCalls';
import { deleteCategory, getCategories } from '../scripts/API Calls/categoryApiCalls';
import Task from './TaskCard';
import DateTimePopUp from './DateTimePopUp';

function HomePage({ setIsLogIn }) {
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
        <div className='h-100'
            style={{ transition: '0.3s', display: 'grid', gridTemplateColumns: (showSideBar ? ('min(35%,400px) auto') : '100%') }}>
            {showSideBar &&
                <SideBar
                    closeSideBar={closeSideBar}
                    logOutFunction={logOutFunction}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory} />}

            {activeCategory.length <= 0 ?
                <div className='m-auto'>Create a category first</div> :
                <Tasks
                    logOutFunction={logOutFunction}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory} />}

            {!showSideBar &&
                <div
                    className='rounded-end bg-mid-white p-3'
                    style={{ position: 'fixed', bottom: '1rem', left: 0 }}
                    onClick={e => setShowSideBar(true)}>
                    <img src='menu.svg'></img>
                </div>}
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

    async function deleteCategoryBtnClickHandler() {
        deleteCategory(activeCategory.category_id, async () => {
            getCategories().then((data) => {
                setActiveCategory(data[0])
            })
        })
    }

    return (
        <div className='col p-3 d-flex flex-column' style={{ gap: '0.5rem', overflowY: 'scroll', maxHeight: '100vh' }}>
            {/* Category Details or header */}
            <div className='d-flex justify-content-between'>
                <div>
                    <div className='fw-bold fs-3' style={{ lineHeight: 1.2 }}>
                        {activeCategory.name}
                        <p className='text-muted m-0' style={{ fontSize: '0.8rem' }}>ID: {activeCategory.category_id}</p>
                    </div>
                    <div className='fs-6 text-secondary mt-1'>Created At: {activeCategory.created_at}</div>
                </div>
                <div className='d-flex align-items-center'>
                    <button className='btn px-3 py-2 pb-3 border-0 bg-mid-white' onClick={deleteCategoryBtnClickHandler}>
                        <img src='delete.svg' width={18} height={18}></img>
                    </button>
                </div>
            </div>

            {/* Tasks container */}
            <div className='d-flex flex-column flex-grow-1 scroll' style={{ gap: '0.5rem', maxHeight: '100vh' }}>
                {
                    tasks.length <= 0 ?
                        <div className='m-auto'>No Task Added</div> :
                        tasks.map(task => <Task key={task.task_id} {...task} downloadAllTasks={downloadAllTasks} />)
                }
            </div>


            {/* Add Task Button */}
            <button
                className='rounded ms-auto mt-auto p-3 border-0 bg-glass bg-deep-white'
                data-bs-toggle="modal"
                data-bs-target={"#addTaskPopup"}>
                <div className='btn-close' style={{ transform: 'rotate(45deg)' }}></div>
            </button>
            {/* PopUp for Add Task */}
            <DateTimePopUp
                heading='Add Task'
                id={"addTaskPopup"}
                saveBtnClickHandler={async (dueDate, dueTime) => {
                    addTask(activeCategory.category_id, 'Task', 'Description', dueDate + ' ' + dueTime, downloadAllTasks)
                }}
            />
        </div>
    )
}

export default HomePage;