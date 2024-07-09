import './App.css'
import LogInPage from './components/LogInPage'
import ToDosPage from './components/HomePage'

function App() {
	return (
		<div className='container-fluid d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
			{/* <LogInPage /> */}
			<ToDosPage />
		</div>
	)
}

export default App
