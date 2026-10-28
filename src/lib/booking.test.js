import { describe, it, expect } from 'vitest';
import { monthGrid, isWeekend, slotsForDay, clashes, fmtTime } from './booking.js';

const NOW = new Date(2026, 9, 27, 12, 0); // Oct 27 2026

describe('monthGrid', () => {
  it('starts November 2026 on a Sunday', () => {
    const weeks = monthGrid(2026, 10);
    expect(weeks[0][0].getDate()).toBe(1);
    expect(weeks.flat().filter(Boolean)).toHaveLength(30);
  });
});

describe('slotsForDay', () => {
  it('has no slots on weekdays', () => {
    expect(isWeekend(new Date(2026, 10, 12))).toBe(false);
    expect(slotsForDay(new Date(2026, 10, 12), 60, [], NOW)).toEqual([]);
  });
  it('never runs past closing time', () => {
    const slots = slotsForDay(new Date(2026, 10, 14), 120, [], NOW);
    expect(slots.at(-1).end).toBeLessThanOrEqual(18 * 60);
  });
  it('blocks slots that clash with an existing booking plus travel buffer', () => {
    const booked = [{ start: 13 * 60, end: 15 * 60 }];
    const slots = slotsForDay(new Date(2026, 10, 14), 60, booked, NOW);
    const at = (m) => slots.find((s) => s.start === m);
    expect(at(11 * 60 + 30).available).toBe(true);  // ends 12:30, +30 buffer = 1:00 PM
    expect(at(12 * 60).available).toBe(false);      // ends 1:00, buffer overlaps
    expect(at(15 * 60 + 30).available).toBe(true);  // starts 3:30 = 3:00 + buffer
    expect(at(15 * 60).available).toBe(false);
  });
  it('blocks times that already passed today', () => {
    const sat = new Date(2026, 10, 14, 12, 0);
    const slots = slotsForDay(new Date(2026, 10, 14), 60, [], sat);
    expect(slots.find((s) => s.start === 10 * 60).available).toBe(false);
    expect(slots.find((s) => s.start === 14 * 60).available).toBe(true);
  });
});

describe('helpers', () => {
  it('formats times', () => {
    expect(fmtTime(10 * 60)).toBe('10:00 AM');
    expect(fmtTime(12 * 60 + 30)).toBe('12:30 PM');
    expect(fmtTime(18 * 60)).toBe('6:00 PM');
  });
  it('detects clashes', () => {
    expect(clashes(0, 11, [{ start: 40, end: 60 }])).toBe(true);  // 11 + 30 buffer overlaps 40
    expect(clashes(0, 10, [{ start: 40, end: 60 }])).toBe(false); // 10 + 30 buffer = 40, touching is fine
  });
});
