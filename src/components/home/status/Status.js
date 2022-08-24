import React from "react";
import "./Status.css";
import { getStatus as getTaskStatus } from "../../../services/TaskService";
import { getStatus as getNoteStatus } from "../../../services/NoteService";

class Status extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            services: [
                {
                    name: "Todo",
                    uri: getTaskStatus,
                    status: "unavailable"
                },
                {
                    name: "Notebook",
                    uri: getNoteStatus,
                    status: "unavailable"
                }
            ]
        };
    }

    componentDidMount() {
        let services = this.state.services
        services.forEach((service) => {
            service.uri().then(response => {
                if (response.status === 200) {
                    service.status = "available";
                }
                else {
                    service.status = "unavailable";
                }
                this.forceUpdate();
            })
            .catch(error => {});
        });
        this.setState({services: services});
    }

    render() {

        let services = this.state.services.map((service,i) => {
            return (
                <div key={i}>
                    {
                        service.status === "available" 
                        ? <h3 style={{color: "rgb(0,255,0)"}} className="StatusName">{service.name}</h3>
                        : <h3 style={{color: "rgb(255,0,0)"}} className="StatusName">{service.name}</h3>
                    }
                </div>
            );
        });

        return (
            <div className="Status">
                <h2 className="StatusTitle">Status</h2>
                <div className="ListStatus">
                    {services}
                </div>
            </div>
        );
    }
}

export default Status;