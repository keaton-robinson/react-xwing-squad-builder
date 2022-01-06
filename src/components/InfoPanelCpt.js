import React from 'react';
import * as xwingData from '../data/xwing_data';

export default class InfoPanelCpt extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="infoPanel">
                <h3 className="shipPilotName">Blue Squadron Escort</h3>
                <table className="info-stats">
                <tbody>
                    <tr><td>Pilot</td></tr>
                    <tr><td>Base</td><td>Small</td></tr>
                    <tr><td>Initiative</td><td className="info-initiative">2</td></tr>
                    <tr className="stat-icon">
                        <td><i className="xwing-miniatures-font xwing-miniatures-font-frontarc header-stat header-attack"></i></td>
                        <td className="info-attack">3</td>
                    </tr>
                    <tr className="stat-icon">
                        <td><i className="xwing-miniatures-font xwing-miniatures-font-agility header-stat header-agility"></i></td>
                        <td className="info-agility">2</td>
                    </tr>
                    <tr className="stat-icon">
                        <td><i className="xwing-miniatures-font xwing-miniatures-font-hull header-stat header-hull"></i></td>
                        <td className="info-hull">4</td>
                    </tr>
                    <tr className="stat-icon">
                        <td><i className="xwing-miniatures-font xwing-miniatures-font-shield header-stat header-shield"></i></td>
                        <td className="info-shield">2</td>
                    </tr>
                    <tr>
                        <td>Actions</td>
                        <td className="shipPilotUpgrades">
                            <i className="xwing-miniatures-font xwing-miniatures-font-focus"></i>,
                            <i className="xwing-miniatures-font xwing-miniatures-font-lock"></i>,
                            <i className="xwing-miniatures-font xwing-miniatures-font-barrelroll"></i>
                        </td>
                    </tr>
                    <tr><td>Upgrades</td>
                        <td className="shipPilotUpgrades">
                            <i className="xwing-miniatures-font xwing-miniatures-font-astromech"></i>
                            (<i className="xwing-miniatures-font xwing-miniatures-font-forcepower"></i>)
                            (<i className="xwing-miniatures-font xwing-miniatures-font-illicit"></i>)
                            <i className="xwing-miniatures-font xwing-miniatures-font-modification"></i>
                            (<i className="xwing-miniatures-font xwing-miniatures-font-talent"></i>)
                            <i className="xwing-miniatures-font xwing-miniatures-font-torpedo"></i>
                        </td>
                    </tr>
                </tbody>
                </table>
                <table className="info-maneuvers">
                    <tbody><tr><td>4</td><td></td><td></td><td><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                        <path className="svg-maneuver-outer svg-white-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M100,180 L100,100 100,80"></path>
                        <path className="svg-maneuver-triangle svg-white-maneuver svg-base-maneuver" d="M70,80 H130 L100,30 Z" fill="white" strokeWidth="5" stroke="black"></path>
                        <path className="svg-maneuver-inner svg-white-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke="white" d="M100,180 L100,100 100,80"></path>
                    </g></svg></td><td></td><td></td><td><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                        <path className="svg-maneuver-outer svg-red-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M50,180 L50,100 C50,10 140,10 140,100 L140,120"></path>
                        <path className="svg-maneuver-triangle svg-red-maneuver svg-base-maneuver" d="M170,120 H110 L140,180 Z" fill="red" strokeWidth="5" stroke="black"></path>
                        <path className="svg-maneuver-inner svg-red-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke="red" d="M50,180 L50,100 C50,10 140,10 140,100 L140,120"></path>
                    </g></svg></td><td></td><td></td></tr><tr><td>3</td><td><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                        <path className="svg-maneuver-outer svg-white-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M160,180 L160,70 80,70"></path>
                        <path className="svg-maneuver-triangle svg-white-maneuver svg-base-maneuver" d="M80,100 V40 L30,70 Z" fill="white" strokeWidth="5" stroke="black"></path>
                        <path className="svg-maneuver-inner svg-white-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke="white" d="M160,180 L160,70 80,70"></path>
                    </g></svg></td><td><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                        <path className="svg-maneuver-outer svg-white-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M150,180 S150,120 80,60"></path>
                        <path className="svg-maneuver-triangle svg-white-maneuver svg-base-maneuver" d="M80,100 V40 L30,70 Z" fill="white" strokeWidth="5" stroke="black" transform="translate(-5 -15) rotate(45 70 90)"></path>
                        <path className="svg-maneuver-inner svg-white-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke="white" d="M150,180 S150,120 80,60"></path>
                    </g></svg></td><td><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                        <path className="svg-maneuver-outer svg-white-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M100,180 L100,100 100,80"></path>
                        <path className="svg-maneuver-triangle svg-white-maneuver svg-base-maneuver" d="M70,80 H130 L100,30 Z" fill="white" strokeWidth="5" stroke="black"></path>
                        <path className="svg-maneuver-inner svg-white-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke="white" d="M100,180 L100,100 100,80"></path>
                    </g></svg></td><td><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                        <path className="svg-maneuver-outer svg-white-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M50,180 S50,120 120,60"></path>
                        <path className="svg-maneuver-triangle svg-white-maneuver svg-base-maneuver" d="M120,100 V40 L170,70 Z" fill="white" strokeWidth="5" stroke="black" transform="translate(5 -15) rotate(-45 130 90)"></path>
                        <path className="svg-maneuver-inner svg-white-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke="white" d="M50,180 S50,120 120,60"></path>
                    </g></svg></td><td><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                        <path className="svg-maneuver-outer svg-white-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M40,180 L40,70 120,70"></path>
                        <path className="svg-maneuver-triangle svg-white-maneuver svg-base-maneuver" d="M120,100 V40 L170,70 Z" fill="white" strokeWidth="5" stroke="black"></path>
                        <path className="svg-maneuver-inner svg-white-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke="white" d="M40,180 L40,70 120,70"></path>
                    </g></svg></td><td></td><td><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                        <path className="svg-maneuver-outer svg-red-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M160,180 L160,70 80,70"></path>
                        <path className="svg-maneuver-triangle svg-red-maneuver svg-base-maneuver" d="M60,100 H100 L80,140 Z" fill="red" strokeWidth="5" stroke="black"></path>
                        <path className="svg-maneuver-inner svg-red-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke="red" d="M160,180 L160,70 80,70"></path>
                    </g></svg></td><td><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                        <path className="svg-maneuver-outer svg-red-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M40,180 L40,70 120,70"></path>
                        <path className="svg-maneuver-triangle svg-red-maneuver svg-base-maneuver" d="M100,100 H140 L120,140 Z" fill="red" strokeWidth="5" stroke="black"></path>
                        <path className="svg-maneuver-inner svg-red-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke="red" d="M40,180 L40,70 120,70"></path>
                    </g></svg></td></tr><tr><td>2</td><td><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                        <path className="svg-maneuver-outer svg-white-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M160,180 L160,70 80,70"></path>
                        <path className="svg-maneuver-triangle svg-white-maneuver svg-base-maneuver" d="M80,100 V40 L30,70 Z" fill="white" strokeWidth="5" stroke="black"></path>
                        <path className="svg-maneuver-inner svg-white-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke="white" d="M160,180 L160,70 80,70"></path>
                    </g></svg></td><td><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                        <path className="svg-maneuver-outer svg-blue-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M150,180 S150,120 80,60"></path>
                        <path className="svg-maneuver-triangle svg-blue-maneuver svg-base-maneuver" d="M80,100 V40 L30,70 Z" fill="dodgerblue" strokeWidth="5" stroke="black" transform="translate(-5 -15) rotate(45 70 90)"></path>
                        <path className="svg-maneuver-inner svg-blue-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke="dodgerblue" d="M150,180 S150,120 80,60"></path>
                    </g></svg></td><td><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                        <path className="svg-maneuver-outer svg-blue-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M100,180 L100,100 100,80"></path>
                        <path className="svg-maneuver-triangle svg-blue-maneuver svg-base-maneuver" d="M70,80 H130 L100,30 Z" fill="dodgerblue" strokeWidth="5" stroke="black"></path>
                        <path className="svg-maneuver-inner svg-blue-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke="dodgerblue" d="M100,180 L100,100 100,80"></path>
                    </g></svg></td><td><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                        <path className="svg-maneuver-outer svg-blue-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M50,180 S50,120 120,60"></path>
                        <path className="svg-maneuver-triangle svg-blue-maneuver svg-base-maneuver" d="M120,100 V40 L170,70 Z" fill="dodgerblue" strokeWidth="5" stroke="black" transform="translate(5 -15) rotate(-45 130 90)"></path>
                        <path className="svg-maneuver-inner svg-blue-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke="dodgerblue" d="M50,180 S50,120 120,60"></path>
                    </g></svg></td><td><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                        <path className="svg-maneuver-outer svg-white-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M40,180 L40,70 120,70"></path>
                        <path className="svg-maneuver-triangle svg-white-maneuver svg-base-maneuver" d="M120,100 V40 L170,70 Z" fill="white" strokeWidth="5" stroke="black"></path>
                        <path className="svg-maneuver-inner svg-white-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke="white" d="M40,180 L40,70 120,70"></path>
                    </g></svg></td><td></td><td></td><td></td></tr><tr><td>1</td><td></td><td><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                        <path className="svg-maneuver-outer svg-blue-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M150,180 S150,120 80,60"></path>
                        <path className="svg-maneuver-triangle svg-blue-maneuver svg-base-maneuver" d="M80,100 V40 L30,70 Z" fill="dodgerblue" strokeWidth="5" stroke="black" transform="translate(-5 -15) rotate(45 70 90)"></path>
                        <path className="svg-maneuver-inner svg-blue-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke="dodgerblue" d="M150,180 S150,120 80,60"></path>
                    </g></svg></td><td><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                        <path className="svg-maneuver-outer svg-blue-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M100,180 L100,100 100,80"></path>
                        <path className="svg-maneuver-triangle svg-blue-maneuver svg-base-maneuver" d="M70,80 H130 L100,30 Z" fill="dodgerblue" strokeWidth="5" stroke="black"></path>
                        <path className="svg-maneuver-inner svg-blue-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke="dodgerblue" d="M100,180 L100,100 100,80"></path>
                    </g></svg></td><td><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                        <path className="svg-maneuver-outer svg-blue-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M50,180 S50,120 120,60"></path>
                        <path className="svg-maneuver-triangle svg-blue-maneuver svg-base-maneuver" d="M120,100 V40 L170,70 Z" fill="dodgerblue" strokeWidth="5" stroke="black" transform="translate(5 -15) rotate(-45 130 90)"></path>
                        <path className="svg-maneuver-inner svg-blue-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke="dodgerblue" d="M50,180 S50,120 120,60"></path>
                    </g></svg></td><td></td><td></td><td></td><td></td></tr></tbody>
                </table>
            </div>
        );
    }
}

