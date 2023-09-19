const hints = ["! سوق موطوك اودي", "لي يحبنا منحبوهش", "وين تجي؟", "الراس يطير"]
const answers = ["البدي", "القرش", "قشيحة", "فاردينيو"]
const images = ["bodi.png", "shark.png", "kashiha.png", "vardinio.png"]

const div1 = document.getElementById("n1")
const div2 = document.getElementById("n2")
const div3 = document.getElementById("n3")
const div4 = document.getElementById("n4")
const div5 = document.getElementById("n5")
const div6 = document.getElementById("n6")
const div7 = document.getElementById("n7")
const div8 = document.getElementById("n8")
const div9 = document.getElementById("n9")
const div10 = document.getElementById("n10")
const div11 = document.getElementById("n11")
const div12 = document.getElementById("n12")
const div13 = document.getElementById("n13")
const div14 = document.getElementById("n14")
const div15 = document.getElementById("n15")
const div16 = document.getElementById("n16")

let spaces = [div1, div2, div3, div4, div5, div6, div7, div8, div9, div10, div11, div12, div13, div14, div15, div16]; 
let pickedSpaces = []

let current = 0
let currentAnswer = answers[current] 
let currentHint = hints[current]


/* this function takes evry charecter from the currentAnswer and calls the place()
function to place it in a spicific square */
let i = 0
function set(){
    // show th hint
    document.getElementById('hint').innerHTML = currentHint
    document.getElementById('theImage').setAttribute("src", images[current])

    let length = currentAnswer.length
    while (i<length){
        place(currentAnswer[i]);
        i++ ;
    }
    if (i==length){
        i=0;
    }
    console.log(i)
    console.log(length)
}


/* this function takes a charecter and asign it to a random square */
function place(char) {

    let randomNumber = Math.floor(Math.random()*16) 
    let done = false
    while(done == false){
       if (pickedSpaces.length == 0){
            pickedSpaces.push(randomNumber);
            spaces[randomNumber].innerHTML = char;
            done = true;
       }else {
            if (unused(randomNumber) === true){
                pickedSpaces.push(randomNumber);
                spaces[randomNumber].innerHTML = char;
                done = true;
            }else{
                randomNumber = Math.floor(Math.random()*16) 
                continue;
            }
       }
    }
    function unused(RN){
        let g = pickedSpaces.find(check) 
        if (g == undefined){
            return true
        }else{
            return false
        }
        function check(index){
            return index == RN
        }
    }

}
set();

// this function fills the empty squares with a random char after the answer chars are placed
function fill(){
    let x = 0
    while(x<16){
        let isTaken = pickedSpaces.find(empty)
        const arabicLetters = "ابجدهوزحطيكلمنسعفصقرشتثخذضظغ"
        let chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        let Random = Math.floor(Math.random()*26)
        let randomChar = arabicLetters[Random]
        if (isTaken == undefined){
            pickedSpaces.push(x);
            spaces[x].innerHTML = randomChar;
            x++;
        }else{
            x++
        }
        function empty(i){
            return i == x
        }
    }
}

fill();

// this function sets answer squares equal to its char length

function creationCall(){
    let answerBox = document.getElementById("theAnswerBox")
    let createDiv = document.createElement('div')
    answerBox.appendChild(createDiv);
    answerBox.lastChild.setAttribute("class", "answerSquares");
   // answerBox.lastChild.setAttribute("onclick", "transferValue(this)")
}

function setAnswerSpaces(){
    for (let i = 0; i < currentAnswer.length ; i++) {
        creationCall();
    }
}
setAnswerSpaces();

// transfaring the value of the clicked div to the first empty div

function transferValue(clickedDiv) {
    const resultDivs = document.querySelectorAll('.answerSquares');
    
    for (const resultDiv of resultDivs) {
      if (resultDiv.innerText === '') {
        resultDiv.innerText = clickedDiv.innerText;
        clickedDiv.removeAttribute('onclick');
        clickedDiv.style.opacity= "0"
        clickedDiv.style.cursor= "default"
        return;
      }
    }
  }

function resetResults() {
    const resultDivs = document.querySelectorAll('.answerSquares');
    const charSpaces = document.querySelectorAll('.charSpace')
    for (const resultDiv of resultDivs) {
      resultDiv.innerText = '';
    }
    for (const space of charSpaces) {
        space.setAttribute('onclick', 'transferValue(this)')
        space.style.opacity = "1"
        space.style.cursor = "pointer"
      }
}

// checking if the answer is right

function checkingTheAnswer(){
    let index = 0 
    let input = playersAnswer()
    
    while (index <= currentAnswer.length){
        if (index == currentAnswer.length){
            console.log("your answer is correct")
            succeedPopUp();
            break;
        }
        if (input[index] == currentAnswer[index]){
            console.log(index +1 +" char is right");
            index++;
            continue;
        }else{
            console.log(index+1+" char is wrong, you lose")
            resetResults();
            break;
        }
    }
}

//document.getElementById("checkButton").addEventListener("click", checkingTheAnswer);

function playersAnswer(){
    const parentDiv = document.getElementById('theAnswerBox');

    if (parentDiv) {
    const childDivs = parentDiv.querySelectorAll('div'); // Get all child div elements
    const innerHtmlArray = [];

    // Iterate through each child div and collect its inner HTML
    childDivs.forEach(div => {
        innerHtmlArray.push(div.innerHTML);
    });

    return innerHtmlArray
    }
}

// succeed pop-up
function succeedPopUp(){
    popUp.classList.add('active')
    overlay.classList.add('active')
}

// moving to the next question

function nextQuestion(){
    const theFather = document.getElementById("theAnswerBox")
    const resultDivs = document.querySelectorAll('.answerSquares');
    const charSpaces = document.querySelectorAll('.charSpace')
    current++;
    if(current == answers.length){
        document.getElementById("notification").innerHTML = "لقد أكملت اللعبة ،مبارك"
        document.getElementById("notificationButton").style.display = "none"
        document.getElementById("popUP").style.height = "250px"
    }
    else{
        popUp.classList.remove('active')
        overlay.classList.remove('active')
        
        currentAnswer = answers[current]
        currentHint = hints[current]
        theFather.innerHTML = ""
        for (const charSpace of charSpaces) {
            charSpace.innerText = '';
            charSpace.style.opacity = "1"
        }
        pickedSpaces = [];
        set();
        fill();
        setAnswerSpaces();
        resetResults();
    }
}
