const keys = require('../config');
const Sequelize = require('sequelize');
const chalk = require('chalk');
 /* C:\Users\Levi\Documents\dumps\Dump20191114 */
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
        allowNull: false,
        unique: true
    },
}, {
        sequelize,
        modelName: keys.MODEL.competency
    });

class UserCompetency extends Model { }
UserCompetency.init({
    value: {
        type: Sequelize.INTEGER
    }
}, {
        sequelize,
        modelName: keys.MODEL.usercompetency
    });

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


class Issue extends Model {}
Issue.init({
    value: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    evaluation: { 
        type: Sequelize.ENUM,
        allowNull: false,
        values: ["Worked well", "To be improved", "Want to do in next sprint"]
    },
},{
    sequelize,
    modelName: keys.MODEL.issue
});

class Retrospective extends Model { }
Retrospective.init({
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    roomName: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        sequelize,
        modelName: keys.MODEL.retorspective
    });

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


class NicoNico extends Model { }
NicoNico.init({
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

Retrospective.belongsTo(Team);
Retrospective.hasMany(Issue);
Issue.belongsTo(Retrospective);
Team.hasMany(Retrospective);

NicoNico.belongsTo(User);
User.hasMany(NicoNico);

User.belongsTo(Team);
Team.hasMany(User);

Team.belongsToMany(Competency, {through: "TeamCompetency"});
Competency.belongsToMany(Team, {through: "TeamCompetency"});
UserCompetency.belongsTo(User);
User.hasMany(UserCompetency);
UserCompetency.belongsTo(Competency);
Competency.hasMany(UserCompetency);

sequelize.sync();


module.exports = {
    NicoNico,
    Retrospective,
    Idea,
    Message,
    Issue,
    UserCompetency,
    Competency,
    Team,
    User
};