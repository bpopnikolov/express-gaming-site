'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "UserId" to table "UserGameRatings"
 * addColumn "GameId" to table "UserGameRatings"
 * changeColumn "lastname" on table "Users"
 * changeColumn "firstname" on table "Users"
 *
 **/

var info = {
    "revision": 3,
    "name": "add-user-game-rating-assoc",
    "created": "2018-03-24T14:14:57.363Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "UserGameRatings",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "Users",
                    "key": "id"
                },
                "allowNull": false,
                "unique": "composite_game_user_rating"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "UserGameRatings",
            "GameId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "Games",
                    "key": "id"
                },
                "allowNull": false,
                "unique": "composite_game_user_rating"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Users",
            "lastname",
            {
                "type": Sequelize.STRING,
                "validate": {
                    "is": {}
                },
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Users",
            "firstname",
            {
                "type": Sequelize.STRING,
                "validate": {
                    "is": {}
                },
                "allowNull": false
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
