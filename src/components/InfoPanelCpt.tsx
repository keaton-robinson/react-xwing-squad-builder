import React from 'react';
import InfoPanelShipCpt from './InfoPanelShipCpt';
import InfoPanelUpgradeCpt from './InfoPanelUpgradeCpt';
import InfoPanelPilotCpt from './InfoPanelPilotCpt';
import * as xwingUtils from '../data/xwing_utils';

export default class InfoPanelCpt extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        let childPanel;

        switch(this.props.cardToShow.type){
            case xwingUtils.InfoPanelCardTypes.Ship:
                childPanel = <InfoPanelShipCpt ship={this.props.cardToShow.cardData} faction={this.props.faction}/>
                break;    
            case xwingUtils.InfoPanelCardTypes.Upgrade: 
                childPanel = <InfoPanelUpgradeCpt upgrade={this.props.cardToShow.cardData}/>
                break;
            case xwingUtils.InfoPanelCardTypes.Pilot:
                childPanel = <InfoPanelPilotCpt pilot={this.props.cardToShow.cardData} isSelectedPilot={false}/>
                break;
            case xwingUtils.InfoPanelCardTypes.SelectedPilot:
                childPanel = <InfoPanelPilotCpt selectedPilot={this.props.cardToShow.cardData} isSelectedPilot={true}/>
                break;
        }

        return (
            <div className="infoPanelMaster">
                <div className="infoPanel">
                {childPanel}                    
                </div>
            </div>
        );
    }
}

