import React from 'react';
import { Router, Route } from "react-router-dom";
import history from "./history";
import UserProvider from "./contexts/UserProvider";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Team from "./pages/Team";
import IdeaBox from "./pages/IdeaBox";
import MenuBar from "./components/menus/MenuBar";
import MessageBoard from "./pages/MessageBoard";
import RetroSpective from "./pages/RetroSpectives";

const App = () => {
    return (
        <Router history={history}>
            <UserProvider>
                <Route path="/" component={MenuBar} />
                <Route path="/profile" component={Profile} />
                <Route path="/messageBoard" component={MessageBoard} />
                <Route path="/dashboard" component={Profile} />
                <Route path="/metrics" component={Profile} />
                <Route path="/planning" component={Profile} />
                <Route path="/retrospective" component={RetroSpective} />
                <Route path="/ideabox" component={IdeaBox} />
                <Route path="/settings" component={Profile} />
                <Route path="/team" component={Team} />
            </UserProvider>
            <Route path="/" exact component={Home} />
        </Router>
    );
};

export default App;
