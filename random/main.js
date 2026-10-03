const array = new BigUint64Array(10);
self.crypto.getRandomValues(array);

for (const num of array) {

    var s = document.createElement('pre');
    s.textContent = window.btoa(num).substr(2,18);
    document.body.appendChild(s);
}
