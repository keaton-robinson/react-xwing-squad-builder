const React =  require('react');
const xwingData = require('../data/xwing_data.js');

class ManeuverCpt extends React.Component {
    
    constructor(props) {
        super(props);
    }

    getDifficultyUIColor = () => {
        switch(this.props.difficulty){
            case xwingData.difficulties.blue:
                return "dodgerblue";
            case xwingData.difficulties.white:
                return "white";
            case xwingData.difficulties.red:
                return "red";
            case xwingData.difficulties.purple:
                return "purple";
        }
    }


    render() {
        const bearings = xwingData.bearings;
        
        if(!this.props.difficulty){  //ship cannot perform this bearing at the current speed
            return null;
        }

        switch(this.props.bearing){
            case bearings.left_hard:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                            <path strokeWidth="25" fill="none" stroke="black" d="M160,180 L160,70 80,70"></path>
                            <path d="M80,100 V40 L30,70 Z" fill={this.getDifficultyUIColor()} strokeWidth="5" stroke="black"></path>
                            <path strokeWidth="15" fill="none" stroke={this.getDifficultyUIColor()} d="M160,180 L160,70 80,70"></path>
                    </g></svg>
                );
            case bearings.left_bank:
                return(
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                            <path strokeWidth="25" fill="none" stroke="black" d="M150,180 S150,120 80,60"></path>
                            <path d="M80,100 V40 L30,70 Z" fill={this.getDifficultyUIColor()} strokeWidth="5" stroke="black" transform="translate(-5 -15) rotate(45 70 90)"></path>
                            <path strokeWidth="15" fill="none" stroke={this.getDifficultyUIColor()} d="M150,180 S150,120 80,60"></path>
                    </g></svg>
                );
            case bearings.straight:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                        <path className="svg-maneuver-outer svg-white-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M100,180 L100,100 100,80"></path>
                        <path className="svg-maneuver-triangle svg-white-maneuver svg-base-maneuver" d="M70,80 H130 L100,30 Z" fill={this.getDifficultyUIColor()} strokeWidth="5" stroke="black"></path>
                        <path className="svg-maneuver-inner svg-white-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke={this.getDifficultyUIColor()} d="M100,180 L100,100 100,80"></path>
                    </g></svg>
                );
            case bearings.right_bank:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                        <path className="svg-maneuver-outer svg-white-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M50,180 S50,120 120,60"></path>
                        <path className="svg-maneuver-triangle svg-white-maneuver svg-base-maneuver" d="M120,100 V40 L170,70 Z" fill={this.getDifficultyUIColor()} strokeWidth="5" stroke="black" transform="translate(5 -15) rotate(-45 130 90)"></path>
                        <path className="svg-maneuver-inner svg-white-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke={this.getDifficultyUIColor()} d="M50,180 S50,120 120,60"></path>
                    </g></svg>
                );
            case bearings.right_hard:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                            <path className="svg-maneuver-outer svg-white-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M40,180 L40,70 120,70"></path>
                            <path className="svg-maneuver-triangle svg-white-maneuver svg-base-maneuver" d="M120,100 V40 L170,70 Z" fill={this.getDifficultyUIColor()} strokeWidth="5" stroke="black"></path>
                            <path className="svg-maneuver-inner svg-white-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke={this.getDifficultyUIColor()} d="M40,180 L40,70 120,70"></path>
                    </g></svg>
                );
            case bearings.k_turn:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                            <path className="svg-maneuver-outer svg-red-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M50,180 L50,100 C50,10 140,10 140,100 L140,120"></path>
                            <path className="svg-maneuver-triangle svg-red-maneuver svg-base-maneuver" d="M170,120 H110 L140,180 Z" fill={this.getDifficultyUIColor()} strokeWidth="5" stroke="black"></path>
                            <path className="svg-maneuver-inner svg-red-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke={this.getDifficultyUIColor()} d="M50,180 L50,100 C50,10 140,10 140,100 L140,120"></path>
                    </g></svg>
                );
            case bearings.left_sloop:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                    <path className="svg-maneuver-outer svg-red-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M150,180 S150,120 80,60"></path>
                    <path className="svg-maneuver-triangle svg-red-maneuver svg-base-maneuver" d="M80,100 V40 L30,70 Z" fill={this.getDifficultyUIColor()} strokeWidth="5" stroke="black" transform="translate(0 50)"></path>
                    <path className="svg-maneuver-inner svg-red-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke={this.getDifficultyUIColor()} d="M150,175 S150,120 85,65"></path>
                    </g></svg>
                );
            case bearings.right_sloop:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                    <path className="svg-maneuver-outer svg-red-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M50,180 S50,120 120,60"></path>
                    <path className="svg-maneuver-triangle svg-red-maneuver svg-base-maneuver" d="M120,100 V40 L170,70 Z" fill={this.getDifficultyUIColor()} strokeWidth="5" stroke="black" transform="translate(0 50)"></path>
                    <path className="svg-maneuver-inner svg-red-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke={this.getDifficultyUIColor()} d="M50,175 S50,120 115,65"></path>
                    </g></svg>
                );
            case bearings.left_tallion:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                            <path className="svg-maneuver-outer svg-red-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M160,180 L160,70 80,70"></path>
                            <path className="svg-maneuver-triangle svg-red-maneuver svg-base-maneuver" d="M60,100 H100 L80,140 Z" fill={this.getDifficultyUIColor()} strokeWidth="5" stroke="black"></path>
                            <path className="svg-maneuver-inner svg-red-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke={this.getDifficultyUIColor()} d="M160,180 L160,70 80,70"></path>
                    </g></svg>
                );
            case bearings.right_tallion:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver ">
                        <path className="svg-maneuver-outer svg-red-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M40,180 L40,70 120,70"></path>
                        <path className="svg-maneuver-triangle svg-red-maneuver svg-base-maneuver" d="M100,100 H140 L120,140 Z" fill={this.getDifficultyUIColor()} strokeWidth="5" stroke="black"></path>
                        <path className="svg-maneuver-inner svg-red-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke={this.getDifficultyUIColor()} d="M40,180 L40,70 120,70"></path>
                    </g></svg>
                );
            case bearings.stationary:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200">
                        <rect className="svg-maneuver-stop svg-red-maneuver svg-base-maneuver" x="50" y="50" width="100" height="100" style={{fill:"red", strokeWidth:5, stroke:"black"}}></rect>
                    </svg>
                );
            case bearings.reverse_left:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver backwards">
                    <path className="svg-maneuver-outer svg-red-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M50,180 S50,120 120,60"></path>
                    <path className="svg-maneuver-triangle svg-red-maneuver svg-base-maneuver" d="M120,100 V40 L170,70 Z" fill={this.getDifficultyUIColor()} strokeWidth="5" stroke="black" transform="translate(5 -15) rotate(-45 130 90)"></path>
                    <path className="svg-maneuver-inner svg-red-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke={this.getDifficultyUIColor()} d="M50,175 S50,120 120,60"></path>
                    </g></svg>
                );
            case bearings.reverse_straight:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver backwards">
                    <path className="svg-maneuver-outer svg-red-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M100,180 L100,100 100,80"></path>
                    <path className="svg-maneuver-triangle svg-red-maneuver svg-base-maneuver" d="M70,80 H130 L100,30 Z" fill={this.getDifficultyUIColor()} strokeWidth="5" stroke="black"></path>
                    <path className="svg-maneuver-inner svg-red-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke={this.getDifficultyUIColor()} d="M100,175 L100,100 100,70"></path>
                    </g></svg>
                );
            case bearings.reverse_right:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 200 200"><g className="maneuver backwards">
                    <path className="svg-maneuver-outer svg-red-maneuver svg-base-maneuver" strokeWidth="25" fill="none" stroke="black" d="M150,180 S150,120 80,60"></path>
                    <path className="svg-maneuver-triangle svg-red-maneuver svg-base-maneuver" d="M80,100 V40 L30,70 Z" fill={this.getDifficultyUIColor()} strokeWidth="5" stroke="black" transform="translate(-5 -15) rotate(45 70 90)"></path>
                    <path className="svg-maneuver-inner svg-red-maneuver svg-base-maneuver" strokeWidth="15" fill="none" stroke={this.getDifficultyUIColor()} d="M150,175 S150,120 80,60"></path>
                    </g></svg>
                );
        }
        
    }
}

module.exports = ManeuverCpt;