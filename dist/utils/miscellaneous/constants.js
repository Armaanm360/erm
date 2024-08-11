"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP_FOR_CREDENTIALS = exports.OTP_FOR = exports.OTP_EMAIL_SUBJECT = exports.OTP_TYPE_VERIFY_EMPLOYEE = exports.OTP_TYPE_FORGET_SERVICE_CENTER = exports.OTP_TYPE_FORGET_UPC_USER = exports.OTP_TYPE_FORGET_ADMIN = exports.OTP_TYPE_FORGET_EMPLOYEE = exports.allStrings = exports.origin = void 0;
exports.origin = ['http://localhost:3000'];
exports.allStrings = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
];
// OTP types constants
exports.OTP_TYPE_FORGET_EMPLOYEE = 'forget_employee';
exports.OTP_TYPE_FORGET_ADMIN = 'forget_admin';
exports.OTP_TYPE_FORGET_UPC_USER = 'forget_upc_user';
exports.OTP_TYPE_FORGET_SERVICE_CENTER = 'forget_service_center';
exports.OTP_TYPE_VERIFY_EMPLOYEE = 'verify_employee';
// Send OTP Email subject
exports.OTP_EMAIL_SUBJECT = 'Your One Time Password For CRM360';
// OTP for
exports.OTP_FOR = 'Verification';
// send credentials subject
exports.OTP_FOR_CREDENTIALS = 'Credential';
