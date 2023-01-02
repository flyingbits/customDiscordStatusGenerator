const client = require("discord-rich-presence")("1029879320476397628");
const readline = require("readline")

const pickupLines = require("./custom_modules/pickup-lines");
const countdownTimer = require("./custom_modules/countdown-timer");

let current_presence_generator;

const inquirer = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function onReadLine(query) {
    switch (query) {
        case "help": console.log(`help command called`); break;
    }
}

function updatePresence(state, details, startTimestamp, endTimestamp) {
    client.updatePresence({
        state: state,
        details: details,
        startTimestamp: startTimestamp,
    });
}


function setGeneratorType() {
    inquirer.question(`What status setting do you want?
The options are:
* pickup lines      - pl u{loop_speed}
* countdown timer   - ct u{target_time} b{percentage} i{start_time}\n`, function(query) {
        query = query.split(" ");
        switch (query[0]) {
            case "pl":  // PICKUP LINES
                console.log("Status type set to pickup lines");
                let loop_speed = Number(query[1]) * 1000 || 15 * 60 * 1000;  // default loop_speed is 15 minutes
                current_presence_generator = pickupLines;
                current_presence_generator.constructor(updatePresence, loop_speed);
                break;
            case "ct":  // COUNTDOWN TIMER
                console.log("Status type set to countdown timer");
                let target_time = 10000000000;
                current_presence_generator = countdownTimer;
                current_presence_generator.constructor(updatePresence, target_time);
                break;
            default:
                console.log(query + " is not a valid option. Please type 'pl' or 'ss'.");
                setGeneratorType();
        }
        current_presence_generator.start();
    });
}

setGeneratorType();

/*
client.updatePresence({
    state: "Really, this is a test",
    details: "This is a test",
});*/