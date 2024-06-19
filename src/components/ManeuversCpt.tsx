import React from "react";
import ManeuverCpt from "./ManeuverCpt";
import { difficulties, bearings } from "../data/xwing_data";
import { Difficulty } from "../data/xwing_types";

interface ManeuversCptProps {
  maneuvers: Difficulty[][];
  maneuversAfterUpgrades?: Difficulty[][];
}

const ManeuversCpt: React.FC<ManeuversCptProps> = (props) => {
  const determineRowsAndColumnsToRender = () => {
    const rowsToRender = {};
    const columnsToRender = {};
    for (let i = 0; i < props.maneuvers.length; i++) {
      for (let j = 0; j < props.maneuvers[i].length; j++) {
        if (props.maneuvers[i][j] !== difficulties.impossible) {
          rowsToRender[i] = true;
          columnsToRender[j] = true;
        }
      }
    }
    return { rowsToRender, columnsToRender };
  };

  const getEffectiveDifficulty = (row, column) => {
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
              <td className={bearings.left_hard}>
                <ManeuverCpt bearing={bearings.left_hard} difficulty={getEffectiveDifficulty(i, 0)} />
              </td>
            ) : null}
            {columnsToRender[1] ? (
              <td className={bearings.left_bank}>
                <ManeuverCpt bearing={bearings.left_bank} difficulty={getEffectiveDifficulty(i, 1)} />
              </td>
            ) : null}
            {columnsToRender[2] ? (
              <td className={i !== 0 ? bearings.straight : bearings.stationary}>
                <ManeuverCpt
                  bearing={i !== 0 ? bearings.straight : bearings.stationary}
                  difficulty={getEffectiveDifficulty(i, 2)}
                />
              </td>
            ) : null}

            {columnsToRender[3] ? (
              <td className={bearings.right_bank}>
                <ManeuverCpt bearing={bearings.right_bank} difficulty={getEffectiveDifficulty(i, 3)} />
              </td>
            ) : null}

            {columnsToRender[4] ? (
              <td className={bearings.right_hard}>
                <ManeuverCpt bearing={bearings.right_hard} difficulty={getEffectiveDifficulty(i, 4)} />
              </td>
            ) : null}

            {columnsToRender[5] ? (
              <td className={bearings.k_turn}>
                <ManeuverCpt bearing={bearings.k_turn} difficulty={getEffectiveDifficulty(i, 5)} />
              </td>
            ) : null}

            {columnsToRender[6] ? (
              <td className={bearings.left_sloop}>
                <ManeuverCpt bearing={bearings.left_sloop} difficulty={getEffectiveDifficulty(i, 6)} />
              </td>
            ) : null}

            {columnsToRender[7] ? (
              <td className={bearings.right_sloop}>
                <ManeuverCpt bearing={bearings.right_sloop} difficulty={getEffectiveDifficulty(i, 7)} />
              </td>
            ) : null}

            {columnsToRender[8] ? (
              <td className={bearings.left_tallion}>
                <ManeuverCpt bearing={bearings.left_tallion} difficulty={getEffectiveDifficulty(i, 8)} />
              </td>
            ) : null}

            {columnsToRender[9] ? (
              <td className={bearings.right_tallion}>
                <ManeuverCpt bearing={bearings.right_tallion} difficulty={getEffectiveDifficulty(i, 9)} />
              </td>
            ) : null}

            {columnsToRender[10] ? (
              <td className={bearings.reverse_left}>
                <ManeuverCpt bearing={bearings.reverse_left} difficulty={getEffectiveDifficulty(i, 10)} />
              </td>
            ) : null}

            {columnsToRender[11] ? (
              <td className={bearings.reverse_straight}>
                <ManeuverCpt bearing={bearings.reverse_straight} difficulty={getEffectiveDifficulty(i, 11)} />
              </td>
            ) : null}

            {columnsToRender[12] ? (
              <td className={bearings.reverse_right}>
                <ManeuverCpt bearing={bearings.reverse_right} difficulty={getEffectiveDifficulty(i, 12)} />
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
