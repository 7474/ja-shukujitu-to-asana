import ical from 'node-ical';

const events = await ical.async.fromURL('https://calendar.google.com/calendar/ical/ja.japanese%23holiday%40group.v.calendar.google.com/public/basic.ics');
// // loop through events and log them
// for (const event of Object.values(events)) {
//     console.log(
//         'Summary: ' + event.summary +
//         '\nDescription: ' + event.description +
//         '\nStart Date: ' + event.start.toISOString() +
//         '\n'
//     );
// };

const now = new Date();
const upsertEvents = Object.values(events)
    .filter(e => e.start)
    .filter(e => e.start > now);

upsertEvents.forEach(event => {
    console.log(event);
});