function randomString(chars = 18) {
  // 6 bits per base64 char -> bytes needed, rounded up
  const bytes = new Uint8Array(Math.ceil(chars * 6 / 8));
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes))
    // .replace(/\+/g, '-')   // optional: URL-safe alphabet
    // .replace(/\//g, '_')
    // .replace(/=+$/, '')
    .slice(0, chars);
}

for (let i=0; i<10; i++) {

    var s = document.createElement('pre');
    s.textContent = randomString(18);
    s.style = "font-size: 50px;";
    document.body.appendChild(s);
}
