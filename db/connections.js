const keys = require('../config');
const Sequelize = require('sequelize');
const chalk = require('chalk');

const sequelize = new Sequelize(keys.MYSQL.name, keys.MYSQL.user, keys.MYSQL.password, {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log(chalk.bgBlue('Connection has been established successfully.'));
    })
    .catch(err => {
        console.error(chalk.bgRed('Unable to connect to the database:', err));
    });

const Model = Sequelize.Model;

class User extends Model { }
User.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    profilePicture: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    team: {
        type: Sequelize.STRING
    },
    rank: {
        type: Sequelize.ENUM,
        values: ["Scrum Master", "Developer"],
        defaultValue: "Developer"
    }
}, {
        sequelize,
        modelName: keys.MODEL.user
    });

class Team extends Model { }
Team.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        sequelize,
        modelName: keys.MODEL.team
    });

class Competency extends Model { }
Competency.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    team: {
        type: Sequelize.STRING
    }
}, {
        sequelize,
        modelName: keys.MODEL.competency
    });

class UserCompetency extends Model { }
UserCompetency.init({
    user: {
        type: Sequelize.STRING,
        allowNull: false
    },
    competency: {
        type: Sequelize.STRING
    },
    value: {
        type: Sequelize.INTEGER
    }
}, {
        sequelize,
        modelName: keys.MODEL.usercompetency
    });

// class MessageBoard extends Model { }
// MessageBoard.init({
//     team: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// }, {
//         sequelize,
//         modelName: keys.MODEL.messageboard
//     });

class Message extends Model { }
Message.init({
    user: {
        type: Sequelize.STRING,
        allowNull: false
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 255]
        }
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    team: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        sequelize,
        modelName: keys.MODEL.message
    });

// class Issue extends Model { }
// Issue.init({
//     evaluation: { // good / bad // todo
//         type: Sequelize.ENUM,
//         allowNull: false,
//         values: ["Worked well", "To be improved", "Want to do in next sprint"]
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }, roomName: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },value: {
//         type: Sequelize.INTEGER,
//         defaultValue: 0
//     }
// }, {
//         sequelize,
//         modelName: keys.MODEL.issue
//     });

class Idea extends Model { }
Idea.init({
    team: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    },
    completed: {
        type: Sequelize.BOOLEAN
    }
}, {
        sequelize,
        modelName: keys.MODEL.idea
    });

class Retrospective extends Model { }
Retrospective.init({
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    team: {
        type: Sequelize.STRING,
        allowNull: false
    },evaluation: { // good / bad // todo
        type: Sequelize.ENUM,
        allowNull: false,
        values: ["Worked well", "To be improved", "Want to do in next sprint"]
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }, roomName: {
        type: Sequelize.STRING,
        allowNull: false
    },value: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }

}, {
        sequelize,
        modelName: keys.MODEL.retorspective
    });

// class RetrospectiveFinding extends Model { }
// RetrospectiveFinding.init({
//     retrospectiveid: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     evaluation: { // good / bad // todo
//         type: Sequelize.DATE,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// }, {
//         sequelize,
//         modelName: keys.MODEL.retorspectivefinding
//     });


class NicoNico extends Model { }
NicoNico.init({
    user: {
        type: Sequelize.STRING,
        allowNull: false
    },
    value: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ["1", "3", "5"]
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
        sequelize,
        modelName: keys.MODEL.niconico
    });

sequelize.sync();


module.exports = {
    NicoNico,
    // RetrospectiveFinding,
    Retrospective,
    Idea,
    // IdeaBox,
    Message,
    // MessageBoard,
    UserCompetency,
    Competency,
    Team,
    User
};