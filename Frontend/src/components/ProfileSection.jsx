import React, { useEffect, useRef, useState } from 'react';
import { getUser, updateUserDetails } from '../scripts/API Calls/userApiCalls';
import { verifyFieldsForSignUp } from '../scripts/InputsVerifiers';

const ProfileSection = ({ logOutFunction = () => { } }) => {
    const [firstName, setFirstName] = useState('User')
    const [lastName, setLastName] = useState('Name')
    const [email, setEmail] = useState('example@email.com')
    const [password, setPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    const saveBtn = useRef()

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

    async function onSubmitHandler(e) {
        e.preventDefault()
        verifyFieldsForSignUp(email, password, password, firstName, lastName) ?
            updateUserDetails(firstName.trim() + ' ' + lastName.trim(), email.trim(), password, logOutFunction)
                .then(data => {
                    logOutFunction()
                }) : ""
    }

    return (
        <div>
            <div className='card w-100'
                style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
                data-bs-toggle="modal"
                data-bs-target={"#profileDetails"}>
                <div className='card-body d-flex justify-content-start align-items-center p-2 scroll'>
                    <div className='rounded-circle bg-success p-3 text-light d-flex align-items-center justify-content-center' style={{ width: '50px', height: '50px' }}>
                        {firstName.charAt(0).toUpperCase()}
                    </div>
                    <div className='ms-2' style={{ lineHeight: '1.2' }}>
                        <div className='fw-bold fs-6'>{firstName} {lastName}</div>
                        <div className='text-muted' style={{ fontSize: '0.7rem' }}>{email}</div>
                    </div>
                </div>
            </div>


            {/* PopUp to update profile details or user details */}
            <div className="modal" id="profileDetails">
                <div className="modal-dialog w-100">
                    <div className="modal-content bg-glass bg-mid-white">
                        <div className="modal-header border-0 px-4">
                            <h4 className="modal-title">Profile Details</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <form className='form card-body d-flex flex-column px-5' style={{ gap: '0.8rem' }}>
                                <label className='form-label'>
                                    Name:
                                    <div className='input-group'>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={firstName}
                                            placeholder='First Name'
                                            onChange={inputChangeHandler}
                                            className='form-control bg-deep-white' />
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={lastName}
                                            placeholder='Last Name'
                                            onChange={inputChangeHandler}
                                            className='form-control bg-deep-white' />
                                    </div>
                                </label>
                                <label className='form-label'>
                                    Email:
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        placeholder='Enter Email'
                                        onChange={inputChangeHandler}
                                        className='form-control bg-deep-white' />
                                </label>
                                <label className='form-label'>
                                    Password:
                                    <div className='input-group'>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={password}
                                            placeholder='Enter Password'
                                            onChange={inputChangeHandler}
                                            className='form-control border-end-0 rounded-start bg-deep-white'
                                            onKeyDown={e => {
                                                if (e.key === 'Enter' || e.keyCode === 13) {
                                                    e.preventDefault()
                                                    saveBtn.current.click()
                                                }
                                            }}
                                        />
                                        <button
                                            className='btn btn-transparant border border-start-0 bg-deep-white'
                                            onClick={e => setShowPassword(val => !val)}>
                                            <img src={showPassword ? 'eye-closed.svg' : 'eye.svg'}></img>
                                        </button>
                                    </div>
                                </label>
                            </form>
                        </div>

                        <div className="modal-footer border-0">
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                ref={saveBtn}
                                onClick={onSubmitHandler}
                            >Save</button>
                            <button type="button" className="btn btn-outline-primary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;