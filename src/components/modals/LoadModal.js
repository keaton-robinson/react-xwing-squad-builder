import React from 'react';
import { UserContext } from '../App.js';

export default class LoadModal extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = { squads: [], statusMessage: "Fetching squads...", selectedSquad: null};

        this.controller = new AbortController();
        const signal = this.controller.signal;

        fetch('http://localhost:3000/squads/' + this.props.faction, { signal })
        .then(response => response.json())
        .then(data => {
            this.setState({ squads: data, statusMessage: null});
        })
        .catch(error => {
            if(error.name != 'AbortError'){
                this.setState({ statusMessage: "Failed to load squads", squads: []});
            }
        })

    }

    componentWillUnmount() {
        this.controller.abort(); //cancel fetches to avoid react getting mad at me for leaving asynch requests open after unmount
    }

    loadClicked = (event) => {
        if(this.state.selectedSquad){
            this.props.loadSquad(this.state.selectedSquad);
        }
    }

    deleteClicked = (event) => {
        if(this.state.selectedSquad){
            const selectedSquad = this.state.selectedSquad;
            let deleteConfirmed = confirm(`Delete ${selectedSquad.name}?`);
            const signal = this.controller.signal;

            if(deleteConfirmed){
                //delete the squad
                fetch(`http://localhost:3000/squads/${selectedSquad._id}`, {
                    method: "DELETE", signal
                })
                .then(response => response.json())
                .then(data => {
                    const squadsCopy = [...this.state.squads];
                    const indexOfSquadToRemove = squadsCopy.findIndex(squad => squad._id === this.state.selectedSquad._id);
                    squadsCopy.splice(indexOfSquadToRemove, 1);

                    this.setState({ squads: squadsCopy });
                })
                .catch(error => {
                    if(error.name != 'AbortError'){
                        alert("An error occured...please try deleting again.");
                    }
                }); 
            }
        }
    }
    
    selectSquad = (clickedSquad) => {
        this.setState({ selectedSquad: clickedSquad});
    }


    render() {
        return (
            <div>
                { this.state.statusMessage  
                    ? <div style={{display: this.state.statusMessage ? "block" : "none"}}>{this.state.statusMessage}</div> 
                    : <ul style={{maxHeight: "calc(100vh - 170px)", overflowY: "auto", paddingLeft: "0px", paddingRight: "20px", marginTop: "0px"}}>
                    { this.state.squads.length > 0 ? this.state.squads.map(squad => 
                        <li key={squad._id} onClick={() => { this.selectSquad(squad) }} style={{display:"grid", marginBottom: "30px",
                         color: squad === this.state.selectedSquad ? "white" : "inherit", backgroundColor: squad === this.state.selectedSquad ? "dimgray" : "inherit",
                         paddingLeft: "5px", paddingRight: "5px"}}>
                            <h3 style={{gridRow: 1, gridColumn: 1, marginTop: "5px", marginBottom: "5px"}}>{squad.name}</h3>
                            <h4 style={{gridRow:1, gridColumn: 2, marginTop: "5px", marginBottom: "5px", textAlign: "right"}}>{squad.points}</h4>
                            <span style={{gridRow: 2}}>
                                { squad.pilots.reduce((previousValue, currentValue) => {
                                    return previousValue ? previousValue +", " + currentValue.name : currentValue.name
                                },"")}
                            </span>
                        </li>
                    ) : <h3>{`You have no ${this.props.faction} squads saved.`}</h3>}
                    </ul>
                }
                <hr/>
                <div style={{ textAlign: "right"}}>
                    <button className={`btn-danger${!this.state.selectedSquad ? " fa-disabled" : ""}`} disabled={!this.state.selectedSquad} onClick={this.deleteClicked}><i className="fa-solid fa-trash"></i> Delete</button>
                    <button className={`btn-primary${!this.state.selectedSquad ? " fa-disabled" : ""}`} disabled={!this.state.selectedSquad} onClick={this.loadClicked}><i className="fa-solid fa-download"></i> Load</button>
                </div>
            </div>
        );
    }
}