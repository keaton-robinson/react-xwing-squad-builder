import React from 'react';

export interface UserContextBundle {
    user: any;
    login: (userObj: any) => void;
    logout: () => void
}

export const UserContext = React.createContext<UserContextBundle>(null);
UserContext.displayName = "UserContext";