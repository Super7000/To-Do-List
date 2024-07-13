import React, { useEffect, useRef, useState } from 'react';
import { login, register } from '../scripts/API Calls/authApiCalls';
import { verifyFieldsForLogIn, verifyFieldsForSignUp } from '../scripts/InputsVerifiers';

function LogInPage({ setIsLogIn }) {
    const [isSignInState, setIsSignInState] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginBtn = useRef()

    function inputHandler(e) {
        switch (e.currentTarget.name) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            default:
                break;
        }
    }

    // Check if user is already logged in
    useEffect(() => {
        if (localStorage.getItem('logedIn') === 'true' && localStorage.getItem('token').length > 0) {
            setIsLogIn(true)
        }
    }, [])


    // form submit handler
    async function loginUser(e) {
        e.preventDefault()
        verifyFieldsForLogIn(email, password) ?
            login(email.trim(), password, () => setIsLogIn(true)) : ""
    }

    return (
        <>
            <div className='log-in-page form-container'>
                <h1>
                    <p>Welcome to,</p>
                    <p className='fw-bolder text-primary'>To Dos</p>
                </h1>
                <div className='card p-4 bg-glass bg-light-white'>
                    {/* log in form */}
                    <form className='form card-body d-flex flex-column' style={{ gap: (!isSignInState ? '1rem' : '0.5rem') }}>
                        {!isSignInState && <>
                            <div>
                                <label className='form-label'>
                                    Email:
                                    <input
                                        type="text"
                                        name="email"
                                        value={email}
                                        placeholder='Enter Email'
                                        onChange={inputHandler}
                                        className='form-control bg-deep-white'
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label className='form-label'>
                                    Password:
                                    <div className='input-group'>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password" value={password}
                                            placeholder='Enter Password'
                                            onChange={inputHandler}
                                            className='form-control border-end-0 rounded-start bg-deep-white'
                                            onKeyDown={e => {
                                                if (e.key === 'Enter' || e.keyCode === 13) {
                                                    e.preventDefault()
                                                    loginBtn.current.click()
                                                }
                                            }}
                                            required
                                        />
                                        <button className='btn border border-start-0 bg-deep-white' onClick={e => {
                                            e.preventDefault()
                                            setShowPassword(val => !val)
                                        }}>
                                            <img src={showPassword ? 'eye-closed.svg' : 'eye.svg'}></img>
                                        </button>
                                    </div>
                                </label>
                            </div>
                            <button className='btn btn-primary' type="submit" ref={loginBtn} onClick={loginUser}>Log In</button>
                            <div>
                                Don't have an account?
                                <span className='text-primary cursor-pointer' onClick={() => setIsSignInState(true)}>
                                    Create a new account
                                </span>
                            </div>
                        </>}

                        {/* sign up form */}
                        {isSignInState && <SignUpForm setIsSignInState={setIsSignInState} />}
                    </form>
                </div>
            </div>
        </>
    );
}

function SignUpForm({ setIsSignInState }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    function inputHandler(e) {
        switch (e.currentTarget.name) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'confirmPassword':
                setConfirmPassword(e.target.value);
                break;
            case 'firstName':
                setFirstName(e.target.value);
                break;
            case 'lastName':
                setLastName(e.target.value);
                break;
            default:
                break;
        }
    }

    // form submit handler
    async function registerUser(e) {
        e.preventDefault()
        if (verifyFieldsForSignUp(email, password, confirmPassword, firstName, lastName)) {
            const response = await register(firstName.trim() + ' ' + lastName.trim(), email.trim(), password);
            if (response) {
                // Redirect to log in page
                setIsSignInState(false)
            }
        }
    }
    return (
        <>
            <div>
                <label className='form-label'>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={email}
                        placeholder='Enter Email'
                        onChange={inputHandler}
                        className='form-control'
                        required
                    />
                </label>
            </div>
            <div>
                <label className='form-label'>
                    Password:
                    <div className='input-group'>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            placeholder='Enter Password'
                            onChange={inputHandler}
                            className='form-control border-end-0 rounded-start'
                            required
                        />
                        <button className='btn bg-deep-white border border-start-0' onClick={e => {
                            e.preventDefault()
                            setShowPassword(val => !val)
                        }}>
                            <img src={showPassword ? 'eye-closed.svg' : 'eye.svg'}></img>
                        </button>
                    </div>
                </label>
            </div>
            <div>
                <label className='form-label'>
                    Confirm Password:
                    <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder='Re-enter the Password'
                        onChange={inputHandler}
                        className='form-control'
                        required
                    />
                </label>
            </div>
            <div>
                <label className='form-label '>
                    Name:
                    <div className='input-group'>
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={inputHandler}
                            placeholder='First Name'
                            className='form-control'
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={inputHandler}
                            placeholder='Last Name'
                            className='form-control'
                            required
                        />
                    </div>
                </label>
            </div>
            <button type="submit" className='btn btn-primary' onClick={registerUser} >Sign Up</button>
            <div>Already have an account? <div className='text-primary cursor-pointer' onClick={() => {
                setIsSignInState(false)
            }}>Log in</div></div>
        </>
    )
}

export default LogInPage;