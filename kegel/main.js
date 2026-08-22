
let ticking = false;
let lock = 0;


window.addEventListener("keydown", toggle_ticking, false);
window.addEventListener("pointerdown", toggle_ticking, false);

async function toggle_ticking() {
    ticking = !ticking;
    if (ticking && lock==0) {
        lock=1;
        await main();
        lock =0;
    }
}

console.log("hello")

let ticker = document.getElementById("ticker")
let relax = document.getElementById("relax")
let count = document.getElementById("count")
let holder = document.getElementById("holder")

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {

    while(ticking) {
        for (i=1; i<=10; i++) {
            count.innerText=i;
            for (j=0; j<2; j++) {
                if (j==0) {
                    relax.innerText="TENSE";
                    holder.style.backgroundColor="black";
                    holder.style.color="white";
                } else {
                    relax.innerText="RELAX";
                    holder.style.backgroundColor="white";
                    holder.style.color="black";
                }
                for (c=1; c<=10; c++) {
                    ticker.innerText=c;
                    await sleep(1000);
                }
            }
        }
        ticking = false;
        relax.innerText="";
        count.innerText="";
        ticker.innerText="0";
    }
}

main();
