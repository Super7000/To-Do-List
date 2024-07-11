import React, { useEffect, useState } from 'react';
import ProfileSection from './ProfileSection';
import { addCategory, getCategories } from '../scripts/API Calls/categoryApiCalls';

function SideBar({ closeSideBar, logOutFunction = () => { }, activeCategory, setActiveCategory }) {
    return (
        <div className='left-side-bar p-3 col d-flex flex-column' style={{ backgroundColor: 'rgba(0,0,0,0.04)', maxHeight: '100vh' }}>
            <div className='flex-grow-1 scroll'>
                <div className='input-group d-flex align-items-center'>
                    <input type='text' placeholder='Search' className='form-control border-end-0 h-100'></input>
                    <button className='btn btn-transparant border border-start-0 rounded-end bg-white'>
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
    useEffect(() => {
        getCategories(logOutFunction).then((data) => {
            setCategorys(data)
        })
    }, [activeCategory])
    const [categoryName, setCategoryName] = useState('')
    return (
        <div className='mt-4 flex-grow-1'>
            <h5 className='fw-bold'>Categorys</h5>
            <div className='d-flex flex-column scroll' style={{ gap: '0.3rem' }} >
                {
                    categorys.length <= 0 ? <div className='m-auto'>No Categories</div> :
                        categorys.map((category) => {
                            return <CategoryCard name={category.name} key={category.category_id} active={category.category_id === activeCategory.category_id} onClickHandler={() => {
                                setActiveCategory(category)
                            }} />
                        })
                }
                <div className='card cursor-pointer' data-bs-toggle="modal" data-bs-target={"#categorypopup"}>
                    <div className='card-body p-1'>
                        <div className={'text text-center fs-5'}>{'+'}</div>
                    </div>
                </div>

                <div className="modal" id={"categorypopup"}>
                    <div className="modal-dialog w-100">
                        <div className="modal-content">

                            <div className="modal-header border-0">
                                <h4 className="modal-title">Add a Category</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <div className="modal-body">
                                <form className='form card-body d-flex flex-column px-5'>
                                    <div>
                                        <label className='form-label'>
                                            Category Name:
                                            <input type="text" name="date" value={categoryName} placeholder='Enter a Category Name' onChange={e => setCategoryName(e.target.value)} className='form-control mt-2' />
                                        </label>
                                    </div>
                                </form>
                            </div>

                            <div className="modal-footer border-0">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {
                                    addCategory(categoryName).then(() => {
                                        getCategories(logOutFunction).then((data) => {
                                            setCategorys(data)
                                        })
                                    })
                                }}>Save</button>
                                <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CategoryCard({ name = "Category", id, active = false, onClickHandler = () => { } }) {
    return (
        <div className={'card cursor-pointer' + (active ? " bg-primary" : "")} onClick={onClickHandler}>
            <div className='card-body p-2'>
                <div className={'text' + (active ? " text-light" : "")}>{name}</div>
            </div>
        </div>
    )
}

export default SideBar;