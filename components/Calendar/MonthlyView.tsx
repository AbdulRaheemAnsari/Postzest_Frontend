'use client';

import CalendarDayCell from './CalendarDayCell';
import { getMonthDays } from './date-utils';

interface MonthlyViewProps {
  currentDate: Date;
  posts: any[];
  onPostClick: (post: any) => void;
}

export default function MonthlyView({
  currentDate,
  posts,
  onPostClick,
}: MonthlyViewProps) {
  const { days, firstDayOfMonth } = getMonthDays(currentDate);
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const previousMonthDays = getMonthDays(
    new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
  ).days;
  const prevMonthLastDays = previousMonthDays.slice(
    Math.max(previousMonthDays.length - firstDayOfMonth, 0)
  );

  // Create array with previous month's trailing days
  const displayDays = [...prevMonthLastDays, ...days];
  const totalCells = Math.ceil(displayDays.length / 7) * 7;
  const nextMonthDays = totalCells - displayDays.length;

  const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
  const { days: nextMonthAllDays } = getMonthDays(nextMonth);

  const allDays = [
    ...displayDays,
    ...nextMonthAllDays.slice(0, nextMonthDays),
  ];

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      {/* Header */}
      <div className="grid grid-cols-7 bg-background">
        {dayNames.map((day) => (
          <div
            key={day}
            className="p-4 text-center font-semibold text-foreground border-b border-r border-border last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7">
        {allDays.map((date, index) => {
          const isCurrentMonth =
            date.getMonth() === currentDate.getMonth();

          return (
            <div
              key={index}
              className={`border-r border-b border-border last:border-r-0 ${
                !isCurrentMonth ? 'bg-muted/30' : ''
              }`}
            >
              <CalendarDayCell
                date={date}
                posts={posts.filter(
                  (post) =>
                    new Date(post.scheduledDate).toDateString() ===
                    date.toDateString()
                )}
                onPostClick={onPostClick}
                isCurrentDay={
                  new Date().toDateString() === date.toDateString()
                }
                isOtherMonth={!isCurrentMonth}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}