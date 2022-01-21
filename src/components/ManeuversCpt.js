import React from 'react';
import ManeuverCpt from './ManeuverCpt';
import * as xwingData from '../data/xwing_data';

export default class ManeuversCpt extends React.Component {

    constructor(props) {
        super(props);

        this.buildSpeedRows = this.getSpeedRows.bind(this);
        this.determineRowsAndColumnsToRender = this.determineRowsAndColumnsToRender.bind(this);
    }

    determineRowsAndColumnsToRender() {
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



    getSpeedRows() {

        const rowsAndColumnsToRender = this.determineRowsAndColumnsToRender();
        const rowsToRender = rowsAndColumnsToRender.rowsToRender;
        const columnsToRender = rowsAndColumnsToRender.columnsToRender;
        const speedRows = [];
        const maneuvers = this.props.maneuvers;

        for(let i = maneuvers.length-1; i >= 0; i--){
            if(rowsToRender[i]){
                speedRows.push(
                    <tr key={`speed${i}`}>
                        <td>
                            {i}
                        </td>
                        { columnsToRender[0] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.left_hard} difficulty={maneuvers[i][0]} />
                        </td> : null
                        }
                        { columnsToRender[1] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.left_bank} difficulty={maneuvers[i][1]} />
                        </td> : null }
                        { columnsToRender[2] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.straight} difficulty={maneuvers[i][2]} />
                        </td> : null }
                        
                        { columnsToRender[3] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.right_bank} difficulty={maneuvers[i][3]} />
                        </td> : null }
                        
                        { columnsToRender[4] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.right_hard} difficulty={maneuvers[i][4]} />
                        </td> : null }

                        { columnsToRender[5] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.k_turn} difficulty={maneuvers[i][5]} />
                        </td> : null }
                        
                        { columnsToRender[6] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.left_sloop} difficulty={maneuvers[i][6]} />
                        </td> : null }
                        
                        { columnsToRender[7] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.right_sloop} difficulty={maneuvers[i][7]} />
                        </td> : null }

                        { columnsToRender[8] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.left_tallion} difficulty={maneuvers[i][8]} />
                        </td> : null }
                        
                        { columnsToRender[9] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.right_tallion} difficulty={maneuvers[i][9]} />
                        </td> : null }
                        
                        { columnsToRender[10] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.reverse_left} difficulty={maneuvers[i][10]} />
                        </td> : null }
                        
                        { columnsToRender[11] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.reverse_straight} difficulty={maneuvers[i][11]} />
                        </td> : null }

                        { columnsToRender[12] ? <td>
                            <ManeuverCpt bearing={xwingData.bearings.reverse_right} difficulty={maneuvers[i][12]} />
                        </td> : null }
                    </tr>
                );
            }
        }

        return speedRows;
    }

    render(){

        const difficulties = xwingData.difficulties;
        const bearings = xwingData.bearings;

        const speedRows = this.getSpeedRows();

        return (
        <table className="info-maneuvers">
            <tbody>
                {speedRows}
            </tbody>
        </table>);
    }
}