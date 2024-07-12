import React, { useEffect, useRef, useState } from 'react';
import ProfileSection from './ProfileSection';
import Categorys from './CategoriesSection';

function SideBar({ closeSideBar, logOutFunction = () => { }, activeCategory, setActiveCategory }) {
    const [searchValue, setSearchValue] = useState('')
    const [width, setWidth] = useState(0)

    const sidebar = useRef()

    function adjustWidth() {
        setWidth(sidebar.current.offsetWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', (e) => {
            adjustWidth()
        })
        adjustWidth()
    }, [])
    return (
        <div className='left-side-bar p-3 col d-flex flex-column bg-light-white' style={{ maxHeight: '100vh' }} ref={sidebar}>
            <div className='left-side-bar-bg' style={{ width: width + 'px' }}></div>
            <div className='flex-grow-1 scroll'>
                <div className='input-group d-flex align-items-center'>
                    <input
                        type='text'
                        placeholder='Search'
                        className='form-control border-end-0 h-100'
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                    ></input>
                    <button className='btn btn-transparant border border-start-0 rounded-end bg-white py-1'>
                        {searchValue.trim().length <= 0 ? <img src='search.svg'></img> : <button className='btn-close' onClick={e => setSearchValue('')}></button>}
                    </button>
                    <button className='btn bg-transparant h-100 ms-1 me-0 pe-2' onClick={closeSideBar}>
                        <img src="menu.svg"></img>
                    </button>
                </div>
                {/* <ImportantCategories /> */}
                <Categorys
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    logOutFunction={logOutFunction}
                    searchValue={searchValue} />
            </div>
            <ProfileSection logOutFunction={logOutFunction} />
            <button className='btn btn-primary mt-3' style={{ whiteSpace: 'nowrap' }} title='Log Out' onClick={logOutFunction}>
                <img src='log-out.svg' className='me-2' width={15} height={15} style={{ transform: 'rotate(-90deg)' }}></img>Log Out
            </button>
        </div>
    );
}

function ImportantCategories() {
    return (
        <div className='mt-3'>
            <div className='d-flex align-items-center' data-bs-toggle="collapse" data-bs-target={"#" + "important"}>
                <img src='star.svg' width={15} height={15}></img>
                <h5 className='ms-2 mb-0 fw-bold'>Important</h5>
                <div className='btn btn-transparant dropdown-toggle border-0 ms-auto'></div>
            </div>
            <div className='collapse' id={"important"}>
                <div className='d-flex flex-column' style={{ gap: '0.3rem', overflowY: 'scroll' }} >
                    <CategoryCard name='Category' />
                    <CategoryCard name='Category' />
                    <CategoryCard name='Category' />
                </div>
            </div>
        </div>
    )
}

export default SideBar;