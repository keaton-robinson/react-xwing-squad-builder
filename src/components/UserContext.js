const React = require('react');

const UserContext = React.createContext(null);
UserContext.displayName = "UserContext";

module.exports.UserContext = UserContext;