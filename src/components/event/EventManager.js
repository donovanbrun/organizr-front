import React from 'react';
import { getEvents } from '../../services/EventService';
import './EventManager.css';

class EventManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events : []
        }
    }

    fetchData = ()  => {
        getEvents().then(eventsData => {
            let events = eventsData.data;

            this.setState({
                events: events
            });
        });

        this.forceUpdate();
    }

    componentDidMount() {
        this.fetchData();
    }

    

    render() {

        return (
            <div className=''>
                <h1 className=''>Event Manager</h1>
            </div>
        );
    }
}

export default EventManager;