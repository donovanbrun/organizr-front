import '../styles/global.css';
import axios from "axios";
import { getUserId } from '../services/LoginService';

axios.interceptors.request.use(
    config => {
        config.headers['userId'] = getUserId()
        return config
    },
    error => {
        Promise.reject(error)
    }
);

function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default App