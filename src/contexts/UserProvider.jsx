// mini store, lifecicle stb...
import React, {createContext, useState, useEffect } from "react";
const context = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect( () => {
        fetchUserDataFromDB()
    }, [])

    function bazdmeg(){
        console.log("bazdmegTe");
    }

    function fetchUserDataFromDB(){
        console.log("MEG LETTEM HÍVVA!!!")
        fetch("/user")
            .then( res => res.json())
            .then(res => setUser(res))
            .catch( err => {
                console.log(err);
            });
    }
    return (
        <context.Provider value={user} bazdmeg={bazdmeg}>
            {children}
        </context.Provider>
    );

};

UserProvider.context = context;

export default UserProvider;