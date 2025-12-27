async function shortenUrl() {
  const url = document.getElementById("urlInput").value;

  const res = await fetch("http://localhost:5000/shorten", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ originalUrl: url })
  });

  const data = await res.json();
  document.getElementById("result").innerHTML =
    `<a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
}
