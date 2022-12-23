import './App.css';
import Nav from './components/nav/Nav';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import TaskManager from './components/task/TaskManager';
import NoteEditor from './components/note/NoteEditor';
import Object from './components/object/Object';
import Login from './components/login/Login';
import {Toaster} from 'react-hot-toast';
import Postit from './components/postit/Postit';

function App() {

	return (
		<div className="App">
            <div><Toaster/></div>

			<BrowserRouter>
				<Nav/>

				<div className="container">
					<Routes>
                        <Route path="/" element={<Postit />} />
						<Route path="login" element={<Login />} />
						<Route path="todo" element={<TaskManager />} />
						<Route path="object" element={<Object />} />
						<Route path="notebook" element={<NoteEditor />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
