const React = require('react');
const ManeuverCpt = require('./ManeuverCpt.js');
const xwingData = require('../data/xwing_data.js');

class ManeuversCpt extends React.Component {

    constructor(props) {
        super(props);
    }

    determineRowsAndColumnsToRender = () => {
        const rowsToRender = {};
        const columnsToRender = {};
        for(let i = 0; i < this.props.maneuvers.length; i++){
            for(let j = 0; j < this.props.maneuvers[i].length; j++){
                if(this.props.maneuvers[i][j] != xwingData.difficulties.impossible){
                    rowsToRender[i] = true;
                    columnsToRender[j] = true;
                }
            }
        }
        return { rowsToRender, columnsToRender };
    }

    getEffectiveManeuver = (row, column) => {
        if(this.props.maneuversAfterUpgrades){
            return this.props.maneuversAfterUpgrades[row][column]; 
        }
        return this.props.maneuvers[row][column];
    }


    getSpeedRows = () => {

        const rowsAndColumnsToRender = this.determineRowsAndColumnsToRender();
        const rowsToRender = rowsAndColumnsToRender.rowsToRender;
        const columnsToRender = rowsAndColumnsToRender.columnsToRender;
        const speedRows = [];

        for(let i = this.props.maneuvers.length-1; i >= 0; i--){
            if(rowsToRender[i]){
                speedRows.push(
                    <tr key={`speed${i}`}>
                        <td>
                            {i}
                        </td>
                        { columnsToRender[0] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.left_hard} difficulty={this.getEffectiveManeuver(i, 0)} />
                        </td> : null
                        }
                        { columnsToRender[1] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.left_bank} difficulty={this.getEffectiveManeuver(i,1)} />
                        </td> : null }
                        { columnsToRender[2] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.straight} difficulty={this.getEffectiveManeuver(i,2)} />
                        </td> : null }
                        
                        { columnsToRender[3] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.right_bank} difficulty={this.getEffectiveManeuver(i,3)} />
                        </td> : null }
                        
                        { columnsToRender[4] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.right_hard} difficulty={this.getEffectiveManeuver(i,4)} />
                        </td> : null }

                        { columnsToRender[5] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.k_turn} difficulty={this.getEffectiveManeuver(i,5)} />
                        </td> : null }
                        
                        { columnsToRender[6] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.left_sloop} difficulty={this.getEffectiveManeuver(i,6)} />
                        </td> : null }
                        
                        { columnsToRender[7] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.right_sloop} difficulty={this.getEffectiveManeuver(i,7)} />
                        </td> : null }

                        { columnsToRender[8] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.left_tallion} difficulty={this.getEffectiveManeuver(i,8)} />
                        </td> : null }
                        
                        { columnsToRender[9] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.right_tallion} difficulty={this.getEffectiveManeuver(i,9)} />
                        </td> : null }
                        
                        { columnsToRender[10] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.reverse_left} difficulty={this.getEffectiveManeuver(i,10)} />
                        </td> : null }
                        
                        { columnsToRender[11] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.reverse_straight} difficulty={this.getEffectiveManeuver(i,11)} />
                        </td> : null }

                        { columnsToRender[12] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.reverse_right} difficulty={this.getEffectiveManeuver(i,12)} />
                        </td> : null }
                    </tr>
                );
            }
        }

        return speedRows;
    }

    render(){
        const speedRows = this.getSpeedRows();

        return (
        <table className="info-maneuvers">
            <tbody>
                {speedRows}
            </tbody>
        </table>);
    }
}

module.exports = ManeuversCpt;