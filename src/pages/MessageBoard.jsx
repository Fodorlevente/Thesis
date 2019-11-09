import React, { useContext, useState, useEffect } from "react";
import UserProvider from "../contexts/UserProvider";
import _ from "lodash";
import MessageInputField from '../components/inputs/MessageInputField';
import Messages from '../components/displays/Messages';

export default function MessageBoard() {
    const LoginMsg = "Let's start a discussion!"
    const userData = useContext(UserProvider.context);
    const text = _.isEmpty(userData.teams) ? LoginMsg: "Explore Teams"; /// mi a fasz butus vagyok
    const [messages, setMessages] = useState({});

    useEffect(() => {
        fetch('/messageBoard')
        .then(response => response.json())
        .then(data => {
            setMessages(data);
        })
        .catch(error => {
            console.log(error)
        })
      }, []);

      function addMessage(messageName){
        setMessages([...messages, {id: Math.floor(Math.random()*100) ,message: messageName}]);
      }

    return (
        <div className="page">
            <p className="page-title" style={{ textAlign: "center" }}>
                {userData.team} message board
            </p>
            {_.isEmpty(messages) ? 
                <p className="page-title" style={{ textAlign: "center" }}>
                    {text}
                </p> : 
                <Messages 
                    messages={messages}
                    memberOfTeam={userData.team}
                />}
            <MessageInputField addMessage={addMessage} memberOfTeam={userData.team} user={userData.name} />
        </div>
    );
};
