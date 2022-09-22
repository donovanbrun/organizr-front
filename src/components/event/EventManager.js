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

        const prochainement = this.state.events.filter(event => {return new Date(event.date) >= new Date()}).map(event => {
            return (
                <div className='Event'>
                    <p className='EventText'>{event.name} - {new Date(event.date).toLocaleDateString()}</p>
                </div>
            )
        });

        const passe = this.state.events.filter(event => {return new Date(event.date) < new Date()}).map(event => {
            return (
                <div className='Event'>
                    <p className='EventText'>{event.name} - {new Date(event.date).toLocaleDateString()}</p>
                </div>
            )
        });

        return (
            <div className='EventManager'>
                <h1 className='title'>Event Manager</h1>

                <h2 className='subtitle'>Prochainement</h2>
                {prochainement}

                <h2 className='subtitle'>Passé</h2>
                {passe}
            </div>
        );
    }
}

export default EventManager;