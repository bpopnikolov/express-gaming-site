'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "UserId" to table "UserGameReviews"
 * addColumn "GameId" to table "UserGameReviews"
 * changeColumn "lastname" on table "Users"
 * changeColumn "firstname" on table "Users"
 *
 **/

var info = {
    "revision": 4,
    "name": "add-user-game-review-assoc",
    "created": "2018-03-24T14:28:53.068Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "UserGameReviews",
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
                "unique": "composite_review_index"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "UserGameReviews",
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
                "unique": "composite_review_index"
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
