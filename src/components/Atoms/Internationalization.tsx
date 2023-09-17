import { getLanguage } from '../../lib/localization';
import { RA } from '../../lib/types';
import { DAY, MONTH, WEEK, YEAR } from './timeUnits';

// Localized month names
export const months = getMonthNames('long');

function getMonthNames(format: 'long' | 'short'): RA<string> {
  const months = new Intl.DateTimeFormat(getLanguage(), { month: format });
  return Array.from({ length: YEAR / MONTH }, (_, month) =>
    months.format(new Date(0, month, 2, 0, 0, 0)),
  );
}

// Localized week day names
export const weekDays = getWeekDays('long');

function getWeekDays(format: 'long' | 'short'): RA<string> {
  const weekDays = new Intl.DateTimeFormat(getLanguage(), { weekday: format });
  return Array.from({ length: WEEK / DAY }, (_, weekDay) =>
    weekDays.format(new Date(2017, 0, 1 + weekDay, 0, 0, 0)),
  );
}

const locale = new Intl.Locale(navigator.language);

/* This is an incomplete definition. For complete, see MDN Docs */
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Intl {
  class Locale {
    public constructor(locales?: RA<string> | string);

    public weekInfo: {
      readonly firstDay: 1 | 7;
    };
  }

  class DateTimeFormat {
    public constructor(
      locales?: RA<string> | string,
      options?: {
        readonly dateStyle?: 'full' | 'long' | 'medium' | 'short';
        readonly timeStyle?: 'full' | 'long' | 'medium' | 'short';
        readonly month?: 'long' | 'short';
        readonly weekday?: 'long' | 'short';
      },
    );

    public format(value: Readonly<Date>): string;
  }
}

export function getFirstDayOfWeek(originalDate: Date): Date {
  const date = new Date(originalDate);
  const day = date.getDay();
  const difference =
    date.getDate() - day + (locale.weekInfo.firstDay ? 0 : day == 0 ? -6 : 1);
  return new Date(date.setDate(difference));
}
