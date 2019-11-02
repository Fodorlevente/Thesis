const express = require("express");
const cors = require("cors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config");
const chalk = require("chalk");
const connections = require('../db/connections');
const bodyParser = require('body-parser');

let user = {};
let allTeams = {};

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

// Google Strategy
passport.use(new GoogleStrategy({
        clientID: keys.GOOGLE.clientID,
        clientSecret: keys.GOOGLE.clientSecret,
        callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.bgYellow("GoogleStrategy"));
        console.log(chalk.blue(JSON.stringify(profile)));
        connections.User.findOrCreate({ where: { 
            email: profile.emails[0].value
        }, defaults: {
            name: profile.displayName,
            profilePicture: profile.photos[0].value,
        } }).then(([registeredUser, created]) => {
            console.log(registeredUser.get({
                plain: true
              }))
            user = registeredUser.get({ plain: true });
        });
        return cb(null, profile);
    }));


const app = express();
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));
app.get("/auth/google/callback",
    passport.authenticate("google"),
        (req, res) => {
            res.redirect("/profile");
        });

app.get("/user", (req, res) => {
    console.log("getting user data!");
    res.send(user);
});

app.get("/auth/logout", (req, res) => {
    console.log("logging out!");
    user = {};
    res.redirect("/");
});

app.post('/api/team',function(req,res){
    var newTeamName=req.body.name;
    console.log(chalk.yellow("New Team name: = " + newTeamName));
    createNewTeam(newTeamName);
    res.end("yes");
});

app.post('/api/deleteteam',function(req,res){
    var teamNameToDelete=req.body.name;
    deleteTeam(teamNameToDelete);
    res.end("yes");
});

function synchronizeTeams(){
    connections.Team.findAll().then(teams => {
        console.log(chalk.green("All teams:", JSON.stringify(teams, null, 4)));
        allTeams = JSON.stringify(teams, null, 4)
        console.log(chalk.green("Teams table synchronazition done!"));
    }); 
}

app.get("/team", (req, res) => {
    synchronizeTeams();
    console.log(chalk.green("getting teams!"));
    res.send(allTeams);
});

app.post('/api/jointeam',function(req,res){
    var teamToJoin=req.body.team;
    var user = req.body.name;
    joinToTeam(teamToJoin,user);
    res.end("yes");
});

function createNewTeam(teamName){
    connections.Team.findOrCreate({ where: { 
        name: teamName
    }
 }).then(([registeredTeam, created]) => {
        console.log(registeredTeam.get({
            plain: true
          }))
        team = registeredTeam.get({ plain: true });
    });
}

function deleteTeam(teamName){
    connections.Team.destroy({
        where: {
            name: teamName
        }
      }).then(() => {
        console.log(chalk.green("Team deleted"));
      });
}

function joinToTeam(teamName, userName){
    connections.User.update({ team: teamName }, {
        where: {
            name: userName
        }
      }).then(() => {
        console.log(`${userName} joined ${teamName} successfully`);
      });
}



const PORT = 5000;
app.listen(PORT);