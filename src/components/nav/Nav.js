import { Link } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
    return (
        <div className='Nav'>
            <a href='/' className='NavTitle'>Organizr</a>
            <div className='NavLinks'>
                {/*<Link to="/" className='NavLink'>HOME</Link>*/}
                <Link to="/todo" className='NavLink'>TASK</Link>
                <Link to="/event" className='NavLink'>EVENT</Link>
                <Link to="/notebook" className='NavLink'>NOTE</Link>
            </div>
        </div>
    );
}