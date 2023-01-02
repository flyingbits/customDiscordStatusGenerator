const client = require("discord-rich-presence")("1029879320476397628");
const readline = require("readline")

const pickup_lines = require("./pickup-lines");
//const school_status = require("./school-status");

const inquirer = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function updatePresence() {
    client.updatePresence({
        state: "",
        details: "",
        startTimestamp: Date.now(),
        endTimestamp: Date.now() + 15 * 60 * 1000,
        instance: true,
    });

    console.log("Presence successfully updated.")
}

function onReadLine(query) {
    switch (query) {
        case "help": console.log(`help command called`); break;
    }
}

function setStatusType() {
    inquirer.question(`What status setting do you want?
The options are:
* pl - pickup lines
* ss - school status\n`, function(query) {
        switch (query) {
            case "pl":
                console.log("Status type set to pickup lines");
                pickup_lines();
                break;
            case "ss":
                console.log("Status type set to school status");
                break;
            default:
                console.log(query + " is not a valid option. Please type 'pl' or 'ss'.");
                setStatusType();
        }
    });
}

setStatusType();
