import React, { useEffect, useState } from 'react';
import { getUser, updateUserDetails } from '../scripts/API Calls/userApiCalls';

const ProfileSection = ({ logOutFunction = () => { } }) => {
    const [firstName, setFirstName] = useState('User')
    const [lastName, setLastName] = useState('Name')
    const [email, setEmail] = useState('example@email.com')
    const [password, setPassword] = useState('')

    function inputChangeHandler(e) {
        switch (e.currentTarget.name) {
            case 'firstName':
                setFirstName(e.target.value)
                break
            case 'lastName':
                setLastName(e.target.value)
                break
            case 'email':
                setEmail(e.target.value)
                break
            case 'password':
                setPassword(e.target.value)
                break
            default:
                break
        }
    }
    const [showPassword, setShowPassword] = useState(false)
    useEffect(() => {
        const downloadUserData = async () => {
            const userData = await getUser(logOutFunction)
            if (userData === undefined) return
            if (userData === null) return
            if (userData.length <= 5) return
            setEmail(userData.Email)
            setFirstName(userData.Username.split(' ')[0])
            setLastName(userData.Username.split(' ')[1])
        }
        downloadUserData()
    }, [])
    return (
        <div>
            <div className='card w-100' style={{ backgroundColor: 'rgba(0,0,0,0.1)' }} data-bs-toggle="modal" data-bs-target={"#profileDetails"}>
                <div className='card-body d-flex justify-content-start align-items-center p-2 scroll'>
                    <div className='rounded-circle bg-success p-3 text-light d-flex align-items-center justify-content-center' style={{ width: '50px', height: '50px' }}>S</div>
                    <div className='ms-2' style={{ lineHeight: '1.2' }}>
                        <div className='fw-bold fs-6'>{firstName} {lastName}</div>
                        <div className='text-muted' style={{ fontSize: '0.7rem' }}>{email}</div>
                    </div>
                </div>
            </div>
            <div className="modal" id="profileDetails">
                <div className="modal-dialog w-100">
                    <div className="modal-content">

                        <div className="modal-header border-0">
                            <h4 className="modal-title">Task</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <form className='form card-body d-flex flex-column px-5' style={{ gap: '0.8rem' }}>
                                <label className='form-label'>
                                    Name:
                                    <div className='input-group'>
                                        <input type="text" name="firstName" value={firstName} placeholder='First Name' onChange={inputChangeHandler} className='form-control' />
                                        <input type="text" name="lastName" value={lastName} placeholder='Last Name' onChange={inputChangeHandler} className='form-control' />
                                    </div>
                                </label>
                                <label className='form-label'>
                                    Email:
                                    <input type="email" name="email" value={email} placeholder='Enter Email' onChange={inputChangeHandler} className='form-control' />
                                </label>
                                <label className='form-label'>
                                    Password:
                                    <div className='input-group'>
                                        <input type={showPassword ? "text" : "password"} name="password" value={password} placeholder='Enter Password' onChange={inputChangeHandler} className='form-control border-end-0 rounded-start' />
                                        <button className='btn btn-transparant border border-start-0' onClick={e => {
                                            e.preventDefault()
                                            setShowPassword(val => !val)
                                        }}>
                                            <img src={showPassword ? 'eye-closed.svg' : 'eye.svg'}></img>
                                        </button>
                                    </div>
                                </label>
                            </form>
                        </div>

                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={async () => {
                                updateUserDetails(firstName + ' ' + lastName, email, password, logOutFunction).then(data => logOutFunction())
                            }}>Save</button>
                            <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;