console.log("JS working...");

// === Quiz Data ===
const questions = [
    {
        question: "يمثل خصائص اعتماد التعليم الإلكتروني على التفاعل بين المعلم والطلاب.",
        answers: ["صح", "خطأ"],
        correct: 0
    },
    {
        question: "يعتبر .............. من أدوات التعليم الإلكتروني المتزامن.",
        answers: [
            "البريد الإلكتروني",
            "القوائم البريدية",
            "الأقراص المدمجة",
            "الفصول الافتراضية"
        ],
        correct: 3
    },
    {
        question: "يسمى النموذج الخالص للتعليم الإلكتروني بالنموذج المكمل.",
        answers: ["صح", "خطأ"],
        correct: 1
    }
];

// === Quiz Logic ===
let current = 0;

function loadQuestion() {
    const q = questions[current];

    document.getElementById("question-text").innerText = q.question;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.answers.forEach((ans, i) => {
        answersDiv.innerHTML += `
        <label class="answer">
            <input type="radio" name="answer" value="${i}">
            <span>${ans}</span>
        </label>
        `;
    });

    document.getElementById("next-btn").style.display =
        current === questions.length - 1 ? "none" : "inline-block";

    document.getElementById("submit-btn").style.display =
        current === questions.length - 1 ? "inline-block" : "none";

    document.getElementById("prev-btn").style.display =
        current === 0 ? "none" : "inline-block";
}

document.getElementById("next-btn").onclick = function () {
    current++;
    loadQuestion();
};

document.getElementById("prev-btn").onclick = function () {
    current--;
    loadQuestion();
};

document.getElementById("submit-btn").onclick = function () {
    window.location.href = "result.html";
};

loadQuestion();
