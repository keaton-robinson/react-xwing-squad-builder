import React from 'react';

export default class NewSquadConfirmModal extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    Are you sure you want to create a new squad? Your current ships will be removed.
                </div>
                <hr/>
                <div style={{ textAlign: "right"}}>
                    <button className="btn-primary" onClick={this.props.cancel}>Cancel</button>
                    <button className="btn-danger" onClick={this.props.createNewSquad}>Make New Squad</button>
                </div>
            </div>
        );
    }
}