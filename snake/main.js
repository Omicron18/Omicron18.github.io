
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

window.addEventListener("keydown", change_dir, false);

const size=30;
const scaling=10;

let snake=[{x:5,y:5}];

let e={key: 'j'};

let a_x=undefined;
let a_y=undefined;
let alive=true;

function isInSnake(x,y) {
    for (let i=0; i<snake.length; i++) {
        if (x==snake[i].x && y==snake[i].y) {
            return true;
        }
    }
    return false;
}

function draw_apple() {
    let new_a_x=0;
    let new_a_y=0;
    do {
        new_a_x=Math.floor(Math.random()*size);
        new_a_y=Math.floor(Math.random()*size);
    } while (isInSnake(new_a_x,new_a_y) || (new_a_x==a_x && new_a_y==a_y));
    a_x=new_a_x;
    a_y=new_a_y;

    ctx.fillStyle = 'green';
    ctx.fillRect(1+(a_x*scaling), 1+(a_y*scaling), scaling-1, scaling-1);

}

function die() {
    alive=false;
    var s = document.createElement('p');
    s.textContent="you lose!";
    document.body.appendChild(s);
}

function draw(i,j) {
    if (i<0 || i==size || j<0 || j==size) {
        die();
        return;
    }

    ctx.fillStyle = 'black';
    ctx.fillRect(1+(i*scaling), 1+(j*scaling), scaling-1, scaling-1);
}

function clear(i,j) {
    ctx.clearRect(1+(i*scaling), 1+(j*scaling), scaling-1, scaling-1);
}

function change_dir(x) {
    if (x.key==='ArrowUp') {
        e.key='k';
        return;
    }
    if (x.key==='ArrowDown') {
        e.key='j';
        return;
    }
    if (x.key==='ArrowLeft') {
        e.key='h';
        return;
    }
    if (x.key==='ArrowRight') {
        e.key='l';
        return;
    }
    if (x.key==='j' || x.key==='k' || x.key==='h' || x.key==='l') {
        e=x;
    }
}

function move() {
    let end=snake.length-1;
    let new_i=snake[0].x;
    let new_j=snake[0].y;
    if (e.key==='j') {
        new_j++;
    } else if (e.key==='k') {
        new_j--;
    } else if (e.key==='h') {
        new_i--;
    } else if (e.key==='l') {
        new_i++;
    }
    draw(new_i,new_j);

    if (new_i==a_x && new_j==a_y) {
        draw_apple();
        snake.unshift({x:new_i,y:new_j});
        for (let z=1; z<snake.length; z++) {
            draw(snake[z].x,snake[z].y);
        }
    } else if (isInSnake(new_i, new_j)) {
        die();
        return;
    } else {
        let tail_i=snake[snake.length-1].x;
        let tail_j=snake[snake.length-1].y;

        clear(tail_i,tail_j);

        for (let z=end; z>0; z--) {
            snake[z]=snake[z-1];
        }
        snake[0]={x:new_i,y:new_j};

    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function game() {
    ctx.strokeRect(0,0,(size)*scaling+1, (size)*scaling+1);
    draw();
    draw_apple();

    while(alive) {
        await sleep(250);
        move();
    }
}

game();
