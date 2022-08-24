import './App.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import Status from './components/home/status/Status';
import Home from './components/home/Home';
import { Link } from 'react-router-dom';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import TaskManager from './components/task/TaskManager';
import NoteEditor from './components/note/NoteEditor';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineTask } from 'react-icons/md';
import { MdOutlineNoteAdd } from 'react-icons/md';

function App() {

	/*
	<h1 className="title">Organizr</h1>
			<div className='ListService'>
				<Link to="/todo" className='ButtonService'>ToDo</Link>
				<Link to="/notebook" className='ButtonService'>Notebook</Link>
			</div>
			<Status />
			<TaskDisplayMin />


			<div className="StatusZone">
					<div className="liste">
					</div>
				</div>
	*/

	let date = new Date();

	return (
		<div className="App">
			<BrowserRouter>
				<div className="header">
					<p className='Date'>{date.toLocaleDateString()}</p>
				</div>

				<div className="container">
					
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="todo" element={<TaskManager />} />
						<Route path="notebook" element={<NoteEditor />} />
					</Routes>
					
				</div>

				<div className="navigation">
					<Link to="/" className='NavLink'>HOME</Link>
					<Link to="/todo" className='NavLink'>TASK</Link>
					<Link to="/notebook" className='NavLink'>NOTE</Link>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
