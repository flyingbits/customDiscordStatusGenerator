
function generate_status(start_time, target_time) {
    let percentage;
    if (start_time) {
        percentage = calculate_completion_percentage(start_time, target_time);
    }
    let status = "";
    let description = "";
    if (target_time - Date.now() > 24 * 60 * 60 * 1000) {
        description = `${(target_time - Date.now()) % 86400000} days and`;
    }
    if (percentage) {
        status = `${percentage}% complete`;
    }
    return {status, description};
}

function calculate_completion_percentage(start_time, target_time) {
    return (Date.now() - start_time) / (target_time - start_time);
}

class countdownTimer {
    constructor(up, target_time, percentage, start_time) {
        this.up = up;
        this.status = generate_status(start_time, target_time)
        this.start_time = start_time || null;
        this.target_time = target_time;
    }

    start() {
        this.up(this.status.status, this.status.description, this.start_time, this.target_time);
    }

    stop() {

    }

}

module.exports = countdownTimer;