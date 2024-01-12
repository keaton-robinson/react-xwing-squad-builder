const React = require('react');
const { useState, useEffect, useContext, useRef } = React;
const { UserContext } = require('../UserContext.js');


function LoadModal(props) {
    const mounted = useRef(false);
    const userContextBundle = useContext(UserContext);
    const [squads, setSquads] = useState([]);
    const [statusMessage, setStatusMessage] = useState("Fetching squads...");
    const [selectedSquad, setSelectedSquad] = useState(null);

    const fetchAbortController = new AbortController();
    useEffect(() => {
        mounted.current = true;
        const signal = fetchAbortController.signal;

        // eslint-disable-next-line no-undef
        fetch(XWING_API_ENDPOINT + '/squads/' + props.faction, 
        {   
            signal,
            headers: { Authorization: userContextBundle.user.token }
        })
        .then(response => response.json())
        .then(responseData => {
            if(responseData.success){
                setSquads(responseData.squads);
                setStatusMessage(null);
            } else {
                setStatusMessage(responseData.message);
            }
        })
        .catch(() => {
            if(mounted.current){
                setStatusMessage("Failed to load squads");
                setSquads([]);
            }
        });

        return () => {
            mounted.current = false; 
            fetchAbortController.abort(); 
        };
    }, []);

    const loadClicked = () => {
        if(selectedSquad){
            props.loadSquad(selectedSquad);
        }
    }

    const deleteClicked = () => {
        if(selectedSquad){
            let deleteConfirmed = confirm(`Delete ${selectedSquad.name}?`);
            const signal = fetchAbortController.signal;

            if(deleteConfirmed){
                //delete the squad
                // eslint-disable-next-line no-undef
                fetch(XWING_API_ENDPOINT + `/squads/${selectedSquad._id}`, {
                    method: "DELETE", signal, headers: { Authorization: userContextBundle.user.token }
                })
                .then(response => response.json())
                .then(responseData => {
                    if(responseData.success){
                        const squadsCopy = [...squads];
                        const indexOfSquadToRemove = squadsCopy.findIndex(squad => squad._id === selectedSquad._id);
                        squadsCopy.splice(indexOfSquadToRemove, 1);
                        setSquads(squadsCopy);
                    } else {
                        setStatusMessage(responseData.message);
                    }
                })
                .catch(() => {
                    if(mounted.current){
                        setStatusMessage("An error occured...please try deleting again.");
                    }
                }); 
            }
        }
    }
    
    const selectSquad = (clickedSquad) => {
        setSelectedSquad(clickedSquad);
    }

    return (
        <div>
            { statusMessage  
                ? <div style={{display: statusMessage ? "block" : "none"}}>{statusMessage}</div> 
                : <ul style={{maxHeight: "calc(100vh - 170px)", overflowY: "auto", paddingLeft: "0px", paddingRight: "20px", marginTop: "0px"}}>
                { squads.length > 0 ? squads.map(squad => 
                    <li key={squad._id} onClick={() => { selectSquad(squad) }} style={{display:"grid", marginBottom: "30px",
                    color: squad === selectedSquad ? "white" : "inherit", backgroundColor: squad === selectedSquad ? "dimgray" : "inherit",
                    paddingLeft: "5px", paddingRight: "5px"}}>
                        <h3 style={{gridRow: 1, gridColumn: 1, marginTop: "5px", marginBottom: "5px"}}>{squad.name}</h3>
                        <h4 style={{gridRow:1, gridColumn: 2, marginTop: "5px", marginBottom: "5px", textAlign: "right"}}>{squad.points}</h4>
                        <span style={{gridRow: 2}}>
                            { squad.pilots.reduce((previousValue, currentValue) => {
                                return previousValue ? previousValue +", " + currentValue.name : currentValue.name
                            },"")}
                        </span>
                    </li>
                ) : <h3>{`You have no ${props.faction} squads saved.`}</h3>}
                </ul>
            }
            <hr/>
            <div style={{ textAlign: "right"}}>
                <button className={`btn-danger${!selectedSquad ? " fa-disabled" : ""}`} disabled={!selectedSquad} onClick={deleteClicked}><i className="fa-solid fa-trash"></i> Delete</button>
                <button className={`btn-primary${!selectedSquad ? " fa-disabled" : ""}`} disabled={!selectedSquad} onClick={loadClicked}><i className="fa-solid fa-download"></i> Load</button>
            </div>
        </div>
    );
}

module.exports = LoadModal;