import React from 'react';
import InfoPanelShipCpt from './InfoPanelShipCpt';
import InfoPanelUpgradeCpt from './InfoPanelUpgradeCpt';

export default class InfoPanelCpt extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="infoPanel">
                {
                    {
                        "Ship": <InfoPanelShipCpt dataKey={this.props.cardToShow.key} faction={this.props.faction}/>,
                        "Upgrade": <InfoPanelUpgradeCpt dataKey={this.props.cardToShow.key} faction={this.props.faction}/>,
                        "Pilot": <h3>Go make a pilot infopanel component</h3>
                    }[this.props.cardToShow.type]
                }
            </div>
        );
    }
}

