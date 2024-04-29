import React from "react";

interface ActionsCptProps {
  actions: string[];
}

const ActionsCpt: React.FC<ActionsCptProps> = (props) => {
  const getActionSeparator = (action) => {
    if (action.includes("->")) {
      return (
        <i className="xwing-miniatures-font xwing-miniatures-font-linked"></i>
      );
    }
    return ", ";
  };

  const getActionDifficulty = (action) => {
    if (action.includes("R-")) {
      return "red";
    } else if (action.includes("F-")) {
      return "force";
    }
    return "";
  };

  const getActionStyle = (action) => {
    let stylePrefix = "xwing-miniatures-font-";

    if (action.includes("Barrel Roll")) return stylePrefix + "barrelroll";
    if (action.includes("Boost")) return stylePrefix + "boost";
    if (action.includes("Calculate")) return stylePrefix + "calculate";
    if (action.includes("Cloak")) return stylePrefix + "cloak";
    if (action.includes("Coordinate")) return stylePrefix + "coordinate";
    if (action.includes("Evade")) return stylePrefix + "evade";
    if (action.includes("Focus")) return stylePrefix + "focus";
    if (action.includes("Lock")) return stylePrefix + "lock";
    if (action.includes("Jam")) return stylePrefix + "jam";
    if (action.includes("Reload")) return stylePrefix + "reload";
    if (action.includes("Reinforce")) return stylePrefix + "reinforce";
    if (action.includes("Rotate Arc")) return stylePrefix + "rotatearc";
    if (action.includes("Slam")) return stylePrefix + "slam";
  };

  const getActionMarkup = (action, ordinal: number) => {
    return (
      <span key={action + ordinal}>
        {/* //first action shouldn't have a comma or > before it */}
        {ordinal !== 0 ? getActionSeparator(action) : null}
        <i
          className={
            "xwing-miniatures-font " +
            getActionStyle(action) +
            " " +
            getActionDifficulty(action)
          }
        ></i>
      </span>
    );
  };

  let spans = [];
  for (let i = 0; i < props.actions.length; i++) {
    spans.push(getActionMarkup(props.actions[i], i));
  }

  return <span>{spans}</span>;
};

export default ActionsCpt;
