import React from "react";
import ManeuverCpt from "./ManeuverCpt";
import * as xwingData from "../data/xwing_data";

interface ManeuverCptProps {
  maneuvers: xwingData.Difficulty[][];
  maneuversAfterUpgrades: xwingData.Difficulty[][];
}

const ManeuversCpt: React.FC<ManeuverCptProps> = (props) => {
  const determineRowsAndColumnsToRender = () => {
    const rowsToRender = {};
    const columnsToRender = {};
    for (let i = 0; i < props.maneuvers.length; i++) {
      for (let j = 0; j < props.maneuvers[i].length; j++) {
        if (props.maneuvers[i][j] != xwingData.difficulties.impossible) {
          rowsToRender[i] = true;
          columnsToRender[j] = true;
        }
      }
    }
    return { rowsToRender, columnsToRender };
  };

  const getEffectiveManeuver = (row, column) => {
    if (props.maneuversAfterUpgrades) {
      return props.maneuversAfterUpgrades[row][column];
    }
    return props.maneuvers[row][column];
  };

  const getSpeedRows = () => {
    const rowsAndColumnsToRender = determineRowsAndColumnsToRender();
    const rowsToRender = rowsAndColumnsToRender.rowsToRender;
    const columnsToRender = rowsAndColumnsToRender.columnsToRender;
    const speedRows = [];

    for (let i = props.maneuvers.length - 1; i >= 0; i--) {
      if (rowsToRender[i]) {
        speedRows.push(
          <tr key={`speed${i}`}>
            <td>{i}</td>
            {columnsToRender[0] ? (
              <td>
                <ManeuverCpt
                  bearing={xwingData.bearings.left_hard}
                  difficulty={getEffectiveManeuver(i, 0)}
                />
              </td>
            ) : null}
            {columnsToRender[1] ? (
              <td>
                <ManeuverCpt
                  bearing={xwingData.bearings.left_bank}
                  difficulty={getEffectiveManeuver(i, 1)}
                />
              </td>
            ) : null}
            {columnsToRender[2] ? (
              <td>
                <ManeuverCpt
                  bearing={xwingData.bearings.straight}
                  difficulty={getEffectiveManeuver(i, 2)}
                />
              </td>
            ) : null}

            {columnsToRender[3] ? (
              <td>
                <ManeuverCpt
                  bearing={xwingData.bearings.right_bank}
                  difficulty={getEffectiveManeuver(i, 3)}
                />
              </td>
            ) : null}

            {columnsToRender[4] ? (
              <td>
                <ManeuverCpt
                  bearing={xwingData.bearings.right_hard}
                  difficulty={getEffectiveManeuver(i, 4)}
                />
              </td>
            ) : null}

            {columnsToRender[5] ? (
              <td>
                <ManeuverCpt
                  bearing={xwingData.bearings.k_turn}
                  difficulty={getEffectiveManeuver(i, 5)}
                />
              </td>
            ) : null}

            {columnsToRender[6] ? (
              <td>
                <ManeuverCpt
                  bearing={xwingData.bearings.left_sloop}
                  difficulty={getEffectiveManeuver(i, 6)}
                />
              </td>
            ) : null}

            {columnsToRender[7] ? (
              <td>
                <ManeuverCpt
                  bearing={xwingData.bearings.right_sloop}
                  difficulty={getEffectiveManeuver(i, 7)}
                />
              </td>
            ) : null}

            {columnsToRender[8] ? (
              <td>
                <ManeuverCpt
                  bearing={xwingData.bearings.left_tallion}
                  difficulty={getEffectiveManeuver(i, 8)}
                />
              </td>
            ) : null}

            {columnsToRender[9] ? (
              <td>
                <ManeuverCpt
                  bearing={xwingData.bearings.right_tallion}
                  difficulty={getEffectiveManeuver(i, 9)}
                />
              </td>
            ) : null}

            {columnsToRender[10] ? (
              <td>
                <ManeuverCpt
                  bearing={xwingData.bearings.reverse_left}
                  difficulty={getEffectiveManeuver(i, 10)}
                />
              </td>
            ) : null}

            {columnsToRender[11] ? (
              <td>
                <ManeuverCpt
                  bearing={xwingData.bearings.reverse_straight}
                  difficulty={getEffectiveManeuver(i, 11)}
                />
              </td>
            ) : null}

            {columnsToRender[12] ? (
              <td>
                <ManeuverCpt
                  bearing={xwingData.bearings.reverse_right}
                  difficulty={getEffectiveManeuver(i, 12)}
                />
              </td>
            ) : null}
          </tr>,
        );
      }
    }

    return speedRows;
  };

  const speedRows = getSpeedRows();

  return (
    <table className="info-maneuvers">
      <tbody>{speedRows}</tbody>
    </table>
  );
};

export default ManeuversCpt;
