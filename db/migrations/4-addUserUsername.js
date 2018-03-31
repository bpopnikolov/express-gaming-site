'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "username" to table "Users"
 * changeColumn "firstname" on table "Users"
 * changeColumn "lastname" on table "Users"
 *
 **/

var info = {
    "revision": 4,
    "name": "addUserUsername",
    "created": "2018-03-31T18:34:00.125Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Users",
            "username",
            {
                "type": Sequelize.STRING,
                "unique": true,
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
