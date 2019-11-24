const express = require("express");
const cors = require("cors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config");
const chalk = require("chalk");
const connections = require('../db/connections');
// const {Team, User} = require('../db/connections'); Erre át kell írni
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

let user = {};
let allTeams = {};
let allIdeas = {};
let allMessages = {};
let allRetroSpective = {};
let allNicoNicos = {};
let teamMembers = {};

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
            if(user.teamId !== null){
                getTeamNameForUserContext();
            }
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

app.get("/api/teamCompetencies/:teamId", (req, res) => {
    synchronizeTeamCompetencies(req.params.teamId,res);
});

function synchronizeTeamCompetencies(_teamId,res){
    connections.Team.findOne({ where: {id: _teamId},
        include: {
            model: connections.Competency
        }
    }).then(_competencies => {
        res.send(_competencies);
    });
}

app.post('/api/deleteteam',function(req,res){
    var teamIdToDelete=req.body.id;
    deleteTeam(teamIdToDelete);
    res.end("yes");
});

function synchronizeTeams(){
    connections.Team.findAll().then(teams => {
        // console.log(chalk.green("All teams:", JSON.stringify(teams, null, 4)));
        allTeams = JSON.stringify(teams, null, 4)
        console.log(chalk.green("Teams table synchronazition done!"));
    }); 
}

app.get("/team", (req, res) => {
    synchronizeTeams();
    console.log(chalk.green("getting teams!"));
    res.send(allTeams);
});

function getTeamNameForUserContext(){
    connections.Team.findOne({ where: 
        {id: user.teamId } 
    }).then(team => {
        user["team"] = team.name;
        console.log(chalk.bgYellow(JSON.stringify(user)));
    }); 
}

app.post('/api/jointeam',function(req,res){
    var teamToJoin=req.body.teamId;
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

function deleteTeam(teamId){
    connections.Team.destroy({
        where: {
            id: teamId
        }
      }).then(() => {
        console.log(chalk.green("Team deleted"));
      });
}

function joinToTeam(teamId, userName){
    connections.User.update({ teamId: teamId }, {
        where: {
            name: userName
        }
      }).then(() => {
        console.log(`${userName} joined ${teamId} successfully`);
      });
}

function synchronizeIdeas(){
    connections.Idea.findAll().then(ideas => {
        //console.log(chalk.yellow("All Ideas:", JSON.stringify(ideas, null, 4)));
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
        // console.log(chalk.yellow("All messages:", JSON.stringify(messages, null, 4)));
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

// ------- RetroSpective ---------

function synchronizeRetroSpective(_teamId){
    connections.Retrospective.findAll({ where: {
        teamId: _teamId
    }}).then(_retro => {
        allRetroSpective = JSON.stringify(_retro, null, 4)
        console.log(chalk.green("RetroSpective table synchronazition done!"));
        console.log(chalk.red(user.team));
    }); 
}

function createNewRetroComment(_description, _roomName, _evaluation , _date,  _team){
    connections.Retrospective.findOrCreate({ where: { 
        description: _description,
        date: _date,
        team: _team,
        evaluation: _evaluation,
        roomName: _roomName
    }
 });
}

app.get("/retrospective/:teamId", (req, res) => {
    synchronizeRetroSpective(req.params.teamId);
    console.log(chalk.green("getting retrospectives!"));
    res.send(allRetroSpective);
});

app.post('/api/createRetroSpective',function(req,res){
    let retrospective = new connections.Retrospective({ 
        date: req.body.date,
        roomName: req.body.roomName
    });
    getTeam(req.body.team).then(_team =>{
        retrospective.teamId = _team.id;
    }).then(response => {
        retrospective.save();
    });
    // synchronizeRetroSpective();
});

app.post('/api/createIssue',function(req,res){
    connections.Issue.findOrCreate({ where: { 
        description: req.body.description,
        evaluation: req.body.evaluation,
        RetrospectiveId: req.body.RetrospectiveId
        }
    });
    res.end("yes");
});

app.get("/api/issues/:retroId", (req, res) => {
    let filteredIssues = {};
    connections.Issue.findAll({where: {
        RetrospectiveId: req.params.retroId
        }
    }).then(_issues => {
        filteredIssues = JSON.stringify(_issues, null, 4)
    }).then(response => {
        res.send(filteredIssues);
    });
});

const getTeam = team => {
    return connections.Team.findOne({ 
        where: {name: team} 
    }).then(response =>{
        console.log(response);
        return response;
    });
};

// -------- NicoNico ----------

app.get("/api/niconicosss/", (req, res) => {
    console.log(chalk.yellow("IDE MOST BELEEMNTEM"));
    const Op = Sequelize.Op;
    let niconicos = {};
    let dbQuery = {};
    if(req.query.startDate !== "null"){
        dbQuery["date"] = {
            [Op.between] : [req.query.startDate, req.query.endDate]
        }
    }
    console.log(chalk.green(JSON.stringify(dbQuery)));
    console.log(chalk.green(JSON.stringify(req.query)));
    connections.NicoNico.findAll(
        {
            include: [
                {model: connections.User,
                    where: {
                        teamId: req.query.teamId
                }
            }
        ]
        },{
            where: dbQuery,
        }   
    
    ).then(_issues => {
        console.log("meg lettem hivaaaaaa");
        niconicos = JSON.stringify(_issues, null, 4)
    }).then(response => {
        res.send(niconicos);
        console.log(chalk.red(niconicos));
    });
});


function getNicoNicos(res){
    let rawUsersWithNicos = {};
    connections.User.findAll({
        include: [{
            model: connections.NicoNico
        }]
    }
    ).then(_nicos => {
        rawUsersWithNicos = (JSON.stringify(_nicos, null, 4));
    }).then(response =>{
        res.send(rawUsersWithNicos)
    })
}

app.get("/api/niconicos/", (req, res) => {
    getNicoNicos(res);
});

function synchronizeNicoNicos(){
    connections.NicoNico.findAll().then(niconicos => {
        allNicoNicos = JSON.stringify(niconicos, null, 4)
        console.log(`All NicoNicos: ${allNicoNicos}`);
    });
}

function getTeamMembersByteamId(_teamId){
    connections.User.findAll({ where: {
        teamId: _teamId
    }}).then(_members => {
        teamMembers = JSON.stringify(_members, null, 4);
    });
}

app.get("/api/niconicos/users/:teamId", (req, res) => {
    getTeamMembersByteamId(req.params.teamId);
    res.send(teamMembers);
});

app.post('/api/addNicoNico',function(req,res){
    let userId=req.body.userId;
    let date=req.body.date;
    let value=req.body.value;
    createNewNicoNico(userId,date,value);
    res.end("yes");
});

function createNewNicoNico(_userId, _date,  _value){
    connections.NicoNico.create({  
        date: _date,
        value: String(_value),
        userId: _userId,
 });
}

// ----------------- Competencies ---------------------

app.post('/api/createCompetency',function(req,res){
    let name=req.body.name;
    createNewCompetency(name);
    res.end("yes");
});

function createNewCompetency(_name){
    connections.Competency.findOrCreate({ where:{
        name : _name
    }  
 });
}

function getCompetencies(res){
    let allCompetencies = {};
    connections.Competency.findAll().then(_competencies => {
        allCompetencies = (JSON.stringify(_competencies, null, 4));
    }).then(response =>{
        res.send(allCompetencies)
    })
}

app.get("/api/competencies/", (req, res) => {
    getCompetencies(res);
});

app.post('/api/addTeamCompetency',function(req,res){
    let teamId=req.body.teamId;
    let competencyId=req.body.competencyId;
    addTeamCompetency(teamId,competencyId);
    res.end("yes");
});

function addTeamCompetency(_teamId, _competencyId){
    connections.Team.findOne({ where:{
        id : _teamId,
    }
    }).then(_team =>{
        _team.addCompetency(_competencyId);
    })
};
 
app.post('/api/saveCompetency',function(req,res){
    let competencyId=req.body.competencyId;
    let userId=req.body.userId;
    let value=req.body.value;

    saveCompetency(competencyId,userId,value);
    res.end("yes");
});

function saveCompetency(_competencyId, _userId, _value){
    connections.UserCompetency.findOne({ where: 
        {
            competencyId: _competencyId,
            userId: _userId
        },
    }).then(_competencies => {
       if(_competencies === null){
        createUserCompeteny(_value,_competencyId,_userId);
       }else{
        updateUserCompetency(_value,_competencyId,_userId);
       }
    });
};

function createUserCompeteny(_value, _competencyId, _userId){
    connections.UserCompetency.create({  
        value: _value,
        userId: _userId,
        competencyId: _competencyId
 });
}

function updateUserCompetency(_value, _competencyId, _userId){
    connections.UserCompetency.update({value: _value}, { fields: ['value'],
     where: {
        competencyId: _competencyId,
        userId: _userId
        }
    });
}

function getUserCompetenciesByteamId(_teamId, res){
    connections.User.findAll({ where: {teamId: _teamId},
        include: {
            model: connections.UserCompetency
        }
    }).then(_members => {
        res.send(_members);
    });
}

app.get("/api/usercompetency/:teamId", (req, res) => {
    getUserCompetenciesByteamId(req.params.teamId, res);
});

// Faker.js sok felhasználóhoz + teszt
// todo:
    // cypress scenario recorder vagy a sima automatizált ui teszt
    // data envben legyenek sec tokenek .env
    // end-to end test postman

    // komponens alapú fejlesztésről írni
    
const PORT = 5000;
app.listen(PORT);