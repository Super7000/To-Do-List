import React, { useEffect, useRef, useState } from 'react';
import { addCategory, getCategories, updateCategory } from '../scripts/API Calls/categoryApiCalls';

function Categorys({ activeCategory, setActiveCategory, logOutFunction = () => { }, searchValue = '' }) {
    const [categorys, setCategorys] = useState([])
    const [filtedCategorys, setFiltedCategorys] = useState([]) // used to search categories

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

    useEffect(() => {
        if (searchValue.trim() === '') setFiltedCategorys(categorys)
        else setFiltedCategorys(categorys.filter(category => category.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase())))
    }, [searchValue, categorys])

    return (
        <div className='mt-4 flex-grow-1'>
            <h5 className='fw-bold'>Categorys</h5>
            <div className='d-flex flex-column scroll' style={{ gap: '0.3rem' }} >

                {
                    filtedCategorys.length <= 0 ?
                        <div className='m-auto'>No Categories</div> :
                        filtedCategorys.map((category) => {
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

                {/* Add Category Button */}
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

    async function onBlurHandler(e) {
        updateCategory(id, categoryName)
            .then(data => {
                setReadOnly(true);
                setActiveCategory(val => {
                    return { ...val, name: categoryName }
                })
            })
    }
    return (
        <div className={'card cursor-pointer' + (active ? " bg-primary" : " bg-deep-white")} onClick={onClickHandler}>
            <div className='card-body p-2 input-group'>
                <input
                    ref={inputBox}
                    value={categoryName}
                    readOnly={readOnly}
                    className={'text border border-0 bg-transparant flex-grow-1 py-0 ms-1'
                        + (readOnly ? ' cursor-pointer' : "") + (active ? " text-light" : "")}
                    style={{ outline: 'none' }}
                    onBlur={onBlurHandler}
                    onChange={e => {
                        setCategoryName(e.target.value)
                    }}
                    onDoubleClick={e => { 
                        setReadOnly(false); 
                        inputBox.current.focus() 
                    }}
                    onKeyDown={e => {
                        if (e.key === 'Enter' || e.keyCode === 13) {
                            e.currentTarget.blur()
                        }
                    }}
                ></input>
                <button className='btn py-0' onClick={e => {
                    setReadOnly(false);
                    inputBox.current.focus()
                }}>
                    <img src={'edit' + (active ? '-white' : '') + '.svg'} width={18} height={18}></img>
                </button>
            </div>
        </div>
    )
}

export default Categorys;