import './App.css'
import LogInPage from './components/LogInPage'
import ToDosPage from './components/HomePage'
import { useState } from 'react'

function App() {
	const [isLogIn, setIsLogIn] = useState(false)
	return (
		<div className='container-fluid d-grid align-items-center w-100 p-0' style={{ height: '100vh' }}>
			{isLogIn ? <ToDosPage setIsLogIn={setIsLogIn} /> : <LogInPage setIsLogIn={setIsLogIn} />}
		</div>
	)
}

export default App
