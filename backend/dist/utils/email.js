"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
function sendEmail(to, subject, body) {
    // In real app, integrate with email provider
    console.log(`Email to ${to}: ${subject}\n${body}`);
}
