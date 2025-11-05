'use client';

import MonthlyView from "./MonthlyView";
import WeeklyView from "./WeeklyView";


interface CalendarViewProps {
  currentDate: Date;
  viewType: 'monthly' | 'weekly';
  posts: any[];
  onPostClick: (post: any) => void;
}

export default function CalendarView({
  currentDate,
  viewType,
  posts,
  onPostClick,
}: CalendarViewProps) {
  return (
    <>
      {viewType === 'weekly' ? (
        <WeeklyView
          currentDate={currentDate}
          posts={posts}
          onPostClick={onPostClick}
        />
      ) : (
        <MonthlyView
          currentDate={currentDate}
          posts={posts}
          onPostClick={onPostClick}
        />
      )}
    </>
  );
}