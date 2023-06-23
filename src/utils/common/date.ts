import dayjs, { type Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function utc2Local(date: string): Dayjs {
  return dayjs(date).local();
}

export const formatDay = (date: string) => {
  const today = dayjs().startOf('day');
  const targetDate = dayjs(date).startOf('day');
  const diffInDays = targetDate.diff(today, 'day');
  const dayOfWeek = dayjs(date).day();
  if (diffInDays === 0) return '今天';
  if (diffInDays === -1) return '昨天';
  if (diffInDays < -1 && diffInDays > -5) return setDayName(dayOfWeek);
  return utc2Local(date).format('YYYY/MM/DD');
};

export const setDayName = (dayOfWeek: number) => {
  switch (dayOfWeek) {
    case 0:
      return '星期日';
    case 1:
      return '星期一';
    case 2:
      return '星期二';
    case 3:
      return '星期三';
    case 4:
      return '星期四';
    case 5:
      return '星期五';
    case 6:
      return '星期六';
    default:
      return '';
  }
};
