'use client';

import { useState } from 'react';
import { getWeekDays } from './date-utils';
import CalendarDayCell from './CalendarDayCell';

interface WeeklyViewProps {
  currentDate: Date;
  posts: any[];
  onPostClick: (post: any) => void;
}

export default function WeeklyView({
  currentDate,
  posts,
  onPostClick,
}: WeeklyViewProps) {
  const weekDays = getWeekDays(currentDate);
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

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
        {weekDays.map((date, index) => (
          <CalendarDayCell
            key={index}
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
          />
        ))}
      </div>
    </div>
  );
}