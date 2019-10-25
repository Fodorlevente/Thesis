import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserDropDown from "./UserDropDown";
import UserProvider from "../../contexts/UserProvider";
import _ from "lodash";
import HomeIcon from "@material-ui/icons/Home";
import LogoutIcon from "@material-ui/icons/MeetingRoom";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Chat from '@material-ui/icons/Chat';
import Settings from '@material-ui/icons/Settings';
import BarChart from '@material-ui/icons/BarChart';
import Work from '@material-ui/icons/Work';
import ViewQuilt from '@material-ui/icons/ViewQuilt';
import Feedback from '@material-ui/icons/Feedback';
import Group from '@material-ui/icons/Group';
import Whatshot from '@material-ui/icons/Whatshot';

const useStyles = makeStyles({
    avatar: {
        width: 35,
        height: 35,
        margin: 0,
    },
  });

const menuItems = [
    {
        title: "Message Board",
        path: "/messageBoard",
        icon: <Chat />
    },
    {
        title: "DashBoard",
        path: "/dashboard",
        icon: <ViewQuilt/>
    },
    {
        title: "Metrics",
        path: "/metrics",
        icon: <BarChart/>
    },
    {
        title: "Planning",
        path: "/planning",
        icon: <Work/>
    },
    {
        title: "Retrospective",
        path: "/retrospective",
        icon:  <Feedback/>
    },
    {
        title: "Idea Box",
        path: "/ideabox",
        icon: <Whatshot/>
    },
    {
        title: "Settings",
        path: "/settings",
        icon: <Settings/>
    },
    {
        title: "Team",
        path: "/team",
        icon: <Group/>
    },
];

const MenuBar = (props) => {
    const userData = useContext(UserProvider.context);
    const classes = useStyles();

    return (
        <div className="menu-bar">
            <Link className="btn menu-btn" to="/" title="Home">
                <HomeIcon />
            </Link>
            {
            !_.isEmpty(userData) &&
                menuItems.map((value, index) => {
                    return (
                        <Link className="btn menu-btn" to={value.path} title={value.title} key={index}>
                            {value.icon}
                        </Link>
                    );
                })
                
            }

            {
                !_.isEmpty(userData) &&
                <Link className="btn menu-btn" to="/profile" title={`${userData.name} data`}>
                    <Grid container justify="center" alignItems="center" style={{ padding: 0 }}>
                        <Avatar
                            alt={userData.name} 
                            src={userData.profilePicture} 
                            className={classes.avatar} 
                        />
                    </Grid>
                </Link>
            }
            <UserDropDown />
            {
                !_.isEmpty(userData) &&
                <a
                    className="btn menu-btn"
                    href={"/auth/logout"}
                    title="Logout"
                    style={{ float: "right" }}
                >
                    <LogoutIcon />
                </a>
            }

 {/* this needs a huge refactoring... :'( */}
            

        </div>
    );
};

export default MenuBar;