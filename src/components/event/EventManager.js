import React from 'react';
import { getEvents, addEvent } from '../../services/EventService';
import './EventManager.css';

class EventManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events : [],
            newEvent: {
                userId: 'Donovan',
                name: '',
                date: ''
            }
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

    newEventNameChanged = (event) => {
        this.setState({
            newEvent: {
                ...this.state.newEvent,
                name: event.target.value
            }
        });
    }

    newEventDateChanged = (event) => {
        this.setState({
            newEvent: {
                ...this.state.newEvent,
                date: event.target.value
            }
        });
    }

    addEvent = () => {

        if (this.state.newEvent.name !== undefined && this.state.newEvent.name !== "") {
        
            addEvent(this.state.newEvent).then(this.fetchData);
            
            this.setState({
                newEvent: {
                    userId: 'Donovan',
                    name: '',
                    date: ''
                }
            });
        }
    }

    render() {

        const newEvent = this.state.newEvent;

        let eventDisplay = (event) => {
            return (
                <div className='Event'>
                    <p className='EventText'>{event.name} - {new Date(event.date).toLocaleDateString()}</p>
                </div>
            )
        }

        const today = [];
        const tomorrow = [];
        const week = [];
        const after = [];
        const past = [];

        this.state.events.forEach(event => {
            if (new Date(event?.date) < new Date()) {
                past.push(eventDisplay(event));
            }
            else {
                after.push(eventDisplay(event));
            }
        })

        return (
            <div className='EventManager'>
                <h1 className='title'>Event Manager</h1>

                <div className='AddEvent'>
                    <input type="text" className='Input' placeholder='Name' value={newEvent.name} id="newEventName" onChange={this.newEventNameChanged}/>
                    <input type="date" className='Input' placeholder='Date' value={newEvent.date} id="newEventDate" onChange={this.newEventDateChanged}/>
                    <button className='Button' onClick={this.addEvent}>Add</button>
                </div>

                <h2 className='subtitle'>Aujourd'hui</h2>
                {today}
                <h2 className='subtitle'>Demain</h2>
                {tomorrow}
                <h2 className='subtitle'>Cette semaine</h2>
                {week}
                <h2 className='subtitle'>Plus tard</h2>
                {after}
                <h2 className='subtitle'>Passé</h2>
                {past}
            </div>
        );
    }
}

export default EventManager;