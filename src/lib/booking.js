export const OPEN = 10 * 60;        // 10:00 AM, in minutes since midnight
export const CLOSE = 18 * 60;       // 6:00 PM
export const SLOT_STEP = 30;        // slots start every 30 minutes
export const TRAVEL_BUFFER = 30;    // minutes kept free before/after for travel

export const isWeekend = (d) => d.getDay() === 0 || d.getDay() === 6;

export const toKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function fmtTime(mins) {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h}:${String(m).padStart(2, '0')} ${h24 < 12 ? 'AM' : 'PM'}`;
}

// Weeks (Sunday first) of Date | null for a month. `month` is 0-based.
export function monthGrid(year, month) {
  const first = new Date(year, month, 1);
  const days = new Date(year, month + 1, 0).getDate();
  const cells = Array(first.getDay()).fill(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
export const isPastDay = (d, now = new Date()) => startOfDay(d) < startOfDay(now);

// Two appointments clash if they overlap once the travel buffer is added around each.
export function clashes(start, end, bookings) {
  return bookings.some((b) => start < b.end + TRAVEL_BUFFER && end + TRAVEL_BUFFER > b.start);
}

// Every possible start time for a look of `duration` minutes on `date`,
// each marked available or not. Non-weekend days have no slots.
export function slotsForDay(date, duration, bookings = [], now = new Date()) {
  if (!isWeekend(date)) return [];
  const sameDay = toKey(date) === toKey(now);
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const slots = [];
  for (let start = OPEN; start + duration <= CLOSE; start += SLOT_STEP) {
    const end = start + duration;
    let available = true;
    let reason = '';
    if (isPastDay(date, now) || (sameDay && start <= nowMins)) { available = false; reason = 'past'; }
    else if (clashes(start, end, bookings)) { available = false; reason = 'booked'; }
    slots.push({ start, end, label: fmtTime(start), available, reason });
  }
  return slots;
}
