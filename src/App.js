import './App.css';
import Home from './components/home/Home';
import Nav from './components/nav/Nav';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import TaskManager from './components/task/TaskManager';
import NoteEditor from './components/note/NoteEditor';
import EventManager from './components/event/EventManager';
import Login from './components/login/Login';

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
				<Nav/>

				<div className="container">
					<Routes>
						{/*<Route path="/" element={<Home />} />*/}
                        <Route path="/" element={<TaskManager />} />
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
