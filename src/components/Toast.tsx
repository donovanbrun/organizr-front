import {toast} from 'react-hot-toast';

export default class Toast {
    static success(message) {
        toast.success(message, {
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
    }

    static error(message) {
        toast.error(message, {
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
    }
}