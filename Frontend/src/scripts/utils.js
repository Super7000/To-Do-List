function convert12hrTo24hr(time12hr) {
    // Example input: time12hr = "1:30:45 PM"

    // Split the input into time and period (AM/PM)
    const timeComponents = time12hr.split(' ');
    const time = timeComponents[0];
    const period = timeComponents[1];

    const [hours, minutes, seconds] = time.split(':');

    // Convert hours to 24-hour format
    let hours24 = parseInt(hours, 10);
    if (period === 'PM' && hours24 < 12) {
        hours24 += 12;
    } else if (period === 'AM' && hours24 === 12) {
        hours24 = 0;
    }

    // Format hours, minutes, and seconds as two digits each
    const hours24Str = hours24.toString().padStart(2, '0');
    const minutesStr = minutes.padStart(2, '0');
    const secondsStr = seconds.padStart(2, '0');

    // Construct the 24-hour format time string
    const time24hr = `${hours24Str}:${minutesStr}:${secondsStr}`;

    return time24hr;
}

function convert24hrTo12hr(time24hr) {
    // Example input: time24hr = "13:30:45"

    // Split the input into hours, minutes, and seconds
    const [hours24, minutes, seconds] = time24hr.split(':');

    // Convert hours to 12-hour format and determine period (AM/PM)
    let hours12 = parseInt(hours24, 10);
    let period = 'AM';

    if (hours12 === 0) {
        hours12 = 12; // Midnight
    } else if (hours12 === 12) {
        period = 'PM'; // Noon
    } else if (hours12 > 12) {
        hours12 -= 12; // PM hours
        period = 'PM';
    }

    // Format hours, minutes, and seconds as two digits each
    const hours12Str = hours12.toString().padStart(2, '0');
    const minutesStr = minutes.padStart(2, '0');
    const secondsStr = seconds.padStart(2, '0');

    // Construct the 12-hour format time string
    const time12hr = `${hours12Str}:${minutesStr}:${secondsStr} ${period}`;

    return time12hr;
}

function getCurrentTime() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    // Ensure two digits for hours
    hours = hours < 10 ? `0${hours}` : hours;

    return `${hours}:${minutes}`;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export { convert12hrTo24hr, convert24hrTo12hr, getCurrentTime, formatDate };