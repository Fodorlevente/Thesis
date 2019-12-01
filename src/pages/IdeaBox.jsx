import React, { useContext, useState, useEffect } from "react";
import UserProvider from "../contexts/UserProvider";
import _ from "lodash";
import IdeaInputField from '../components/inputs/IdeaInputField';
import IdeaTable from '../components/displays/IdeaTable';

export default function IdeaBox() {
    const LoginMsg = "You have an idea? Create a ticket from it!"
    const userData = useContext(UserProvider.context);
    const text = _.isEmpty(userData.teams) ? LoginMsg: "Explore Teams";
    const [ideas, setIdeas] = useState({});

    useEffect(() => {
        fetchIdeasFromDB()
      }, []);

      function fetchIdeasFromDB(){
        fetch('/idea')
        .then(response => response.json())
        .then(data => {
            setIdeas(data);
        })
        .catch(error => {
            console.log(error)
        })
      }

      function removeIdea(ideaName) {
        setIdeas(ideas.filter((el) => (el.message !== ideaName)));
      }

      function addIdea(ideaName){
        setIdeas([...ideas, {id: Math.floor(Math.random()*100) ,message: ideaName}]);
      }

    return (
        <div className="page">
            <p className="page-title" style={{ textAlign: "center" }}>
                IdeaBox
            </p>
            <IdeaInputField fetchIdeasFromDB={fetchIdeasFromDB} memberOfTeam={userData.team}/>
            {_.isEmpty(ideas) ? 
                <p className="page-title" style={{ textAlign: "center" }}>
                    {text}
                </p> : 
                <IdeaTable 
                    ideas={ideas} 
                    fetchIdeasFromDB={fetchIdeasFromDB}
                />}
        </div>
    );
};
