import React, { useEffect, useRef, useState } from 'react';
import { addCategory, getCategories, updateCategory } from '../scripts/API Calls/categoryApiCalls';

function Categorys({ categorysData, onActiveCategoryChange = () => { }, onCategoryRename = () => { }, onAddBtnClick = () => { }, activeCategory }) {
    return (
        <div className='mt-4 flex-grow-1'>
            <h5 className='fw-bold'>Categorys</h5>
            <div className='d-flex flex-column scroll' style={{ gap: '0.3rem' }} >

                {
                    categorysData.length <= 0 ?
                        <div className='m-auto'>No Categories</div> :
                        categorysData.map(category =>
                            <CategoryCard
                                name={category.name}
                                key={category.category_id}
                                id={category.category_id}
                                active={category.category_id === activeCategory.category_id}
                                onRename={async newName => {
                                    onCategoryRename({ ...category, name: newName })
                                }}
                                onClick={() => {
                                    onActiveCategoryChange(category)
                                }} />
                        )
                }

                {/* Add Category Button */}
                <div className='card cursor-pointer' onClick={onAddBtnClick}>
                    <div className='card-body p-1'>
                        <div className={'text text-center fs-5'}>{'+'}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CategoryCard({ name = "Category", active = false, onClick = () => { }, onRename = () => { } }) {
    const [readOnly, setReadOnly] = useState(true)
    const [categoryName, setCategoryName] = useState(name)

    const inputBox = useRef()

    async function onBlurHandler() {
        setReadOnly(true);
        onRename(categoryName)
    }
    return (
        <div className={'card cursor-pointer' + (active ? " bg-primary" : " bg-deep-white")} onClick={onClick}>
            <div className='card-body p-2 input-group'>
                <input
                    ref={inputBox}
                    value={categoryName}
                    readOnly={readOnly}
                    className={'text border bg-transparant flex-grow-1 py-0 ms-1'
                        + (readOnly === true ? ' cursor-pointer border-0' : "border-2") + (active ? " text-light" : "")}
                    style={{ outline: 'none' }}
                    onBlur={onBlurHandler}
                    onChange={e => {
                        setCategoryName(e.target.value)
                    }}
                    onDoubleClick={() => {
                        setReadOnly(false);
                        inputBox.current.focus()
                    }}
                    onKeyDown={e => {
                        if (e.key === 'Enter' || e.keyCode === 13) {
                            e.currentTarget.blur()
                        }
                    }}
                ></input>
                <button className='btn py-0' onClick={() => {
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