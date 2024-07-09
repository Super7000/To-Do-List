import React, { useState } from 'react';

function LogInPage() {
    const [isSignInState, setIsSignInState] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    function inputHandler(e) {
        switch (e.currentTarget.name) {
            case 'email':
                setEmail(e.target.value)
                break
            case 'password':
                setPassword(e.target.value)
                break
            case 'confirmPassword':
                setConfirmPassword(e.target.value)
                break
            case 'firstName':
                setFirstName(e.target.value)
                break
            case 'lastName':
                setLastName(e.target.value)
                break
            default:
                break
        }
    }

    const [showPassword, setShowPassword] = useState(false)

    return (
        <>
            <div className='log-in-page form-container'>
                <h1>
                    <p>Welcome to,</p>
                    <p className='fw-bolder text-primary'>To Dos</p>
                </h1>
                <div className='card p-4'>
                    {/* log in form */}
                    <form className='form card-body d-flex flex-column' style={{ gap: (!isSignInState ? '1rem' : '0.5rem') }}>
                        {!isSignInState && <>
                            <div>
                                <label className='form-label'>
                                    Email:
                                    <input type="text" name="email" value={email} placeholder='Enter Email' onChange={inputHandler} className='form-control' />
                                </label>
                            </div>
                            <div>
                                <label className='form-label'>
                                    Password:
                                    <div className='btn-group w-100'>
                                    <input type={showPassword ? "text" : "password"} name="password" value={password} placeholder='Enter Password' onChange={inputHandler} className='form-control border-end-0 rounded-start' />
                                    <button className='btn btn-transparant border border-start-0' onClick={e => {
                                        e.preventDefault()
                                        setShowPassword(val => !val)
                                    }}>
                                        <img src={showPassword ? 'eye-closed.svg' : 'eye.svg'}></img>
                                    </button>
                                    </div>
                                </label>
                            </div>
                            <button className='btn btn-primary' type="submit">Log In</button>
                            <div>Don't have an account? <span className='text-primary' onClick={() => setIsSignInState(true)}>Create a new account</span></div>
                        </>}

                        {/* sign up form */}
                        {isSignInState && <>
                            <div>
                                <label className='form-label'>
                                    Email:
                                    <input type="text" name="email" value={email} onChange={inputHandler} className='form-control' />
                                </label>
                            </div>
                            <div>
                                <label className='form-label'>
                                    Password:
                                    <input type="password" name="password" value={[password]} onChange={inputHandler} className='form-control' />
                                </label>
                            </div>
                            <div>
                                <label className='form-label'>
                                    Confirm Password:
                                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={inputHandler} className='form-control' />
                                </label>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <label className='form-label'>
                                        First Name:
                                        <input type="text" name="firstName" value={firstName} onChange={inputHandler} className='form-control' />
                                    </label>
                                </div>
                                <div className='col'>
                                    <label className='form-label'>
                                        Last Name:
                                        <input type="text" name="lastName" value={lastName} onChange={inputHandler} className='form-control' />
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className='btn btn-primary' >Sign Up</button>
                            <div>Already have an account? <div className='text-primary' onClick={() => setIsSignInState(false)}>Log in</div></div>
                        </>}
                    </form>
                </div>
            </div>
        </>
    );
}

export default LogInPage;