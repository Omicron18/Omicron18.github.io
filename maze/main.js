
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//window.addEventListener("keydown", change_dir, false);

var size;
const max_size=90;
const scaling=10;
const dir_vec_x = [-1, 0, 1, 0];
const dir_vec_y = [0, -1, 0, 1];
var live_paths;
var visited_x;
var visited_y;
let alive=false;
var a_x;
var a_y;
var walls_x = [];
var walls_y = [];
var selectedValue;

function draw(i,j,c) {
    ctx.fillStyle = c;
    ctx.fillRect(1+(i*scaling), 1+(j*scaling), scaling-1, scaling-1);
}

function clear(i,j) {
    ctx.clearRect(1+(i*scaling), 1+(j*scaling), scaling-1, scaling-1);
}

function extend(path) {
    let end = path[path.length-1]

    clear(end.x,end.y);
    let exts = [];
    for (let i=0; i<dir_vec_x.length; i++) {
        let ext_x = end.x+dir_vec_x[i];
        let ext_y = end.y+dir_vec_y[i];
        let ext = {x: ext_x, y: ext_y};
        if (ext_x<0 || ext_x>=size || ext_y<0 || ext_y>=size) {
            continue;
        }
        let cont = false;
        for (let i=0; i<visited_x.length; i++) {
            if (visited_x[i]==ext_x && visited_y[i]==ext_y) {
                cont = true;
                break;
            }
        }
        if (cont) {
            continue;
        }
        cont = false;
        for (let i=0; i<walls_x.length; i++) {
            if (walls_x[i]==ext_x && walls_y[i]==ext_y) {
                cont = true;
                break;
            }
        }
        if (cont) {
            continue;
        }

        exts.push(path.concat(ext));
        visited_x.push(ext_x);
        visited_y.push(ext_y);
        draw(ext.x, ext.y,'orange');
        if (ext_x==a_x && ext_y == a_y) {
            draw(ext.x, ext.y,'magenta');
            alive=false;
            return [];
        }
    }
    return exts;
}

async function move_dfs() {
    await sleep(25);
    if (live_paths.length>0) {
        p = live_paths.pop()
        s = extend(p);
        for (const ext of s) {
            live_paths.push(ext);
        }
    }
}


function move_bfs() {
    next_live_paths = []
    for (const p of live_paths) {
        s = extend(p);
        for (const ext of s) {
            next_live_paths.push(ext);
        }
    }
    live_paths = next_live_paths;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function reset() {
    selectedValue = document.querySelector('input[name="radio"]:checked')?.value;
    wallDensity = document.querySelector('input[id="wall-density"]').value;
    size = document.querySelector('input[id="size"]').value;

    ctx.clearRect(0,0,((max_size)*scaling+1)+1, ((max_size)*scaling+1)+1);
    ctx.strokeRect(0,0,(size*(scaling))+1, (size*(scaling))+1);

    let s_x=Math.floor(Math.random()*size);
    let s_y=Math.floor(Math.random()*size);

    walls_x=[];
    walls_y=[];
    for (let i=0; i<wallDensity*(size**2)/100; i++) {
        let w_x=Math.floor(Math.random()*size);
        let w_y=Math.floor(Math.random()*size);

        draw(w_x,w_y,'black');
        walls_x.push(w_x);
        walls_y.push(w_y);
    }



    live_paths=[[{x:s_x,y:s_y}]];
    visited_x = [s_x];
    visited_y = [s_y];

    while (true) {

        a_x=Math.floor(Math.random()*size);
        a_y=Math.floor(Math.random()*size);

        cont = false;
        for (let i=0; i<walls_x.length; i++) {
            if (walls_x[i]==a_x && walls_y[i]==a_y) {
                cont = true;
                break;
            }
        }
        if (!cont) {
            break;
        }
    }
    draw(a_x,a_y,'green');
    draw(s_x,s_y,'black');

    alive=true;

}

async function game() {

    while(true) {
        await sleep(10);
        while(alive) {
            if (selectedValue=='bfs') {
                await sleep(200);
                move_bfs();
            } else {
                await sleep(20);
                move_dfs();
            }
        }
    }
}

//game();
//

const button = document.querySelector("button")
button.addEventListener("click", () => reset());
document.querySelector('input[id="wall-density"]').value=25;
game();
