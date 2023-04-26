import { Toaster } from 'react-hot-toast';
import Postit from '../src/components/postit/Postit';
import Nav from '../src/components/nav/Nav';

export default function MyApp() {
    return (
        <div className="App">
            <div><Toaster /></div>
            <Nav></Nav>
            <Postit></Postit>
        </div>
    );
}