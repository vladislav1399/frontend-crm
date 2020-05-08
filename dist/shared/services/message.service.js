"use strict";
const sendMessage = (status, message) => {
    return { status: status, message: message };
};
module.exports = { sendMessage };
