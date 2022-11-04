// VARIAVEIS
const question = document.querySelector("#question")
const answersBox = document.querySelector("#answers-box")
const quizzContainer = document.querySelector("#quizz-container")
const scoreContainer = document.querySelector("#score-container")
const parab = document.querySelector('#parabens')
const letters = ["a", "b", "c", "d"]
let points = 0
let actualQuestion = 0

// PERGUNTAS
const questions = [
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
    // {
    //   MODELO DE PERGUNTAS E RESPOSTAS
    //   "question": "pERGUNTA",
    //   "answers": [
    //     {
    //       "answer": "RESPOSTA1",
    //       "correct": false
    //     },
    //     {
    //       "answer": "RESPOSTA2",
    //       "correct": false
    //     },
    //     {
    //       "answer": "RESPOSTA3",
    //       "correct": true
    //     },
    //     {
    //       "answer": "RESPOSTA4",
    //       "correct": false
    //     },
    //   ]
    // },
    // NESSE CASO A ALTERNATIVA "C" SERIA A CORRETA
  ]

// SUBSTITUIÇÃO DO QUIZZ PARA A PRIMEIRA PERGUNTA
function init(){
    // CRIA A PRIMEIRA PERGUNTA
    createQuestion(0)
}

// CRIA PERGUNTA
function createQuestion(i){
    
    // LIMPA A QUESTÃO ANTERIOR
    const oldButtons = answersBox.querySelectorAll("button")
    oldButtons.forEach(function(btn){
        btn.remove()
    })

    // ALTERA O TEXTO DA PERGUNTA
    const questionText = question.querySelector("#question-text")
    const questionNumber = question.querySelector("#question-number")

    questionText.textContent = questions[i].question
    questionNumber.textContent = i + 1

    // INSERINDO AS ALTERNATIVAS 
    questions[i].answers.forEach(function(answer,i){
      // CRIANDO O TEMPLATE DO BOTÃO DO QUIZZ  
      const answerTemplate = document.querySelector(".answer-template").cloneNode(true)

      const letterBtn = answerTemplate.querySelector(".btn-letter")
      const answerText = answerTemplate.querySelector(".question-answer")

      letterBtn.textContent = letters[i]
      answerText.textContent = answer['answer']
      answerTemplate.setAttribute("correct-answer", answer["correct"])

      // REMOVENDO O HIDE E TEMPLATE CLASS
      answerTemplate.classList.remove("hide")
      answerTemplate.classList.remove("answer-template")
      // INSERINDO A ALTERNATIVA NA TELA
      answersBox.appendChild(answerTemplate)
      // INSERINDO O EVENTO DE CLICK NO BOTÃO
      answerTemplate.addEventListener('click', function(){
        checkAnswer(this)
      })
    })
    // PULA PARA A PROXIMA QUESTÃO
    actualQuestion++
}

// VERIFICA SE A RESPOSTA É A CORRETA
function checkAnswer(btn){
  // SELECIONA TDODOS OS BOTÕES
  const buttons = answersBox.querySelectorAll("button")
  // VERIFICA A RESPOSTA E ADICIONA CLASSE AOS BOTÕES
  buttons.forEach(function(button){
    if(button.getAttribute("correct-answer") === "true"){
      button.classList.add("correct-answer")
      // CHECA SE O USUARIO ACERTOU A PERGUNTA
      if(btn === button){
        // INCREMENTA OS PONTOS
        points++
      }
    }else{
      button.classList.add("wrong-answer")
    }
  })
  // EXIBE A PROXIMA PERGUNTA
  nextQuestion()
}

// FUNÇÃO QUE EXIBE A PROXIMA PERGUNTA
function nextQuestion(){
  // SETA UM TIMER P/ O USUARIO VER A RESPOSTA
  setTimeout(function(){
    // VERIFICA SE AINDA EXISTEM PERGUNTAS
    if(actualQuestion>=questions.length){
      // APRESENTA A MENSAGEM DE PONTUAÇÃO
      showSeucessMessage()
      return
    }
    createQuestion(actualQuestion)
  }, 1000)
}

// EXIBE A MENSAGEM NA TELA FINAL
function showSeucessMessage() {
  hideOrShowQuizz()
  

  // TROCA DADOS DA TELA FINAL

  // CALCULA O SCORE
  const score = ((points/questions.length)*100).toFixed(2)
  const displayScore = document.querySelector("#display-score span")
  displayScore.textContent = score.toString()

  if(score == 0){
    parab.textContent = "Parabéns você é burro"
  }else if(score>=100){
    parab.textContent = "Parabéns você sabe o minimo"
  }

  // ALTERA O NÚMERO DE PERGUNTAS CORRETAS
  const correctAnswers =  document.querySelector("#correct-answers")
  correctAnswers.textContent = points

  // ALTERA O NUMERO TOTAL DE PERGUNTAS
  const totQuestions = document.querySelector("#questions-qty")
  totQuestions.textContent = questions.length
}

// FUNÇÃO QUE MOSTRA OU ESCONDE O QUIZ
function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide")
  scoreContainer.classList.toggle("hide")
}

//REINICIA O QUIZZ
const restartBtn = document.querySelector("#restart")
restartBtn.addEventListener("click", function(){
  // ZERA O JOGO
  actualQuestion = 0
  points = 0
  hideOrShowQuizz()
  init()
})


// INICIALIZA O QUIZZ
init()






