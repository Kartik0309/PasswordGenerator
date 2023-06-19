const passDisplay=document.querySelector("[data-passwordDisplay]");
const passDisplaybtn=document.querySelector("[passwordCopy]");
const passLenNumber=document.querySelector("[data-lengthNumber]");
const slidervalue=document.querySelector("[data-lengthSlider]");
const checkUpper=document.querySelector('#uppercase');
const checkLower=document.querySelector('#lowercase');
const checkNum=document.querySelector('#numbers');
const checkSymbols=document.querySelector('#symbols');
const circle=document.querySelector("[strengthFig]");
const passCopy=document.querySelector("[passwordCopy]");
const dataCopyMessage=document.querySelector("[data-copyMsg]");
const btnCopy=document.querySelector("[passwordCopy]");
const btnGen=document.querySelector("[btnGenerate]");
const rndString='~!%@#${}=][<>&';


let password="";
let passwordLength=10;
handleSlider();
setIndicator('#ccc');

function handleSlider()
{
    slidervalue.value=passwordLength;
    passLenNumber.textContent=passwordLength;
}

function setIndicator(color)
{
    circle.style.backgroundColor=color;
}
function generateRandomInteger(min,max)
{
    let val=Math.round(Math.random()*(max-min))+min;
    return val;
}

function generateRandomNumber(){
    return generateRandomInteger(0,9);
}

function generateLower(){
    return String.fromCharCode(generateRandomInteger(97,123));
}

function generateUpper(){
    return String.fromCharCode(generateRandomInteger(65,91));
}

function generateSymbol(){
    return rndString[generateRandomInteger(0,rndString.length)];
}

function calculateStrength(){
    let hasup=false;
    let haslow=false;
    let hassym=false;
    let hasnum=false;

    if(checkUpper.checked) hasup=true;
    if(checkLower.checked) haslow=true;
    if(checkNum.checked) hasnum=true;
    if(checkSymbols.checked) hassym=true;

    if(hasup && haslow && (hasnum || hassym) && passwordLength>=8)
    {
        setIndicator('#0f0');
    }
    else if((haslow || hasup) && (hasnum || hassym) && passwordLength>=6)
    {
        setIndicator('#ff0');
    }
    else{
        setIndicator('#f00');
    }

}

 async function passwordCopy(){

    try {
        await navigator.clipboard.writeText(passDisplay.value);
        dataCopyMessage.innerText = "copied";
    }
    catch(e) {
        dataCopyMessage.innerText = "Failed";
    }
    //to make copy wala span visible
    dataCopyMessage.classList.add("active");

    setTimeout( () => {
        dataCopyMessage.classList.remove("active");
    },2000);
}


slidervalue.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})

btnCopy.addEventListener('click',()=>{
    if(passDisplay.value) passwordCopy();
});


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


btnGen.addEventListener('click',()=>{
    let hasup=false;
    let haslow=false;
    let hassym=false;
    let hasnum=false;

    let arr=[];
    if(checkUpper.checked)
    {
        hasup=true;
        arr.push("hasup");
    }
    if(checkLower.checked)
    {
        haslow=true;
        arr.push("haslow");
    }
    if(checkNum.checked)
    {
        hasnum=true;
        arr.push("hasnum");
    }
    if(checkSymbols.checked)
    {
        hassym=true;
        arr.push("hassym");
    }
    if(hasup || haslow || hasnum || hassym)
    {
        let newpassword="";
        let k=0;
        let cnt=0;
        if(hasup)
        {
            newpassword=newpassword+generateUpper();
            k++;
            cnt++;
        }
        if(haslow)
        {
            newpassword=newpassword+generateLower();
            k++;
            cnt++;
        }
        if(hasnum)
        {
            newpassword=newpassword+generateRandomNumber();
            k++;
            cnt++;
        }
        if(hassym)
        {
            newpassword=newpassword+generateSymbol();
            k++;
            cnt++;
        }
        if(passwordLength<cnt)
        {
            passwordLength=cnt;
            handleSlider();
        }
        else
        {
            while(k<passwordLength)
            {
                let idx=generateRandomInteger(0,arr.length);
                if(arr[idx]==="hasup")
                {
                    newpassword=newpassword+generateUpper();
                    k++;
                }
                else if(arr[idx]==="haslow")
                {
                    newpassword=newpassword+generateLower();
                    k++;
                }
                else if(arr[idx]==="hasnum")
                {
                    newpassword=newpassword+generateRandomNumber();
                    k++;
                }
                else if(arr[idx]==="hassym")
                {
                    newpassword=newpassword+generateSymbol();
                    k++;
                }
            }
        }
        let shuffled_pass=shuffle(newpassword);
        passDisplay.value=shuffled_pass;
        calculateStrength();
    }
    else
    {
        console.log(new Error("Select atleast one checkbox"));
    }


})






