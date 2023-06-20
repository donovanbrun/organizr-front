import React, { useState, useEffect } from 'react';
import { getEvents, addEvent } from '../../services/EventService';
import './EventManager.css';

export default function EventManager() {

    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState(
    {
        userId: 'Donovan',
        name: '',
        date: ''
    });

    useEffect(() => {
        fetchData()
    }, [])

    let fetchData = ()  => {
        getEvents().then(eventsData => {
            let events = eventsData.data;

            setEvents(events);
        });
    }

    let newEventNameChanged = (event) => {
        setNewEvent({
                ...newEvent,
                name: event.target.value
        });
    }

    let newEventDateChanged = (event) => {
        setNewEvent({
            ...newEvent,
            date: event.target.value
        });
    }

    let handleAddEvent = () => {

        if (newEvent.name !== undefined && newEvent.name !== "") {
        
            addEvent(newEvent).then(fetchData);
            
            this.setState({
                newEvent: {
                    userId: 'Donovan',
                    name: '',
                    date: ''
                }
            });
        }
    }

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

    events.forEach(event => {
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
                <input type="text" className='Input' placeholder='Name' value={newEvent.name} id="newEventName" onChange={newEventNameChanged}/>
                <input type="date" className='Input' placeholder='Date' value={newEvent.date} id="newEventDate" onChange={newEventDateChanged}/>
                <button className='Button' onClick={handleAddEvent}>Add</button>
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