"use strict";
const Moment = require('moment-timezone');
const getDateNow = () => {
    return Moment().tz('Europe/Kiev').format();
};
const getDate = (date) => {
    return Moment(date).tz('Europe/Kiev').format();
};
const dateForSearch = (dateDo) => {
    let yearDo = String(dateDo.slice(0, 4));
    let monthDo = dateDo.slice(5, 7);
    let dayDo = dateDo.slice(8, 10);
    let hourDo = 25;
    let minuteDo = 59;
    return new Date(Number(yearDo), monthDo - 1, dayDo, hourDo, minuteDo).toISOString();
};
module.exports = { getDateNow, getDate, dateForSearch };
