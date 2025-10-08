// netlify/functions/submit.js

export async function handler(event, context) {
  try {
    // ده لينك Google Apps Script بتاعك
    const googleScriptURL = "https://script.google.com/macros/s/AKfycbzZquFwADOyqGzCuehqfpY7kwenQv84xDkbSxw_3l6rFwPGX7OwaCkjO4BwEL_89g7Mog/exec";

    const response = await fetch(googleScriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: event.body,
    });

    const text = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: text,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: "error", message: err.message }),
    };
  }
}
