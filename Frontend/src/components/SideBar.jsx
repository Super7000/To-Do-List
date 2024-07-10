import React from 'react';
import ProfileSection from './ProfileSection';

function SideBar({ closeSideBar, logOutFunction = () => { } }) {
    return (
        <div className='left-side-bar p-3 col d-flex flex-column' style={{ backgroundColor: 'rgba(0,0,0,0.04)' }}>
            <div className='input-group d-flex align-items-center'>
                <input type='text' placeholder='Search' className='form-control border-end-0 h-100'></input>
                <button className='btn btn-transparant border border-start-0 rounded-end bg-white'>
                    <img src='search.svg'></img>
                </button>
                <button className='btn bg-transparant h-100 ms-3 me-1' onClick={closeSideBar}>
                    <img src="menu.svg"></img>
                </button>
            </div>
            <Groups />
            <Lists />
            <ProfileSection />
            <button className='btn btn-primary mt-3' style={{ whiteSpace: 'nowrap' }} title='Log Out' onClick={logOutFunction}>
                <img src='log-out.svg' className='me-2' width={15} height={15} style={{ transform: 'rotate(-90deg)' }}></img>Log Out
            </button>
        </div>
    );
}

function Groups() {
    return (
        <div className='mt-3'>
            <div className='d-flex align-items-center' data-bs-toggle="collapse" data-bs-target={"#" + "important"}>
                <img src='star.svg' width={15} height={15}></img>
                <h5 className='ms-2 mb-0 fw-bold'>Important</h5>
                <div className='btn btn-transparant dropdown-toggle border-0 ms-auto'></div>
            </div>
            <div className='collapse' id={"important"}>
                <div className='d-flex flex-column' style={{ gap: '0.3rem' }} >
                    <ListCard listName='List1' />
                    <ListCard listName='List2' />
                    <ListCard listName='List3' />
                </div>
            </div>
        </div>
    )
}

function Lists() {
    return (
        <div className='mt-4 flex-grow-1'>
            <h5 className='fw-bold'>Lists</h5>
            <div className='d-flex flex-column' style={{ gap: '0.3rem' }} >
                <ListCard listName='List1' />
                <ListCard listName='List2' />
                <ListCard listName='List3' />
                <ListCard listName='List4' />
            </div>
        </div>
    )
}

function ListCard({ listName = "List", listId }) {
    return (
        <div className='card'>
            <div className='card-body p-2'>
                <div className='text'>{listName}</div>
            </div>
        </div>
    )
}

export default SideBar;