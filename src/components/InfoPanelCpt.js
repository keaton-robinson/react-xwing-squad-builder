const React = require('react');
const InfoPanelShipCpt = require('./InfoPanelShipCpt.js');
const InfoPanelUpgradeCpt = require('./InfoPanelUpgradeCpt.js');
const InfoPanelPilotCpt = require('./InfoPanelPilotCpt.js');
const xwingUtils = require('../data/xwing_utils.js');

class InfoPanelCpt extends React.Component {
    
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

module.exports = InfoPanelCpt;