@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;800&display=swap');

:root{
  --bg-1:#f6f8ff;
  --bg-2:#eef6ff;
  --card:#ffffff;
  --muted:#6b7280;
  --accent1:#9be7ff; /* pastel cyan */
  --accent2:#b8c7ff; /* pastel blue */
  --text:#0b1220;
  --glass: rgba(255,255,255,0.7);
  --shadow: 0 8px 30px rgba(11,18,32,0.06);
}

*{box-sizing:border-box}
body{
  margin:0;
  font-family:Cairo, system-ui, -apple-system, 'Segoe UI', Roboto, Arial;
  background: linear-gradient(180deg,var(--bg-1),var(--bg-2));
  color:var(--text);
  -webkit-font-smoothing:antialiased;
}

.center-page{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:36px}

.card{
  width:100%;
  max-width:880px;
  border-radius:16px;
  padding:26px;
  background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(250,250,255,0.85));
  box-shadow: var(--shadow);
  border: 1px solid rgba(11,18,32,0.04);
}

/* login */
.login-card{max-width:520px;text-align:center}
.brand{display:flex;align-items:center;gap:14px;justify-content:center;margin-bottom:6px}
.logo-circle{width:56px;height:56px;border-radius:12px;background:linear-gradient(135deg,var(--accent1),var(--accent2));box-shadow: 0 6px 24px rgba(155,231,255,0.25)}
.brand h1{font-size:20px;margin:0;font-weight:700}
.muted{color:var(--muted);font-size:14px}
.field{display:block;text-align:right;margin:12px 0}
.field span{display:block;margin-bottom:6px;color:var(--muted);font-size:13px}
input[type=text],input[type=email]{width:100%;padding:12px 14px;border-radius:12px;background:#f6f8ff;border:1px solid rgba(11,18,32,0.04);color:var(--text);font-size:16px}
input::placeholder{color:rgba(11,18,32,0.35)}
.actions{display:flex;justify-content:center;margin-top:14px}
.btn{padding:10px 18px;border-radius:12px;border:none;cursor:pointer;font-weight:700}
.btn-glow{background:linear-gradient(90deg,var(--accent1),var(--accent2));color:var(--text);box-shadow:0 10px 30px rgba(155,231,255,0.22);transition:transform .15s ease,box-shadow .15s ease}
.btn-glow:hover{transform:translateY(-3px);box-shadow:0 18px 50px rgba(155,231,255,0.26)}
.footer-note{margin-top:18px;color:var(--muted);font-size:13px}

/* quiz */
.header-quiz{display:flex;align-items:center;justify-content:space-between;gap:12px}
.logo-quiz{display:flex;align-items:center;gap:12px}
.logo-square{width:44px;height:44px;border-radius:8px;background:linear-gradient(135deg,var(--accent2),var(--accent1));box-shadow: 0 8px 30px rgba(11,18,32,0.06)}
.title-quiz{font-weight:700}
.progress-wrap{width:45%}
.progress{height:10px;background:rgba(11,18,32,0.04);border-radius:999px;overflow:hidden}
.progress > i{display:block;height:100%;background:linear-gradient(90deg,var(--accent2),var(--accent1));width:0%;transition:width .5s cubic-bezier(.2,.9,.2,1)}
.question-card{padding:20px;border-radius:14px;margin-top:18px;background:linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,250,255,0.98));border:1px solid rgba(11,18,32,0.03)}
.qtext{font-size:20px;margin-bottom:12px;text-align:right}
.choices{display:flex;flex-direction:column;gap:10px;margin-top:8px}
.choice{padding:12px 14px;border-radius:12px;background:transparent;border:1px solid rgba(11,18,32,0.04);cursor:pointer;text-align:right;font-size:16px;display:flex;align-// script.js: logic for quiz page
const STORAGE_ATTEMPTS_KEY = 'quiz_attempts';
let studentName = localStorage.getItem('quiz_student_name') || '';
let studentEmail = localStorage.getItem('quiz_student_email') || '';
const studentLabel = document.getElementById('studentLabel');
if(studentLabel) studentLabel.innerText = `مرحبا، ${studentName || 'طالب'}`;

let questions = [];
let index = 0;
let answers = [];

// try load questions.json, fallback to embedded list
async function loadQuestions(){
  try{
    const res = await fetch('questions.json');
    if(res.ok){
      questions = await res.json();
    } else throw new Error('no json');
  } catch(e) {
    questions = [
      { q: 'يمثل خصائص اعتماد التعليم الإلكتروني على التفاعل بين المعلم والطلاب.', choices:['صح','خطأ'], correct:0 },
      { q: 'يعتبر .............. من أدوات التعليم الإلكتروني المتزامن.', choices:['البريد الالكتروني','القوائم البريدية','الاقراص المدمجة','الفصول الافتراضية'], correct:3 },
      { q: 'يسمى النموذج الخالص للتعليم الإلكتروني بالنموذج المكمل؛ لأنه يتم داخل وخارج حجرة الدراسة.', choices:['صح','خطأ'], correct:1 },
      { q: 'كل مما يلي من منصات الفصول الافتراضية عدا..................', choices:['Dream weaver','Web ex','Teams','Zoom'], correct:0 },
      { q: 'يتيح التعليم الإلكتروني فرص لكل الفئات العمرية للحصول على الخدمات التعليمية المتناسبة مع ظروفهم.', choices:['صح','خطأ'], correct:0 },
      { q: 'كل مما يلي من أجهزة قراءة الكتاب الإلكتروني عدا........', choices:['القارئات اليدوية','القارئات المحمولة','الاقلام الضوئية','الاجهزة المكتبية'], correct:2 },
      { q: 'تحتاج المتاحف الافتراضية إلى تكلفة عالية ولذلك يصعب تطوير وتحديث.', choices:['صح','خطأ'], correct:1 },
      { q: 'يقوم المعرض الافتراضي بترجمة جوهر الأشياء المادية المقدمة في العالم الرقمي.', choices:['صح','خطأ'], correct:0 },
      { q: 'يوصف الفصل الافتراضي بأنه فصل بكل المكونات، والعناصر المتعارف عليها، لكن بدون وجود مكان واقعي.', choices:['صح','خطأ'], correct:0 },
      { q: 'يتم تحديد الوزارات والمؤسسات التي تُطبق التعليم الإلكتروني وذلك لإدخاله في المؤسسة التعليمية.', choices:['صح','خطأ'], correct:0 },
      { q: 'تُقدم بيئة التعلم التكيفية المحتوى بطريقة واحدة مدعمة بالوسائط المتعددة.', choices:['صح','خطأ'], correct:1 },
      { q: 'يتطلب بناء بيئة التعلم التكيفية استخدام أساليب الذكاء الاصطناعي للتنبؤ بسلوكيات الطالب.', choices:['صح','خطأ'], correct:0 },
      { q: 'يحصل المتعلم في التعليم الإلكتروني غير المباشر على محتويات تعليمية وقتما، وأينما أراد.', choices:['صح','خطأ'], correct:0 }
    ];
  }
  answers = new Array(questions.length).fill(null);
  renderQuestion();
  renderAttempts();
}

function renderQuestion(){
  const area = document.getElementById('questionArea');
  area.innerHTML = '';
  const q = questions[index];
  const qDiv = document.createElement('div');
  qDiv.className = 'qblock';
  const qtext = document.createElement('div');
  qtext.className = 'qtext';
  qtext.innerText = `${index+1}. ${q.q}`;
  qDiv.appendChild(qtext);
  const choices = document.createElement('div');
  choices.className = 'choices';
  q.choices.forEach((ch, ci) => {
    const label = document.createElement('label');
    label.className = 'choice';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'choice';
    input.value = ci;
    input.checked = answers[index] === ci;
    input.addEventListener('change', ()=>{
      answers[index] = ci;
      markSelected();
    });
    const span = document.createElement('span');
    span.innerText = ch;
    label.appendChild(input);
    label.appendChild(span);
    choices.appendChild(label);
  });
  qDiv.appendChild(choices);
  area.appendChild(qDiv);
  updateProgress();
  markSelected();
  document.getElementById('prevBtn').disabled = index===0;
  document.getElementById('nextBtn').style.display = index===questions.length-1 ? 'none' : '';
  document.getElementById('submitBtn').style.display = index===questions.length-1 ? '' : 'none';
}

function markSelected(){
  document.querySelectorAll('.choice').forEach((el)=>{
    el.classList.toggle('selected', el.querySelector('input').checked);
  });
}

function updateProgress(){
  const pct = Math.round((index)/questions.length*100);
  document.getElementById('progressBar').style.width = pct + '%';
}

document.getElementById('prevBtn').addEventListener('click', ()=>{ if(index>0) { index--; renderQuestion(); }});
document.getElementById('nextBtn').addEventListener('click', ()=>{ if(index<questions.length-1){ index++; renderQuestion(); }});
document.getElementById('submitBtn').addEventListener('click', finishQuiz);

function finishQuiz(){
  let score = 0;
  for(let i=0;i<questions.length;i++){
    if(answers[i]===questions[i].correct) score++;
  }
  document.getElementById('resultsArea').style.display = 'block';
  document.getElementById('scoreText').innerText = `${score} / ${questions.length}`;
  const feedback = score===questions.length? 'ممتاز! كل الإجابات صحيحة 🎉' : score>=Math.ceil(questions.length*0.7)? 'جيد جدا — نتيجة محترمة 👍' : 'حاولي مرة أخرى — الممارسة مهمة ✨';
  document.getElementById('feedbackText').innerText = feedback;
  saveAttempt(score);
}

function saveAttempt(score){
  const attempts = JSON.parse(localStorage.getItem(STORAGE_ATTEMPTS_KEY) || '[]');
  const now = new Date();
  const attempt = {
    name: studentName,
    email: studentEmail,
    score,
    total: questions.length,
    answers: answers.slice(),
    timestamp: now.toISOString()
  };
  attempts.push(attempt);
  localStorage.setItem(STORAGE_ATTEMPTS_KEY, JSON.stringify(attempts));
  renderAttempts();
}

function renderAttempts(){
  const list = document.getElementById('attemptsList');
  const attempts = JSON.parse(localStorage.getItem(STORAGE_ATTEMPTS_KEY) || '[]');
  if(!list) return;
  if(attempts.length===0) list.innerHTML = 'لا يوجد محاولات سابقة';
  else{
    list.innerHTML = attempts.slice(-5).reverse().map(a => `${a.timestamp.split('T')[0]} — ${a.name} — ${a.score}/${a.total}`).join('<br>');
  }
}

document.getElementById('downloadBtn').addEventListener('click', ()=>{
  const attempts = JSON.parse(localStorage.getItem(STORAGE_ATTEMPTS_KEY) || '[]');
  if(attempts.length===0) return alert('لا توجد محاولات لتحميلها');
  const last = attempts[attempts.length-1];
  const lines = [];
  lines.push(`الاسم: ${last.name}`);
  lines.push(`البريد: ${last.email}`);
  lines.push(`التاريخ: ${last.timestamp}`);
  lines.push(`النتيجة: ${last.score} / ${last.total}`);
  lines.push('');
  lines.push('تفاصيل الأسئلة:');
  last.answers.forEach((ans,i)=>{
    const q = questions[i];
    const user = ans===null? 'لم يجاوب' : q.choices[ans];
    const correct = q.choices[q.correct];
    lines.push(`${i+1}. ${q.q}`);
    lines.push(`  إجابة الطالب: ${user}`);
    lines.push(`  الإجابة الصحيحة: ${correct}`);
  });
  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const filename = `${last.name} - ${last.email} - ${last.timestamp.split('T')[0]}.txt`;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
});

document.getElementById('retryBtn').addEventListener('click', ()=>{
  answers = new Array(questions.length).fill(null);
  index = 0;
  document.getElementById('resultsArea').style.display = 'none';
  renderQuestion();
});

loadQuestions();

// redirect to login if no student data
if(!studentName || !studentEmail){
  setTimeout(()=>{ window.location.href = 'login.html'; }, 300);
}
