import './Home.css';
import TaskDisplayMin from '../task/TaskDisplayMin';
import Status from './status/Status';

function Home() {

	return (
		<div className="Home">
			<Status />
			<TaskDisplayMin />
		</div>
	);
}

export default Home;
