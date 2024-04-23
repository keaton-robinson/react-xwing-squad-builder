import React, { createContext, useContext, useEffect, useState } from 'react';

export interface UserContextBundle {
    user: any;
    login: (userObj: any) => void;
    logout: () => void
}

export const UserContext = React.createContext<UserContextBundle>(null);
UserContext.displayName = "UserContext";


export const useUserContext = () => {
    const userContext = useContext(UserContext);
    return userContext;
}

export const UserProvider: React.FC<{children}> = (props) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const foundUser = localStorage.getItem("user");
        if (foundUser) {
          const userObj = JSON.parse(foundUser);
          // make sure that login token hasn't expired
          if (userObj.expiresIn && Date.now() > userObj.loginTime + ms(userObj.expiresIn)) {
            localStorage.removeItem("user");
          } else {
            setUser(userObj);
          }
        }
    }, []);

    const userContextBundle: UserContextBundle = {
        user,
        login: (userObj: any) => {
          userObj.loginTime = Date.now();
          setUser(userObj);
          localStorage.setItem("user", JSON.stringify(userObj));
        },
        logout: () => {
          setUser(null);
          localStorage.removeItem("user");
        }
      };
    
    return <UserContext.Provider value={userContextBundle}>
        {props.children}
    </UserContext.Provider>

}