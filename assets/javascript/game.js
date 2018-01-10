//Instead of creating the game inside one object I wanted to practice using a class/constructor
let questions = [{question:"Prior to your interview day, you should",answer:"have an understanding of the company and know the industry that it’s in"},
    {question:"Before heading into your interview, you want to make sure",answer:"your online presence is up to date"},
    {question:"Aside from brushing up on technical skills the job will require, also: ",answer:"review general business and technical terminology"},
    {question:"If you receive a tricky question or code test,",answer:"Don't freak out!"},
    {question:"To avoid being late, make sure to",answer:"iron out your transportation route the day before."},
    {question:"As you work through the problem",answer:"Explain aloud the steps you’re taking."},
    {question:"If you feel insecure about yourself",answer:"exude confidence and stay sure of yourself"},
    {question:"After a week, if there’s no word yet about whether you’ll be moving forward in the process, you should..",answer:"Send a follow-up email"},
    ]
let fakeAnswers =["Stalk the interviewer online",
    "Wait until at least 10 minutes after your appointment time to show up",
    "Claim to have worked at the company before", 
    "Volunteer to improve their code", 
    "Offer suggestions on how the company should be run", 
    "Passionately offer suggestions on how to improve current code",
    "Talk about your animals and how they could benefit the company",
    "Make sure to let the company know all your insecurities"
 ]
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
    randomizer(min, max){
            let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            return randomNum;
        }
    timeSet(inter){
        this.setInterval = setInterval(this.startClock.bind(this), inter);
    }
    startClock(){
        this.time--;
        this.isrunning = true;
        document.getElementById("timer").innerText = `Time Remaing: ${this.time}`;
        if(this.time <= 0){
            this.wrong++;
            this.isrunning = false;
            clearInterval(this.setInterval);
            this.generateQuestions();
        }
        if(this.time > 15){
            document.getElementById("timer").classList.remove("danger");
            
        }else if(this.time <= 15 && this.time > 0){
            document.getElementById("timer").classList = "danger";
        }
    }
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

    shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
    }

    generateQuestions(){
        document.getElementById("right").innerHTML = `Right: ${this.right}`;
        document.getElementById("wrong").innerHTML = `Wrong: ${this.wrong}`;
        document.getElementById("result").innerHTML ="";
        document.getElementById("question").innerText = "";
        document.getElementById("answers").innerText = "";
        let fakeAndReal = [];
        let fake1 = this.randomizer(0, (fakeAnswers.length -1));
        let fake2 = this.randomizer(0, (fakeAnswers.length - 1));
        if(fake1 === fake2){
            fake1 = this.randomizer(0, (fakeAnswers.length -1));
            fake2 = this.randomizer(0, (fakeAnswers.length - 1));
            this.generateQuestions();
        }else{
            let questionNum = this.randomizer(0, (this.tempArray.length-1));
            //grab a random question
            if(this.tempArray.length === 0){
                //create new array from 
                this.tempArray = this.questions.slice();
            }            
            this.currentQuestion = this.tempArray[questionNum];
            document.getElementById("question").innerText = this.tempArray[questionNum].question;
            fakeAndReal.push(this.tempArray[questionNum].answer, this.fakeAnswers[fake1], this.fakeAnswers[fake2]);
            fakeAndReal = this.shuffleArray(fakeAndReal);
                //After using the question, take it away
            this.tempArray.splice(questionNum, 1);
            if(this.tempArray.length <= 0){
                alert("game over");
                document.getElementById("question").innerText = "";
                document.getElementById("answers").innerHTML = "";
                this.generateQuestions();
            }else{
                this.isrunning = true;
                this.time = 30;
                this.generateAnswers(fakeAndReal);

            }
        
        }
        
    }
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
            setTimeout(this.generateQuestions.bind(this),5000);
            
        }else{
            this.wrong++;
            let ranNum = this.randomizer(0,3);
            document.getElementById("wrong").innerHTML = `Wrong: ${this.wrong}`;
            document.getElementById("question").innerHTML = this.currentQuestion.question;
            document.getElementById("answers").innerHTML = "";
            document.getElementById("result").innerHTML = `${this.currentQuestion.answer}<br><img src='assets/images/${this.bummerIm[ranNum]}'>`;
            clearInterval(this.setInterval);
             setTimeout(this.generateQuestions.bind(this),5000);
        }
    }
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

let triviaGame = new CreateGame(questions, fakeAnswers, happyIm, bummerIm);
document.getElementById("start").addEventListener("click", function(){triviaGame.toggleStart()}.bind(this));