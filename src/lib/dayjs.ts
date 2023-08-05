import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import calendar from "dayjs/plugin/calendar";
dayjs.extend(calendar);

import "dayjs/locale/ru";
dayjs.locale("ru");

export default dayjs;
