"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const multer = require('multer');
const moment = require('moment');
// @ts-ignore
const storage = multer.diskStorage({
    // @ts-ignore
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    // @ts-ignore
    filename(req, file, cb) {
        // @ts-ignore
        const date = moment().format('DDMMYYYY-HHmmss_SSS');
        cb(null, `${date}-${file.originalname}`);
    }
});
// @ts-ignore
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const limits = {
    fileSize: 1024 * 1024 * 5
};
exports.default = multer({ storage, fileFilter, limits });
