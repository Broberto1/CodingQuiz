var body = document.querySelector("body");
var h1El = document.querySelector("h1");
var pEl = document.getElementById("flavor-text");
var answerDiv = document.getElementById("answers");
var inputDiv = document.getElementById("initals");
var notify = document.getElementById("wrong-right");
var startBtn = document.getElementById("start");
var submitBtn = document.getElementById("submit");
var inputField = document.querySelector("input");
var nameList = document.querySelector("Name-and-Scores");
var HighScoreDiv = document.getElementById("high-score");
var backBttn = document.getElementById("backBttn");
var timer = document.getElementById("timer");
var timerInterval;
var timeCount = 100;
var idx_question = 0;
var scoreCount = 0;

var aName = [];
var QuestionsArr = [
  {
      question: "1. A very useful tool used during development and debugging for printing content to the debugger is:",
      answers: [
          "local storage",
          "console log",
          "for loops",
          "github",
      ],
      correctAnswer: 2
  },
  {
      question: "2. What do you close strings with",
      answers: [
          "quotes",
          "curly brackets",
          "semi colon",
          "periods",
      ],
      correctAnswer: 0
  },
  {
      question: "3. Arrays in JavaScript can be used to store _____.",
      answers: [
          "numbers and strings",
          "other arrays",
          "booleans",
          "all of the above",
      ],
      correctAnswer: 3
  },
  {
      question: "4. The condition in an if / else statement is enclosed within _____.",
      answers: [
          "quotes",
          "curly brackets",
          "parentheses",
          "square brackets",
      ],
      correctAnswer: 2
  },
  {
      question: "5. Commonly used data types DO NOT include:",
      answers: [
          "strings",
          "booleans",
          "alerts",
          "numbers",
      ],
      correctAnswer: 2
  },
]


function setCounterText() {
  timer.textContent = "Time: " + timeCount;
}

function startScreen() {
  h1El.textContent = "It's time to take a quiz."
  pEl.textContent = "Try your best time goes down for every wrong answer take your time"
  startBtn.textContent = "Start Quiz"
  answerDiv.style.display = "none";
  inputDiv.style.display = "none";
}

function gameOver() {
  h1El.textContent = "Nice try";
  pEl.textContent = "Your score is " + scoreCount;
  answerDiv.style.display = "none";
  inputDiv.style.display = "block";
}


startScreen();

setCounterText();

function makeTimer() {
  timerInterval = setInterval(function () {
      timeCount--;
      setCounterText();

      if (timeCount === 0) {
          clearInterval(timerInterval);
          gameOver();
      }
  }, 1000)
}

startBtn.addEventListener("click", function (event) {
  event.preventDefault()
  scoreCount = 0;
  startBtn.style.display = "none";
  answerDiv.style.display = "block";
  pEl.textContent = " ";
  makeTimer();
  for (var idx_answer = 0; idx_answer < 4; idx_answer++) {

      var newAnswerBtn = document.getElementById("answer-" + idx_answer);
      newAnswerBtn.addEventListener("click", function (answersEvent) {

          var chosenAnswer = Number(this.id.substr(7));
          var correctAnswer = QuestionsArr[idx_question].correctAnswer;


          var result = chosenAnswer === correctAnswer;
          if (result) {
              scoreCount++;
              notify.textContent = "Correct";
          }
          else {
              timeCount = timeCount - 10;
              notify.textContent = "Wrong";
          }

          var questionsRemaining = idx_question < QuestionsArr.length - 1;
          if (questionsRemaining) {
              activateQuestion(idx_question + 1);
          }
          else {
              gameOver();
              clearInterval(timerInterval);
          }
      });
  }
  activateQuestion(0);
});

function activateQuestion(idx_new) {
  h1El.textContent = QuestionsArr[idx_new].question;

  var answerQty = QuestionsArr[idx_new].answers.length;
  for (var idx_answer = 0; idx_answer < answerQty; idx_answer++) {
      var newAnswerBtn = document.getElementById("answer-" + idx_answer);
      newAnswerBtn.textContent = QuestionsArr[idx_new].answers[idx_answer];
  }
  idx_question = idx_new;
}

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  highScore
  function  renderHighScores() {
    
      for (var i = 0; i < aName.length; i++) {
        var aName = aName[i];
    
        var li = document.createElement("li");
        li.textContent = aName;
        li.setAttribute("data-index", i);
        
        nameList.appendChild(li);
      }
    }
    
  

    function storeInitials() {
      var storedNames = JSON.parse(localStorage.getItem("names"));
    
      if (storedNames !== null) {
        aName = storedNames;
      }
    
      renderHighScores();
      console.log(aName);
    }
    
    function storeHighScoreNames() {
      localStorage.setItem("names", JSON.stringify(aName));
    }
    var nameText = inputField.value.trim();
    if (nameText === "") {
      return;
    }
    aName.push(nameText);
  inputField.value = "";

storeInitials();
renderHighScores();   
})

backBtn.addEventListener("click", function (event) {
  location.reload();
})


  