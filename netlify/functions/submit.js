export async function handler(event, context) {
  try {
    const googleScriptURL =
      "https://script.google.com/macros/s/AKfycbzZquFwADOyqGzCuehqfpY7kwenQv84xDkbSxw_3l6rFwPGX7OwaCkjO4BwEL_89g7Mog/exec";

    const response = await fetch(googleScriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: event.body,
    });

    let text = await response.text();

    // لو فاضي أو مش JSON، رجع رد بديل واضح
    if (!text || text.trim() === "") {
      return {
        statusCode: 502,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
          status: "error",
          message: "No response from Google Script",
        }),
      };
    }

    // نحاول نحوله لـ JSON، ولو فشل نرجعه كنص
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { status: "error", message: "Invalid JSON: " + text };
    }

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ status: "error", message: err.message }),
    };
  }
}
