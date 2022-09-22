import './App.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import Home from './components/home/Home';
import { Link } from 'react-router-dom';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import TaskManager from './components/task/TaskManager';
import NoteEditor from './components/note/NoteEditor';
import EventManager from './components/event/EventManager';
import Login from './components/login/Login'

function App() {

	let date = new Date();

	/*
	<div className="header">
		<p className='Date'>{date.toLocaleDateString()}</p>
	</div>
	*/

	return (
		<div className="App">

			<BrowserRouter>
				<div className="navigation">
					{/*<Link to="/" className='NavLink'>HOME</Link>*/}
					<Link to="/todo" className='NavLink'>TASK</Link>
					<Link to="/event" className='NavLink'>EVENT</Link>
					<Link to="/notebook" className='NavLink'>NOTE</Link>
				</div>

				<div className="container">
					<Routes>
						{/* <Route path="/" element={<Home />} /> */}
						<Route path="login" element={<Login />} />
						<Route path="todo" element={<TaskManager />} />
						<Route path="event" element={<EventManager />} />
						<Route path="notebook" element={<NoteEditor />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
