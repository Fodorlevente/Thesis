import React, { useState } from "react";
import Terminal from "../components/displays/Terminal";
import CardList from "../components/cards/cardList";


const Home = () =>{

    const terminalMsg = [
        "Create your team",
        "Organize a planning",
        "Lets discuss in team chat",
        "Visualize the team performance and knowledge and other things in the Metrics section",
        "Organize a Sprint Retrospective"];

    const [prompt, setPrompt] = useState("Welcome");
   
     function getRandom(list) {
        return list[Math.floor((Math.random()*list.length))];
    } 

    setTimeout(function () {
        setPrompt(getRandom(terminalMsg));
    }, 3200);

    return (
       <div className="page" style={{ textAlign: "center"}}>
           <p className="page-title">Agile Team Management Kit</p>
           <p style={{ fontSize: 20 }}>
               ATMK is one of the best management application for developing teams who use Agile methods especieally Scrum™.
               You can create your Scrum Team and you can easily manage the everyday work with the features of ATMK. 
           </p>
           <Terminal 
                userData={prompt}
                selected="All"
           />
           <p style={{ fontSize: 28 }}>
                You can easily login with
           </p>
           <CardList />
           <div style={{ marginBottom: 20 }}/>
       </div>

    )
};

export default Home;