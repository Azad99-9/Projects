let bindex = 0;
let bodyparts = [];
let moveTracker = [];
let offsetTracker = [];

class score{

    constructor(){
        this.sc = 0;
        this.newb = document.getElementById("score");
    }

    update(){
        this.sc++;
        this.newb.innerHTML = "0".repeat((6-String(this.sc).length))+String(this.sc);
        
    }

}

let sc1 = new score();

class body{

    constructor(l,t){

        this.index = bindex;
        this.id = bindex+1;
        this.lgap = l;
        this.tgap = t;
        this.prev = 0;
        this.newb = document.createElement("div");
        this.newb.setAttribute("id",this.id);
        this.newb.style.position = "absolute";
        this.newb.style.backgroundColor = "white";
        this.newb.style.borderStyle = "solid";
        this.newb.style.borderColor = "red";
        this.newb.style.height = 3+"%";
        this.newb.style.width =1+"%";

        this.newb.style.top = this.tgap+"%";
        this.newb.style.left = this.lgap+"%";

        document.body.children[1].appendChild(this.newb);
        bodyparts.push(this);
        moveTracker.push([this.lgap,this.tgap]);
        offsetTracker.push([this.newb.offsetLeft,this.newb.offsetTop]);
        bindex++;
                

    }

    makehead(bgcol,bcol){

        this.newb.style.backgroundColor = bgcol;
        this.newb.style.borderColor = bcol;

    }

    samepos(obj){

        if(this.newb.offsetTop == obj.newb.offsetTop && this.newb.offsetLeft == obj.newb.offsetLeft){
            return true;
        }
        return false;

    }

    addTail(){

        let lastIndex = prvTracker.length-1;
        let prevmove = prvTracker[lastIndex];

        switch(prevmove){

            case 0:
                new body(moveTracker[lastIndex][0],moveTracker[lastIndex][1]);
                break;
            case 1:
                new body(moveTracker[lastIndex][0],moveTracker[lastIndex][1]);
                break;
            case 2:
                new body(moveTracker[lastIndex][0],moveTracker[lastIndex][1]);
                break;
            case 3:
                new body(moveTracker[lastIndex][0],moveTracker[lastIndex][1]);
                break;                
        }

    }


}   

class food{

    constructor(){

        this.lgap = 0;
        this.tgap = 0;
        this.newb = document.getElementById("food");

    }

    changeposition(){

        let x = Math.random()*100;
        let y = Math.random()*100;
        x = x-(x%1.5);
        y = y-(y%4.3);
        if(x>98){
            x-=1.5;
        }
        if(y>98){
            y-=4.3;
        }
        this.lgap = x;
        this.tgap = y;
        this.newb.style.left = this.lgap+"%";
        this.newb.style.top = this.tgap+"%";

    }

}

let head = new body(3,0); 
head.makehead("black","white")//head
new body(1.5,0);
new body(0,0);
moveTracker = [[3,0],[1.5,0],[0,0]];
let prvTracker = [0,0,0];
let f1 = new food();
f1.changeposition();

let mov = event => {

    if(bodyparts[0].lgap < 100.5 && bodyparts[0].tgap < 96
        && bodyparts[0].tgap > -1 && bodyparts[0].lgap > -1 && !offsetTracker.includes(head.newb.offsetLeft,head.newb.offsetTop)){
        switch(event.key){
            case("ArrowRight"):
            if(head.prev != 1){
                head.lgap += 1.5;
                head.prev = 0;
            }
            break;
            case("ArrowLeft"):
            if(head.prev != 0){
                head.lgap -= 1.5;
                head.prev = 1;
            }
            break;
            case("ArrowDown"):
            if(head.prev != 2){
                head.tgap += 4.3;
                head.prev = 3;
            }
            break;
            case("ArrowUp"):
            if(head.prev != 3){
                head.tgap -= 4.3;
                head.prev = 2;
            }
            break;
        }
        let temp = [head.lgap,head.tgap];
        prvTracker.unshift(head.prev);
        prvTracker.pop();
        moveTracker.unshift(temp);
        moveTracker.pop();
        bodyparts.forEach(el => {
            el.newb.style.left = moveTracker[el.index][0]+"%";
            el.newb.style.top = moveTracker[el.index][1]+"%";
        })
        bodyparts.slice(1).forEach(el => {

            if(el.samepos(head)){
                bodyparts.forEach(el => {

                    el.newb.style.backgroundColor = "red";
        
                })
                clearInterval(timer);
            }

        })
        foodcheck();
    }
    else{
        bodyparts.forEach(el => {

            el.newb.style.backgroundColor = "red";

        })
        clearInterval(timer);
        removeEventListener("keydown",mov);
    }

}


let go = window.addEventListener("keydown",mov);

function movement(){

    if(bodyparts[0].lgap < 100.5 && bodyparts[0].tgap < 96
        && bodyparts[0].tgap > -1 && bodyparts[0].lgap > -1 && !offsetTracker.includes(head.newb.offsetLeft,head.newb.offsetTop)){
            switch(head.prev){
                case 0:
                    head.lgap += 1.5;
                break;
                case 1:
                    head.lgap -= 1.5;
                break;
                case 3:
                    head.tgap += 4.3;
                break;
                case 2:
                head.tgap -= 4.3;
                break;

            }
            let temp = [head.lgap,head.tgap];
            prvTracker.unshift(head.prev);
            prvTracker.pop();
            offsetTracker.unshift([head.newb.offsetLeft,head.newb.offsetTop]);
            offsetTracker.pop();
            moveTracker.unshift(temp);
            moveTracker.pop();
            bodyparts.forEach(el => {
                el.newb.style.left = moveTracker[el.index][0]+"%";
                el.newb.style.top = moveTracker[el.index][1]+"%";
            })
            bodyparts.slice(1).forEach(el => {

                if(el.samepos(head)){
                    bodyparts.forEach(el => {

                        el.newb.style.backgroundColor = "red";
            
                    })
                    clearInterval(timer);
                    removeEventListener("keydown",mov);
                }
    
            })
            foodcheck();

        
    }
    else{
        bodyparts.forEach(el => {

            el.newb.style.backgroundColor = "red";


        })
        clearInterval(timer);
        removeEventListener("keydown",mov);
    }

}

function foodcheck(){

    let bool = head.samepos(f1);
    if(bool){

        f1.changeposition();
        sc1.update();
        bodyparts[bodyparts.length-1].addTail();


    }

}
setInterval(foodcheck,250);
const timer = setInterval(movement,100);
