export function getWeekDays(date: Date): Date[] {
  const curr = new Date(date);
  const first = curr.getDate() - curr.getDay();
  const days: Date[] = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(curr.setDate(first + i));
    days.push(new Date(day));
  }

  return days;
}

export function getMonthDays(date: Date): { days: Date[]; firstDayOfMonth: number } {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayOfMonth = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const days: Date[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  return { days, firstDayOfMonth };
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}