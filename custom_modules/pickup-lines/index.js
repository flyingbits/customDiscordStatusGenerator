const fs = require("fs");


function load_lines() {
    fs.readFile("lines.txt", "utf8", function(err, data) {
        console.log("lines.txt successfully read.");
        //lines = data.split("\n");
        console.log(data);
        return data;
    });
    return "";
}


class pickupLines {
    constructor(cdsg, loop_speed) {
        this.lines = load_lines();
        this.index = 0;
        this.speed = loop_speed;
    }

    start(client) {
        this.interval = setInterval(function() {
            client.updatePresence({
                state: "Have a good day",
                details: lines[index],
                startTimestamp: Date.now(),
                endTimestamp: Date.now() + 15 * 60 * 1000,
                instance: true,
            });
            this.index++;
        }, this.speed);
    }

    stop() {
        clearInterval(this.interval);
    }
}

module.exports = pickupLines;