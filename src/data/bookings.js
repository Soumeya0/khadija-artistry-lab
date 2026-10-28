import { toKey } from '../lib/booking.js';

// DEMO DATA. In the real version this comes from a database + Google Calendar.
// Returns the appointments already on the calendar for a given day,
// as { start, end } in minutes since midnight.
export function existingBookings(date) {
  const day = date.getDay();
  const dom = date.getDate();
  const list = [];
  if (day === 6) list.push({ start: 13 * 60, end: 15 * 60 });          // every Saturday 1–3 PM
  if (day === 0) list.push({ start: 10 * 60, end: 11 * 60 + 30 });     // every Sunday 10–11:30 AM
  if (dom % 7 === 0) list.push({ start: 15 * 60 + 30, end: 17 * 60 }); // a few extra busy days
  return list;
}

export { toKey };
