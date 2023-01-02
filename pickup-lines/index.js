const fs = require("fs");


function pickupLines() {
    let lines;
    let index = 0;

    function start(client) {
        load();
        setInterval(function() {
            client.updatePresence({
                state: "Have a good day",
                details: lines[index],
                startTimestamp: Date.now(),
                endTimestamp: Date.now() + 15 * 60 * 1000,
                instance: true,
            });
            index++;
        }, 15 * 60 * 1000);
    }

    function load() {
        fs.readFile("lines.txt", "utf8", function(err, data) {
            console.log("lines.txt successfully read.");
            //lines = data.split("\n");
            console.log(data);
        })
    }

    function stop() {

    }

    start();
}

module.exports = pickupLines;