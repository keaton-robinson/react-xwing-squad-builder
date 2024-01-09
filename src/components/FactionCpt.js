import React from 'react';
import { factionNames } from '../data/xwing_data.js';

export default class FactionCpt extends React.Component {

    constructor(props) {
        super(props);
    }
  
    static getFontClassName = (factionName) => {
        switch (factionName) {
            case factionNames['Rebel Alliance']:
                return "xwing-miniatures-font-rebel";
            case factionNames['Galactic Empire']:
                return "xwing-miniatures-font-empire"
            case factionNames['Scum and Villainy']:
                return "xwing-miniatures-font-scum";
            case factionNames.Resistance:
                return "xwing-miniatures-font-rebel-outline";
            case factionNames['First Order']:
                return "xwing-miniatures-font-firstorder";
            case factionNames['Galactic Republic']:
                return "xwing-miniatures-font-republic";
            case factionNames['Separatist Alliance']:
                return "xwing-miniatures-font-separatists";
            default:
                return "";
        }
    }

    render() {
        return (
            <li title={this.props.faction} style={ this.props.faction === this.props.selectedFaction ? { color: 'white', backgroundColor: "#337ab7"} : {} }
                onClick={() => { this.props.onClick(this.props.faction) }}
            >
               {this.props.faction !== "MultiFaction" ?
        
                    <i className={"xwing-miniatures-font " + FactionCpt.getFontClassName(this.props.faction)}></i>
                :
                    this.props.faction        
                }
           </li>
          );
    }
}