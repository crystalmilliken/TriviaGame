//Instead of creating the game inside one object I wanted to practice using a class
 let happyIm = ["good1.jpg", "good2.png", "good3.png", "good4.png"];
 let bummerIm = ["bad1.jpg", "bad2.png", "bad3.png", "bad4.jpg"];
class CreateGame{
    constructor (questions , fakeAnswers, happyIm, bummerIm){
    this.time = 30;
    this.wrong = 0;
    this.right = 0;
    this.questions = questions;
    this.tempArray = [];
    this.fakeAnswers = fakeAnswers;
    this.currentQuestion;
    this.setInterval;
    this.isrunning = false;
    this.arrFake = [];
    this.happyIm = happyIm;
    this.bummerIm = bummerIm;
}
//gets a random number based on some min max(did this because I needed to randomize pictures that display after question is answered)
    randomizer(min, max){
            let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            return randomNum;
        }
//starts the interval based on some passed time, then calls the startClock function
    timeSet(inter){
        this.setInterval = setInterval(this.startClock.bind(this), inter);
    }
//function called during the set interval.
    startClock(){
        this.time--;
        this.isrunning = true;
        document.getElementById("timer").innerText = `Time Remaing: ${this.time}`;
        document.getElementById("gif").innerHTML = "<img src='assets/images/walking.png' alt='walking turtle'>";
        document.getElementById("personStatus").innerHTML = "<img src='assets/images/happyPerson.png' alt='happy person'>";
//if else statements for the changes to the HTML based on the time left
        if(this.time <= 0){
            if(this.tempArray.length <= 0){
                alert("game over");
                this.wrong = 0;
                this.right = 0;
                document.getElementById("question").innerText = "";
                document.getElementById("answers").innerHTML = "";
                this.generateQuestions();
            }else{
            this.wrong++;
            this.isrunning = false;
            clearInterval(this.setInterval);
            this.generateQuestions();
            document.getElementById("gif").innerHTML = "<img src='assets/images/turtleFire.png' alt='walking turtle'>";
            document.getElementById("personStatus").innerHTML = "<img src='assets/images/sadPerson.png' alt='sad person'>";
            }
        }
        if(this.time > 15){
            document.getElementById("timer").classList.remove("danger");
            
        }else if(this.time <= 15 && this.time > 0){
            document.getElementById("timer").classList.toggle("danger");
           
        }
    }
//Needed to generate fake answers and only include max of 2. Then add them together with the answer that is correct.
    generateAnswers(fakeAndReal){
        for(let i = 0; i < fakeAndReal.length; i++){
            let newDiv = document.createElement("div");
            newDiv.setAttribute("data", fakeAndReal[i]);
            newDiv.innerText = `${fakeAndReal[i]}`
            newDiv.classList = "answerDivs";
            document.getElementById("answers").append(newDiv);
            newDiv.addEventListener("click", this.checkAnswers.bind(this));
        }
           this.timeSet(1000);
    }
//Several arrays that I needed to shuffle so that things wouldn't always be the same
    shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
    }
//This generates the questions
    generateQuestions(){
        document.getElementById("gif").innerHTML = "<img src='assets/images/walking.png' alt='walking turtle'>";
        document.getElementById("personStatus").innerHTML = "<img src='assets/images/happyPerson.png' alt='happy person'>";
        document.getElementById("right").innerHTML = `Right: ${this.right}`;
        document.getElementById("wrong").innerHTML = `Wrong: ${this.wrong}`;
        document.getElementById("result").innerHTML ="";
        document.getElementById("question").innerText = "";
        document.getElementById("answers").innerText = "";
        let fakeAndReal = [];
        let fake1 = this.randomizer(0, (this.fakeAnswers.length -1));
        let fake2 = this.randomizer(0, (this.fakeAnswers.length - 1));
//Needed to make sure that there wasn't 2 of the fake answers that were the same.
        if(fake1 === fake2){
            fake1 = this.randomizer(0, (this.fakeAnswers.length -1));
            fake2 = this.randomizer(0, (this.fakeAnswers.length - 1));
            this.generateQuestions();
        }else{
            let questionNum = this.randomizer(0, (this.tempArray.length-1));
            //grab a random question
            if(this.tempArray.length === 0){
                //create new array from 
                this.tempArray = this.questions.slice();
            }   
//assign current question for access
            this.currentQuestion = this.tempArray[questionNum];
            document.getElementById("question").innerText = this.tempArray[questionNum].question;
//This is where I push the answers all together and shuffle them
            fakeAndReal.push(this.tempArray[questionNum].answer, this.fakeAnswers[fake1], this.fakeAnswers[fake2]);
            fakeAndReal = this.shuffleArray(fakeAndReal);
//After using the question, take it away
            this.tempArray.splice(questionNum, 1);
//If you have gone through all the questions, the game is over
            if(this.tempArray.length <= 0){
                alert("game over");
                document.getElementById("question").innerText = "";
                document.getElementById("answers").innerHTML = "";
                this.wrong = 0;
                this.right = 0;
                this.generateQuestions();
                
            }else{
                this.isrunning = true;
                this.time = 30;
                this.generateAnswers(fakeAndReal);

            }
        
        }
        
    }

//CheckAnswers checks which one you click on, finds the innerText and compares it with the currentQuestion
    checkAnswers(e){
        let currentChoice = e.target.innerText;
        if(currentChoice === this.currentQuestion.answer){
            this.right++;
            let ranNum = this.randomizer(0,3);
            document.getElementById("right").innerHTML = `Right: ${this.right}`;
            document.getElementById("question").innerHTML = this.currentQuestion.question;
            document.getElementById("answers").innerHTML = "";
            document.getElementById("result").innerHTML = `${this.currentQuestion.answer}<img src='assets/images/${this.happyIm[ranNum]}'>`;
            clearInterval(this.setInterval);
             document.getElementById("gif").innerHTML = "<img src='assets/images/turtleDissapointed.png' alt='dissapointed turtle'>";
            setTimeout(this.generateQuestions.bind(this),5000);
            
        }else{
            this.wrong++;
            let ranNum = this.randomizer(0,3);
            document.getElementById("wrong").innerHTML = `Wrong: ${this.wrong}`;
            document.getElementById("question").innerHTML = this.currentQuestion.question;
            document.getElementById("answers").innerHTML = "";
            document.getElementById("result").innerHTML = `${this.currentQuestion.answer}<br><img src='assets/images/${this.bummerIm[ranNum]}'>`;
            clearInterval(this.setInterval);
             document.getElementById("gif").innerHTML = "<img src='assets/images/turtleFire.png' alt='walking turtle'>";
            document.getElementById("personStatus").innerHTML = "<img src='assets/images/sadPerson.png' alt='sad person'>";
             setTimeout(this.generateQuestions.bind(this),5000);
        }
    }
//Function to stop the timer and start(which triggers a wrong answer as well as moves to the next question)
    toggleStart(){
        if(this.isrunning){
            this.isrunning = false;
            document.getElementById("start").innerText = "Next Question";
            clearInterval(this.setInterval);
        }else{
            document.getElementById("start").innerText = "Stop";
            this.generateQuestions();
        }
    }
}
//just practicing AJAX, gets the 2 arrays from a file
function getData(){

      $.ajax({
      url: "assets/javascript/data.js",
      method: "GET"
    }).then(function(e) {
        let result = JSON.parse(e);
        let triviaGame = new CreateGame(result[0].questions, result[1].fakeAnswers, happyIm, bummerIm);
        document.getElementById("start").addEventListener("click", function(){triviaGame.toggleStart()}.bind(this));
    });
}
getData();

