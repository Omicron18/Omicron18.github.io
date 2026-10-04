function timeUpdateHandler(event) {
    console.log(aud.currentTime);
    localStorage.updateItem(aud.src, aud.currentTime);
}

function clickHandler(event) {
    if (/time-control/.test(event.target.className)) {
        var txt = event.target.innerText;
        console.log(txt);
        var sgn = (txt[0]=='-') ? -1 : 1;
        var unit = txt.slice(-1);
        var conv = null;
        switch (unit) {
         case "m":
            conv = 60;
            break;
        case "s":
            conv = 1;
            break;
        default:
            console.log("bad unit?");

        }
        var value = txt.slice(1, -1);
        var extra = (sgn * Number.parseInt(value) * conv);

        aud.currentTime += extra;
    }

}

function entered(event) {
    var url=input.value;
    aud.src = url;
    caption.innerText = url;
    if (!localStorage.getItem(url)) {
        localStorage.setItem(url, 0);
        updateList();
    }
}

function updateList() {
    for (let i=0; i<localStorage.length; i++) {
        var s = document.createElement('pre');
        s.textContent = localStorage.key(i);
        url_list.appendChild(s);
    }
}

const aud = document.getElementById("audio-elt");
const input = document.getElementById('input');
input.addEventListener('change', entered);

const url_list = document.createElement('p');
document.body.appendChild(url_list)
updateList();
aud.addEventListener("timeupdate", timeUpdateHandler, false);
document.addEventListener("pointerdown", clickHandler, false)
aud.src="https://audiofiles.novara.io/acfm/2026/260913_ACFM_Trip_63_Situationism.mp3";
caption = document.getElementById("audio-file-caption");
caption.innerText = aud.src;

