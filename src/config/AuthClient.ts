import { google } from "googleapis";


export const authClient =  new google.auth.JWT(
    process.env.CLIENT_EMAIL!,
    undefined,
    process.env.PRIVATE_KEY!.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/documents"]
);
