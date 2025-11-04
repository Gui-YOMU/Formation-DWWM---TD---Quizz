class Question {
    constructor(subject, query, answers, goodAnswer, points) {
        this.subject = subject,
            this.query = query,
            this.answers = answers,
            this.goodAnswer = goodAnswer,
            this.points = points
    }
}

let questionOne = new Question("Sciences", "Quelle est la formule chimique de l'eau ?", ["H2O", "CO2", "CH4", "C6H12O6"], "H2O", 1)
let questionTwo = new Question("Littérature", "Qui a écrit 'Les Précieuses ridicules' ?", ["Molière", "Corneille", "Racine", "Ionesco"], "Molière", 1)
let questionThree = new Question("Géographie", "Quelle est la capitale de l'Australie ?", ["Canberra", "Melbourne", "Brisbane", "Sydney"], "Canberra", 1)
let questionFour = new Question("Sports", "Quel joueur détient le plus de titres en simple à Wimbledon ?", ["Roger Federer", "Pete Sampras", "Novak Djokovic", "Bjorn Borg"], "Roger Federer", 1)
let questionFive = new Question("Histoire", "Quel roi de France a eu pour ministre le cardinal de Richelieu ?", ["Louis XIII", "Louis XIV", "Louis XV", "Louis XVI"], "Louis XIII", 1)

let startButton = document.querySelector("#start")
let headerSection = document.querySelector("header")
let ruleSection = document.querySelector("#rules")
let questionDisplay = document.querySelector("#display")
let subjectDisplay = document.querySelector("#subject")
let queryDisplay = document.querySelector("#query")
let answersDisplay = document.querySelector("#answers")
let resultDisplay = document.querySelector("#result")
let nextDisplay = document.querySelector("#next")
let scoreDisplay = document.querySelector(".score")
let finalScoreDisplay = document.querySelector("#score")
let commentDisplay = document.querySelector("#comment")
let commentImageContainer = document.querySelector(".commentImageContainer")

let questionSet = [questionOne, questionTwo, questionThree, questionFour, questionFive]
let questionOrder = []
let score = 0
let questionIndex = -1
let answerButton = 0
let flag = true
let answersOrder = []

function start() {
    questionsRandom(questionSet)
    headerSection.remove()
    ruleSection.remove()
    questionDisplay.style.display = "flex"
    nextQuestion()
}

function questionsRandom(array) {
    let index = 0
    while (array.length != 0) {
        index = parseInt(Math.random() * array.length)
        questionOrder.push(array[index])
        for (let i = index; i < array.length; i++) {
            array[i] = array[i + 1]
        }
        array.length--
    }
}

function answersRandom(array) {
    let answerIndex = 0
    while (array.length != 0) {
        answerIndex = parseInt(Math.random() * array.length)
        answersOrder.push(array[answerIndex])
        for (let i = answerIndex; i < array.length; i++) {
            array[i] = array[i + 1]
        }
        array.length--
    }
}

function nextQuestion() {
    flag = true
    questionIndex++
    resultDisplay.textContent = ""
    nextDisplay.replaceChildren()
    subjectDisplay.replaceChildren()
    answersDisplay.replaceChildren()
    question()
}

function answersCreation(rightAnswer) {
    for (let j = 0; j < answersOrder.length; j++) {
        answerButton = document.createElement("button")
        answerButton.textContent = answersOrder[j]
        answerButton.setAttribute("class", `answer${j + 1}`)
        if (answersOrder[j] === rightAnswer) {
            answerButton.addEventListener("click", goodAnswer)
        } else {
            answerButton.addEventListener("click", badAnswer)
        }
        answersDisplay.appendChild(answerButton)
    }
    answersOrder = []
}

function question() {
    let subjectImageContainer = document.createElement("div")
    subjectImageContainer.setAttribute("class", "subjectImageContainer")
    let subjectImage = document.createElement("img")
    let subjectText = document.createElement("h2")
    subjectText.textContent = questionOrder[questionIndex].subject
    subjectImage.setAttribute("src", `./assets/images/${questionOrder[questionIndex].subject}.jpg`)
    subjectImageContainer.appendChild(subjectImage)
    subjectDisplay.appendChild(subjectImageContainer)
    subjectDisplay.appendChild(subjectText)
    queryDisplay.textContent = questionOrder[questionIndex].query
    answersRandom(questionOrder[questionIndex].answers)
    answersCreation(questionOrder[questionIndex].goodAnswer)
}

function goodAnswer() {
    if (flag == true) {
        score++
        resultDisplay.textContent = `Bonne réponse, vous marquez ${questionOrder[questionIndex].points} point(s).`
        resultDisplay.setAttribute("class", "good")
        let nextButton = document.createElement("button")
        nextDisplay.replaceChildren()
        nextDisplay.appendChild(nextButton)
        if (questionIndex == (questionOrder.length - 1)) {
            nextButton.textContent = "Voir le score final"
            nextButton.addEventListener("click", () => {
                quizEnd()
            })
        } else {
            nextButton.textContent = "Question suivante"
            nextButton.addEventListener("click", () => {
                nextQuestion()
            })
        }
        nextDisplay.style.display = "flex"
    }
    flag = false
}

function badAnswer() {
    if (flag == true) {
        resultDisplay.textContent = "Mauvaise réponse, vous ne marquez pas de point."
        resultDisplay.setAttribute("class", "bad")
        let nextButton = document.createElement("button")
        nextDisplay.replaceChildren()
        nextDisplay.appendChild(nextButton)
        if (questionIndex == (questionOrder.length - 1)) {
            nextButton.textContent = "Voir le score final"
            nextButton.addEventListener("click", () => {
                quizEnd()
            })
        } else {
            nextButton.textContent = "Question suivante"
            nextButton.addEventListener("click", () => {
                nextQuestion()
            })
        }
        nextDisplay.style.display = "flex"
    }
    flag = false
}

function quizEnd() {
    questionDisplay.style.display = "none"
    scoreDisplay.style.display = "flex"
    finalScoreDisplay.textContent = `Vous avez marqué un total de ${score} point(s).`
    let commentImage = document.createElement("img")
    switch (score) {
        case 0: {
            commentDisplay.textContent = "Vous êtes vraiment nul, il va falloir retourner à l'école ..."
            commentImage.setAttribute("src", `./assets/images/${score}.png`)
            commentImageContainer.appendChild(commentImage)
            break
        }
        case 1: {
            commentDisplay.textContent = "Vous avez fourni assez d'effort pour ouvrir le compteur, mais pas plus."
            commentImage.setAttribute("src", `./assets/images/${score}.png`)
            commentImageContainer.appendChild(commentImage)
            break
        }
        case 2: {
            commentDisplay.textContent = "On est à la moyenne, mais vous pouvez mieux faire."
            commentImage.setAttribute("src", `./assets/images/${score}.png`)
            commentImageContainer.appendChild(commentImage)
            break
        }
        case 3: {
            commentDisplay.textContent = "Quelques erreurs mais c'est pas mal du tout."
            commentImage.setAttribute("src", `./assets/images/${score}.png`)
            commentImageContainer.appendChild(commentImage)
            break
        }
        case 4: {
            commentDisplay.textContent = "Vous avez frôlé la perfection, mais c'est déjà excellent."
            commentImage.setAttribute("src", `./assets/images/${score}.png`)
            commentImageContainer.appendChild(commentImage)
            break
        }
        case 5: {
            commentDisplay.textContent = "Le score est parfait, tu es vraiment exceptionnel !"
            commentImage.setAttribute("src", `./assets/images/${score}.png`)
            commentImageContainer.appendChild(commentImage)
            break
        }
    }
}

startButton.addEventListener("click", () => {
    start()
})