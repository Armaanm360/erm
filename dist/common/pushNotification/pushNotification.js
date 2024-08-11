"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const axios_1 = __importDefault(require("axios"));
class PushNotificationService {
    static generateFCMAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceAccountJson = {
                type: "service_account",
                project_id: "m360ict-335f7",
                private_key_id: "374270491a3bbd9bfd55d720aaa81dcb15ab51e8",
                private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCi1vii0Tb81AJE\nTAH/nosoenxg9EtAMX5JcMZyaG4i78awztyo/u2Kj90kh4taGzXH6/jkTwndTYFl\nJ1wu69Z36d1HJuZ0W4N3NHJJ1REKstWpnGFEGbpEZmwz82B22ig1HlP2JWDtj9AI\nwUm/H8SuIxj+PlTB1lIugjzzMrC8yvhboWeYkR7MPXAnaTmb1u7KCEYK5th1qTXY\n0dWw6N4h92B/HUTb4r6qJjjN5RryF+doandoppzDIghDBdpHZCMLUxgaZ5Deeo/v\nE8N86senGgEMY48Lq/Z4Bj23ntytDtzgUVAS/ylxKSqgirPOE+u52EUcxrLfuXgB\nE0sZdAVtAgMBAAECggEAKWev4PaBnNfrm6IX//84Mxqx9ZUobTIoglQCoaScHJYL\nV3nB8dagX9Mkz90HOeohSqxdpO/T+kly1V2kuumMpwD4GtdxUbTTQMQ9KzjaFHZU\njcQNl1tTWYERkkQYCyB9iMQlZTkr5DvlEdTUA5z4Ta7u8/a1ZnQwgVLsXIpPFjG9\njjx7Wesfkrz/4iirzs1XFsz0aONeiW/ft6hTcsBiFttmKTLMYDtPLdASIKB+E2JH\ngTDZwqEeze6zvsFlGhFvPOhg1+4EstkhNjiS/+st2tHylnl5yo+vGRIEJzXnISKb\niaM+1ybzpy16CKOtbVRGm6E/MVFvUIgo84LmK9KBoQKBgQDhXP8+C8KRMsdTDfS6\nxs6znlUd6asiG2/ADe4TAiUwfI+e5Q6dL6PIDBxgS11COgZl1q3DzVxPiwqd4GaA\nFp5iS+nyxBgA0CGf70svmzHnt+8naZhs7WHM9vpNkubjncWKXnrwPEQ0oK8A7azl\ny32igLM+2vptO/uLqhHdHeL+FwKBgQC4+g4LN+gX5Pl0AJ7tU7lcqKBtO4mEQikY\nw8LGkXSUVygj2dPSw5oKgoU86H9DdZL/fPYsXQ8KvrR0n/5LY6zoOVVFSU0Im3g2\n7BeVWVTeXgaico3s1zskk5ZdoNDS+cCWCWoXqOwyK4dLZvMYmECv+AKRtW/XfcYi\ne3KYKCsvGwKBgEopr3l8pz/fJQco/ZOFnzou7bXVUtL7km/yZZltyE1HgH/6wy9p\nIQ3RJnlt87e6nqZe2nooF6u5hvnjgfe++cpBTzDr5TZHR/l45xY4jVjDB/nBXz7h\nc6De2gozQLZBEmPxqaVrP8rN4il9Dbvllmem0NXrfCP8bFBO3GgW0L9rAoGBAJ21\ndKvT6qoUqypgLSAjNfLuQnlfPYvp7KgUn8g007R16t9GJPeZlYhIZ9jaUUbuw3nY\nzPpeDSkYFzsn/ePBA/aqiy0bpfYkt4X8HM9U7qr4d6ehC6hWiTJSMu144xI9phlF\nxZKOj3Lm8d8z0yexB9YAGhCpJMYRkhBsN/PKq6bpAoGBAN7Ep99yV0ZX3UxcG2Ez\nv/FwNNWIMkTBfQjGbDcM2Xurd5ygj4k5o5GHhVEY6cpXtGFHXGmHJE/L2C6lTl7G\nZ+TA4tyyHucyMmVMWp4dtYcot8AlJulVNqnTjlinGiOFYSU3C47xSR5jFjPVMFZo\nOlfZTDDBAAYKvnzBFDUFHwoY\n-----END PRIVATE KEY-----\n",
                client_email: "crm-employee-robi@m360ict-335f7.iam.gserviceaccount.com",
                client_id: "108520097675909255711",
                auth_uri: "https://accounts.google.com/o/oauth2/auth",
                token_uri: "https://oauth2.googleapis.com/token",
                auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
                client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/crm-employee-robi%40m360ict-335f7.iam.gserviceaccount.com",
                universe_domain: "googleapis.com",
            };
            const scopes = ["https://www.googleapis.com/auth/firebase.messaging"];
            const authClient = yield googleapis_1.google.auth.getClient({
                credentials: serviceAccountJson,
                scopes: scopes,
            });
            const accessTokenResponse = yield authClient.getAccessToken();
            return accessTokenResponse.token;
        });
    }
    static sendNotificationToSelectedDriver(accessToken, title, body, deviceToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "https://fcm.googleapis.com/v1/projects/m360ict-335f7/messages:send";
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            };
            const bodyData = {
                message: {
                    token: deviceToken,
                    notification: {
                        title: title,
                        body: body,
                    },
                },
            };
            try {
                const response = yield axios_1.default.post(url, bodyData, { headers: headers });
                console.log("sended push notification");
                return response.status === 200;
            }
            catch (error) {
                console.error("Error sending notification:", error);
                return false;
            }
        });
    }
}
exports.default = PushNotificationService;
