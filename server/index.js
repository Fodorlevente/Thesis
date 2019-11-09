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
let allIdeas = {};
let allMessages = {};

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

function synchronizeIdeas(){
    connections.Idea.findAll().then(ideas => {
        console.log(chalk.yellow("All Ideas:", JSON.stringify(ideas, null, 4)));
        allIdeas = JSON.stringify(ideas, null, 4)
        console.log(chalk.green("Ideas table synchronazition done!"));
    }); 
}

app.get("/idea", (req, res) => {
    synchronizeIdeas();
    console.log(chalk.green("getting Ideas!"));
    res.send(allIdeas);
});

app.post('/api/idea',function(req,res){
    var newIdeaMessage=req.body.name;
    var newIdeaDate=req.body.date;
    var newIdeaTeam=req.body.team;
    var newIdeaCompleted=req.body.completed;
    createNewIdea(newIdeaMessage,newIdeaDate,newIdeaTeam,newIdeaCompleted);
    res.end("yes");
});

app.post('/api/deleteidea',function(req,res){
    var ideaNeedToDelete=req.body.name;
    deleteIdea(ideaNeedToDelete);
    res.end("yes");
});

app.post('/api/completeidea',function(req,res){
    var ideaNeedToComplete=req.body.name;
    console.log(chalk.blue(ideaNeedToComplete));
    completeIdea(ideaNeedToComplete);
    res.end("yes");
});

function completeIdea(ideaName){
    connections.Idea.update({ completed: 1 }, {
        where: {
            message: ideaName
        }
      }).then(() => {
        console.log(`${ideaName} set to Completed successfully`);
      });
}

function createNewIdea(_message, _date, _team, _completed){
    connections.Idea.findOrCreate({ where: { 
        message: _message,
        date: _date,
        team: _team,
        completed: _completed,
    }
 }).then(([registeredTeam, created]) => {
        console.log(registeredTeam.get({
            plain: true
          }))
        team = registeredTeam.get({ plain: true });
    });
}

function deleteIdea(ideaName){
    connections.Idea.destroy({
        where: {
            message: ideaName
        }
      }).then(() => {
        console.log(chalk.green("Idea deleted"));
      });
}

// ------ Message Board ------------

function synchronizeMessages(){
    connections.Message.findAll().then(messages => {
        console.log(chalk.yellow("All messages:", JSON.stringify(messages, null, 4)));
        allMessages = JSON.stringify(messages, null, 4)
        console.log(chalk.green("Messages table synchronazition done!"));
    }); 
}

app.get("/messageBoard", (req, res) => {
    synchronizeMessages();
    console.log(chalk.green("getting Messages!"));
    res.send(allMessages);
});

app.post('/api/sendMessage',function(req,res){
    let message=req.body.message;
    let user=req.body.user;
    let date=req.body.date;
    let team=req.body.team;
    createNewMessage(message,user,date,team);
    res.end("yes");
});

function createNewMessage(_message, _user, _date,  _team){
    connections.Message.findOrCreate({ where: { 
        message: _message,
        date: _date,
        team: _team,
        user: _user,
    }
 }).then(([registeredMessage, created]) => {
        console.log(registeredMessage.get({
            plain: true
          }))
        team = registeredMessage.get({ plain: true });
    });
}

// ------- Profile / User ---------

function synchronizeUser(){
    connections.User.findAll().then(_user => {
        user = JSON.stringify(_user, null, 4)
        console.log(chalk.green("User table synchronazition done!"));
    }); 
}

function updateProfileToScumMaster(userName, _rank){
    connections.User.update({ rank: _rank}, {
        where: {
            name: userName
        }
      }).then(() => {
        console.log(`${userName} set to  ${_rank} successfully`);
      });
}

app.post('/api/setProfile',function(req,res){
    let role=req.body.rank;
    let user = req.body.user;
    updateProfileToScumMaster(user,role);
    res.end("yes");
    synchronizeUser();
});

const PORT = 5000;
app.listen(PORT);