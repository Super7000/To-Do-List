import React, { useEffect, useRef, useState } from 'react';
import ProfileSection from './ProfileSection';
import Categorys from './CategoriesSection';
import { addCategory, getCategories, updateCategory } from '../scripts/API Calls/categoryApiCalls';

function SideBar({ closeSideBar, logOutFunction = () => { }, activeCategory, setActiveCategory }) {
    const [width, setWidth] = useState(0)

    const sidebar = useRef()

    function adjustWidth() {
        if (sidebar.current === null) return
        setWidth(sidebar.current.offsetWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', (e) => {
            adjustWidth()
        })
        adjustWidth()
    }, [])
    return (
        <div className='left-side-bar p-3 col d-flex flex-column bg-light-white align-items-between' style={{ maxHeight: '100vh' }} ref={sidebar}>
            <div className='left-side-bar-bg' style={{ width: width + 'px' }}></div>
            <CategoriesWithSearch logOutFunction={logOutFunction} closeSideBar={closeSideBar} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <ProfileSection logOutFunction={logOutFunction} />
            <button className='btn btn-primary mt-3' style={{ whiteSpace: 'nowrap' }} title='Log Out' onClick={logOutFunction}>
                <img src='log-out.svg' className='me-2' width={15} height={15} style={{ transform: 'rotate(-90deg)' }}></img>Log Out
            </button>
        </div>
    );
}

function CategoriesWithSearch({ logOutFunction = () => { }, closeSideBar = () => { }, activeCategory, setActiveCategory }) {
    const [searchValue, setSearchValue] = useState('')
    const [categorys, setCategorys] = useState([])

    async function downloadCategories() {
        getCategories(logOutFunction).then((data) => {
            setCategorys(data)
        })
    }

    function startUpFunc() {
        getCategories(logOutFunction).then((data) => {
            setCategorys(data)
            if (data.length <= 0) return;
            else setActiveCategory(data[0])
        })
    }

    useEffect(() => {
        startUpFunc()
    }, [])

    useEffect(() => {
        downloadCategories()
    }, [activeCategory])

    return (
        <div className='flex-grow-1 scroll'>
            <div className='input-group d-flex align-items-center'>
                <input
                    type='text'
                    placeholder='Search'
                    className='form-control border-end-0 h-100'
                    value={searchValue}
                    onChange={e => setSearchValue(categorys.filter(category => category.name.trim().toLowerCase().includes(e.target.value.trim().toLowerCase())))}
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
                categorysData={categorys}
                onActiveCategoryChange={category => setActiveCategory(category)}
                onCategoryRename={async category => {
                    await updateCategory(category.category_id, category.name)
                    downloadCategories()
                }}
                onAddBtnClick={async () => {
                    addCategory("Category").then(() => {
                        startUpFunc()
                    })
                }}
                activeCategory={activeCategory} />
        </div>
    )
}

export default SideBar;