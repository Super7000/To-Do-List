import React, { useState } from 'react';
import { formatDate, getCurrentTime } from '../scripts/utils';

function DateTimePopUp({ heading, saveBtnClickHandler = (a, b) => { }, id, onChangeClickHanlder = (e) => { }, defaultDueDate, defaultDueTime }) {
    const [dueDate, setDueDate] = useState(defaultDueDate ? defaultDueDate : formatDate(new Date()))
    const [dueTime, setDueTime] = useState(defaultDueTime ? defaultDueTime : getCurrentTime());

    function onChangeClickHanlderInner(e) {
        switch (e.target.name) {
            case 'date':
                setDueDate(e.target.value)
                break;
            case 'time':
                setDueTime(e.target.value)
                break;
            default:
                break;
        }
        onChangeClickHanlder(e)
    }
    return (
        <div className="modal" id={id}>
            <div className="modal-dialog w-100">
                <div className="modal-content bg-glass bg-mid-white">

                    <div className="modal-header border-0">
                        <h4 className="modal-title">{heading}</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body">
                        <form className='form card-body d-flex flex-column px-5' style={{ gap: '0.5rem' }}>
                            <div>
                                <label className='form-label'>
                                    Due Date:
                                    <input
                                        type="date"
                                        name="date"
                                        value={dueDate}
                                        placeholder='Select a Date'
                                        onChange={onChangeClickHanlderInner}
                                        className='form-control mt-2 bg-deep-white' />
                                </label>
                            </div>
                            <div>
                                <label className='form-label'>
                                    Due Time:
                                    <input
                                        type="time"
                                        name="time"
                                        value={dueTime}
                                        placeholder='Select a time'
                                        onChange={onChangeClickHanlderInner}
                                        className='form-control mt-2 bg-deep-white' />
                                </label>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer border-0">
                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => {
                            e.preventDefault()
                            saveBtnClickHandler(dueDate, dueTime)
                        }}>Save</button>
                        <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal">Close</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DateTimePopUp;