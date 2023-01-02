const client = require("discord-rich-presence")("1029879320476397628");
const readline = require("readline")

const pickupLines = require("./custom_modules/pickup-lines");
const countdownTimer = require("./custom_modules/countdown-timer");

const cdsg = {updatePresence, onReadLine}
let current_presence_generator;

const inquirer = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function updatePresence(state, details,
                        startTimestamp, endTimestamp,
                        largeImageKey, largeImageText, smallImageKey, smallImageText,
                        partyId, partySize, partyMax,
                        matchSecret, joinSecret, spectateSecret,
                        instance) {
    client.updatePresence({
        state: state || "",
        details: details || "",
        startTimestamp: startTimestamp || null,
        endTimestamp: endTimestamp || null,
        largeImageKey: largeImageKey || null,
        largeImageText: largeImageText || null,
        smallImageKey: smallImageKey || null,
        smallImageText: smallImageText || null,
        partyId: partyId || null,
        partySize: partySize || null,
        partyMax: partyMax || null,
        matchSecret: matchSecret || null,
        joinSecret: joinSecret || null,
        spectateSecret: spectateSecret || null,
        instance: instance || false,
    });

    console.log("Presence successfully updated.")
}

function onReadLine(query) {
    switch (query) {
        case "help": console.log(`help command called`); break;
    }
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
                let loop_speed = 15 * 60 * 1000;  // default loop_speed is 15 minutes
                current_presence_generator = new pickupLines(loop_speed);
                break;
            case "ct":  // COUNTDOWN TIMER
                console.log("Status type set to countdown timer");
                let target_time = 10000000000;
                current_presence_generator = new countdownTimer(target_time);
                break;
            default:
                console.log(query + " is not a valid option. Please type 'pl' or 'ss'.");
                setGeneratorType();
        }
    });
}

setGeneratorType();
