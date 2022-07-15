import ical from "node-ical";
import asana from "asana";

const now = new Date();

const events = await ical.async.fromURL(
  "https://calendar.google.com/calendar/ical/ja.japanese%23holiday%40group.v.calendar.google.com/public/basic.ics"
);
const upsertEvents = Object.values(events)
  .filter((e) => e.start)
  .filter((e) => e.start > now);

const targetProjectIds = process.env.ASANA_PROJECT_IDS.split(",");

const client = asana.Client.create().useAccessToken(process.env.ASANA_TOKEN);
const me = await client.users.me();

console.log(me);

for (const event of upsertEvents) {
  console.log(event);
  const task = await client.tasks.create({
    name: event.summary,
    due_at: event.start,
    projects: targetProjectIds,
    resource_subtype: 'milestone',
  });
  console.log(task);
}
