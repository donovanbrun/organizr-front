import Postit from '../components/postit/Postit';
import Nav from '../components/nav/Nav';

export default function MyApp() {
    return (
        <div className="App">
            <Nav></Nav>
            <Postit></Postit>
        </div>
    );
}