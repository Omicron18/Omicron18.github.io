const array = new BigUint64Array(10);
self.crypto.getRandomValues(array);

for (const num of array) {

    var s = document.createElement('pre');
    s.textContent = window.btoa(num).substr(2,18);
    s.style = "font-size: 50px;";
    document.body.appendChild(s);
}
