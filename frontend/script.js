const API_URL = "https://your-backend-url.onrender.com/api/url/shorten";

async function shortenUrl() {
  const longUrl = document.getElementById("longUrl").value;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ longUrl }),
  });

  const data = await response.json();

  document.getElementById("result").innerHTML =
    `<a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
}