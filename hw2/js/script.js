document.querySelector("button").addEventListener("click", gradeQuiz);

displayQ4Choices();
displayQ8Choices();

let attempts = localStorage.getItem("total_attempts")

if (attempts === null) {
    attempts = 0;
} else {
    attempts = Number(attempts);
}

let score = 0;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function displayQ4Choices() {
  let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
  shuffleArray(q4ChoicesArray);

  let choicesContainer = document.querySelector("#q4Choices");
  choicesContainer.textContent = "";

  for (let choice of q4ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q4";
    input.id = choice;
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = choice;
    label.textContent = choice;

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}

function displayQ8Choices() {
  let q8ChoicesArray = ["Alaska", "California", "Washington", "Colorado"];
  shuffleArray(q8ChoicesArray);

  let choicesContainer = document.querySelector("#q8Choices");
  choicesContainer.textContent = "";

  for (let choice of q8ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q8";
    input.id = choice;
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = choice;
    label.textContent = choice;

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}

function setMarkImage(index, imageName, altText) {
    let markContainer = document.querySelector(`#markImg${index}`);
    markContainer.textContent = "";

    let img = document.createElement("img");
    img.src = `img/${imageName}`;
    img.alt = altText;
    img.width = 50;
    img.height = 50;
    markContainer.appendChild(img);
}

function rightAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);
    feedback.textContent = "Correct!";
    feedback.className = "bg-success text-white";
    setMarkImage(index, "checkmark.png", "Checkmark");
    score += 10;
}

function wrongAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);
    feedback.textContent = "Incorrect!";
    feedback.className = "bg-warning text-white";
    setMarkImage(index, "xmark.png", "X mark");
}

function isFormValid() {
    let isValid = true;
    let q1Response = document.querySelector("#q1").value;
    let validationFdbk1 = document.querySelector("#validationFdbk");

    if (q1Response === "") {
        isValid = false;
        validationFdbk1.textContent = "Question 1 was not answered.";
    }

    let q7Response = document.querySelector("#q7").value;
    let validationFdbk7 = document.querySelector("#validationFdbk");

    if (q7Response === "") {
        isValid = false;
        validationFdbk7.textContent = "Question 7 was not answered.";
    }

    return isValid;
}

function gradeQuiz() {
    document.querySelector("#validationFdbk").textContent = "";

    if (!isFormValid()) {
        return;
    }

    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q6Response = document.querySelector("#q6").value;
    let q7Response = document.querySelector("#q7").value.toLowerCase();
    let q10Response = document.querySelector("#q10").value;


    // Question 1 check
    if (q1Response === "sacramento") {
        rightAnswer(1);
    } else {
        wrongAnswer(1);
    }

    // Question 2 check
    if (q2Response === "mo") {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }

    // Question 3 check
    if (document.querySelector("#Jefferson").checked &&
        document.querySelector("#Roosevelt").checked &&
        !document.querySelector("#Jackson").checked &&
        !document.querySelector("#Franklin").checked) {
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }

    // Question 4 check
    let selectedQ4 = document.querySelector('input[name="q4"]:checked');
    if (selectedQ4 !== null && selectedQ4.value === "Rhode Island") {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }

    // Question 5 check
    let selectedQ5 = document.querySelector('input[name="q5"]:checked');
    if (selectedQ5 != null && selectedQ5.value === "Alaska") {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }

    // Question 6 check
    if (q6Response === "ls") {
        rightAnswer(6);
    } else {
        wrongAnswer(6);
    }

    // Question 7 check
    if (q7Response === "50" || q7Response === "fifty") {
        rightAnswer(7);
    } else {
        wrongAnswer(7);
    }

    // Question 8 check
    let selectedQ8 = document.querySelector('input[name="q8"]:checked');
    if (selectedQ8 !== null && selectedQ8.value === "Alaska") {
        rightAnswer(8);
    } else {
        wrongAnswer(8);
    }

    // Question 9 check
    if (document.querySelector("#q9Hawaii").checked &&
        document.querySelector("#q9Alaska").checked &&
        !document.querySelector("#q9PuertoRico").checked &&
        !document.querySelector("#q9Arizona").checked) {
        rightAnswer(9);
    } else {
        wrongAnswer(9);
    }

    // Question 10 check
    if (q10Response === "mo" || q10Response === "tn") {
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }

    // totalScore tally
    let totalScore = document.querySelector("#totalScore");
    let congratsMessage = document.querySelector("#congratsMessage");
    congratsMessage.textContent = "";

    totalScore.textContent = `Total Score: ${score}`;
    if (score < 80) {
        totalScore.className = "text-danger";
    } else {
        totalScore.className = "text-success";
        congratsMessage.textContent = "Congratulations! Great Job!";
    }

    attempts++;
    document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;
    localStorage.setItem("total_attempts", attempts);
}
