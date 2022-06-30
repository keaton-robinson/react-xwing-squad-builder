import React from 'react';
import { UserContext } from '../App.js';

export default class SaveAsModal extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = { squadName: this.props.squadName};
    }

    squadNameChanged = (event) => {
        this.setState({squadName: event.target.value});
    }

    saveAsClicked = (event) => {
        this.props.saveSquad(this.state.squadName);
    }

    render() {
        return (
            <div>
                <div>
                    Save your squad?
                </div>
                <span>Squad Name: <input type="text" value={this.state.squadName} onChange={this.squadNameChanged} maxLength={30}/></span>
                <hr/>
                <div style={{ textAlign: "right"}}>
                    <button className="btn-primary" onClick={this.saveAsClicked}><i className="fa-solid fa-save"></i> Save</button>
                </div>
            </div>
        );
    }
}