import React, { useEffect, useRef, useState } from 'react';
import ProfileSection from './ProfileSection';
import { addCategory, getCategories, updateCategory } from '../scripts/API Calls/categoryApiCalls';

function SideBar({ closeSideBar, logOutFunction = () => { }, activeCategory, setActiveCategory }) {
    return (
        <div className='left-side-bar p-3 col d-flex flex-column bg-glass bg-light-white' style={{ maxHeight: '100vh' }}>
            <div className='flex-grow-1 scroll'>
                <div className='input-group d-flex align-items-center'>
                    <input type='text' placeholder='Search' className='form-control border-end-0 h-100'></input>
                    <button className='btn btn-transparant border border-start-0 rounded-end bg-white py-1'>
                        <img src='search.svg'></img>
                    </button>
                    <button className='btn bg-transparant h-100 ms-1 me-0 pe-2' onClick={closeSideBar}>
                        <img src="menu.svg"></img>
                    </button>
                </div>
                {/* <ImportantCategories /> */}
                <Categorys activeCategory={activeCategory} setActiveCategory={setActiveCategory} logOutFunction={logOutFunction} />
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

function Categorys({ activeCategory, setActiveCategory, logOutFunction = () => { } }) {
    const [categorys, setCategorys] = useState([])
    async function downloadCategories() {
        getCategories(logOutFunction).then((data) => {
            setCategorys(data)
        })
    }
    useEffect(() => {
        downloadCategories()
    }, [activeCategory])
    useEffect(() => {
        getCategories(logOutFunction).then((data) => {
            if (data.length <= 0) return;
            else setActiveCategory(data[0])
        })
    }, [])

    return (
        <div className='mt-4 flex-grow-1'>
            <h5 className='fw-bold'>Categorys</h5>
            <div className='d-flex flex-column scroll' style={{ gap: '0.3rem' }} >
                {
                    categorys.length <= 0 ? <div className='m-auto'>No Categories</div> :
                        categorys.map((category) => {
                            return <CategoryCard
                                name={category.name}
                                key={category.category_id}
                                id={category.category_id}
                                active={category.category_id === activeCategory.category_id}
                                setActiveCategory={setActiveCategory}
                                onClickHandler={() => {
                                    setActiveCategory(category)
                                }} />
                        })
                }
                <div className='card cursor-pointer' onClick={async () => {
                    addCategory("Category").then(() => {
                        downloadCategories()
                    })
                }}>
                    <div className='card-body p-1'>
                        <div className={'text text-center fs-5'}>{'+'}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CategoryCard({ name = "Category", id, active = false, onClickHandler = () => { }, setActiveCategory = () => { } }) {
    const [readOnly, setReadOnly] = useState(true)
    const [categoryName, setCategoryName] = useState(name)
    const inputBox = useRef()
    return (
        <div className={'card cursor-pointer' + (active ? " bg-primary" : " bg-deep-white")} onClick={onClickHandler}>
            <div className='card-body p-2 input-group'>
                <input
                    ref={inputBox}
                    value={categoryName}
                    readOnly={readOnly}
                    className={'text border border-0 bg-transparant flex-grow-1 py-0 ms-1' + (readOnly ? ' cursor-pointer' : "") + (active ? " text-light" : "")}
                    style={{ outline: 'none' }}
                    onBlur={e => updateCategory(id, categoryName).then(data => { setReadOnly(true); setActiveCategory(val => { return { ...val, name: categoryName } }) })}
                    onChange={e => {
                        setCategoryName(e.target.value)
                    }}
                    onDoubleClick={e => { setReadOnly(false); inputBox.current.focus() }}
                ></input>
                <button className='btn py-0' onClick={e => { setReadOnly(false); inputBox.current.focus() }}>
                    <img src={'edit' + (active ? '-white' : '') + '.svg'} width={18} height={18}></img>
                </button>
            </div>
        </div>
    )
}

export default SideBar;