import crypto from "crypto";

export function randomId(length) {
    return crypto.randomBytes(length).toString("base64").replace(/[^a-zA-Z0-9]/g, '').slice(0, length);
}