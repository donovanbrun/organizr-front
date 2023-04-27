import Postit from '../src/components/postit/Postit';
import Nav from '../src/components/nav/Nav';

export default function MyApp() {
    return (
        <div className="App">
            <Nav></Nav>
            <Postit></Postit>
        </div>
    );
}