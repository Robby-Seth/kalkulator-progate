let firstNum = null;
let waitInput = false;
let tempOperator = null;
let clearDisplay=true;
const display = document.querySelector(".display-text");
document.querySelectorAll('.keypad p').forEach(element=>{
    element.addEventListener('click',()=>{
        const content = parseInt(element.innerText);
        if (isNaN(content)){
            
            processOperator(element.innerText);
        }
        else{
            processNum(content);
        }
    })
})

function processNum(int){
    if(clearDisplay){display.innerText='';clearDisplay=false;}
    display.innerText += int;
    console.log(`This is number ${int}`);
    if(waitInput){waitInput=false};
}

function processOperator(ops){
        switch (ops) {
            case 'AC':
                display.innerText=0;
                firstNum = null;
                tempOperator = null;
                clearDisplay = true;
                waitInput = true;
                break;
            case '.':
                if(display.innerText.indexOf('.')===-1){
                    display.innerText +='.'
                    clearDisplay=false;
                }
                break;
            case '%':
                if(firstNum!==null){
                    const num = convertNumDisplay()*firstNum/100;
                    display.innerText = num;
                }
                break;
            case '=':
                if (firstNum!==null){display.innerText = getResult();}
                firstNum = null;
                tempOperator = null;
                clearDisplay = true;
                waitInput = true;
                break;
            default:
                console.log(firstNum);
                    if(waitInput===false && isFirstNumber()){
                        tempOperator = ops;
                        waitInput = true;
                    }
                    else{
                        //mengecek apakah pengguna sudah memasukkan lagi angka
                        //setelah  mengklik salah satu operator
                        if(!waitInput&&firstNum !== null){display.innerText = getResult();waitInput = true;}
                        tempOperator = ops;
                    }
                    clearDisplay = true;
                break;
    }
    console.log(`This is operator ${ops}`);
}

function getResult(){
    switch (tempOperator) {
        case '+':
            firstNum = firstNum + convertNumDisplay();
            return firstNum;
            break;
        case '-':
            firstNum = firstNum - convertNumDisplay();
            return firstNum;
            break;
        case 'x':
            firstNum = firstNum * convertNumDisplay();
            return firstNum;
            break;
        case '÷':
            firstNum = firstNum / convertNumDisplay();
            return firstNum;
            break;
        default:
            console.log("NoT recognized");
            break;
    }
}

function isFirstNumber(){
    if (firstNum !== null){
        return false;
    }
    firstNum = convertNumDisplay();
    return true;
}

function convertNumDisplay(){
    let numNow;
    if(display.innerText.indexOf('.')>-1){
        numNow = parseFloat(display.innerText);
    }
    else{
        numNow = parseInt(display.innerText);
    }
    return numNow;
}
