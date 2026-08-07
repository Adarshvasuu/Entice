// ----------------------------------------------------------------------
// Google Sheets connection settings
// ----------------------------------------------------------------------
// Both the Contact page form and the "Request a Proposal" popup send
// their leads to this same URL, so every submission lands as a new row
// in one Google Sheet.
//
// This works via a small Google Apps Script "Web App" that sits in
// front of your Sheet (Google Sheets has no direct public submit URL
// like Google Forms does, so this script is what makes it possible).
//
// TO ACTIVATE: replace the placeholder URL below with your own.
// See README-GOOGLE-SHEETS.md in the project root for exact,
// copy-paste steps (takes about 5 minutes, no coding required).
// ----------------------------------------------------------------------

/**
 * The Apps Script Web App URL you get after deploying the script from
 * README-GOOGLE-SHEETS.md. It always looks like:
 *   https://script.google.com/macros/s/AKfycb.../exec
 */
export const GOOGLE_SHEET_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbx2UIJVjbXXZ3kvX17xRks160nCReUeQPANG3eLcLshkiSb4S9mKiSIHjHT7f0hrj0Amg/exec';
