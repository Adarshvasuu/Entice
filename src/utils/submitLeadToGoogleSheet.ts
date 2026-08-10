import { LeadFormData } from '../types';
import { GOOGLE_SHEET_WEB_APP_URL } from '../config/googleSheet';

/**
 * Sends lead form data to the Google Apps Script Web App, which appends
 * it as a new row in the connected Google Sheet.
 *
 * The Apps Script web app doesn't return CORS headers for browser
 * requests, so this fires in "no-cors" mode. That means we can't read
 * a real success/failure status from Google's side, but the row still
 * gets added to the Sheet. We only treat it as failed if the request
 * couldn't be sent at all (e.g. the visitor is offline).
 */
export async function submitLeadToGoogleSheet(data: LeadFormData): Promise<void> {
  const body = new URLSearchParams({
    fullName: data.fullName,
    companyName: data.companyName,
    email: data.email,
    phone: data.phone,
    companySize: data.companySize,
    serviceNeeded: data.serviceNeeded,
    message: data.message,
    submittedAt: new Date().toISOString(),
  });

  await fetch(GOOGLE_SHEET_WEB_APP_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
}
