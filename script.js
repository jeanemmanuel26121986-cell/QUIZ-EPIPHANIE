
const questions = [
  {
    image: "images/epiphanie.jpg",
    text: "L'Épiphanie est la fête où nous célébrons la visite des rois mages à Jésus. Elle a lieu le 6 janvier.",
    question: "Que célèbre-t-on à l'Épiphanie ?",
    options: ["La naissance de Jésus", "La visite des rois mages", "La résurrection de Jésus"],
    answer: "La visite des rois mages"
  },
  {
    image: "images/rois_mages.jpg",
    text: "Les rois mages s'appelaient Melchior, Gaspard et Balthazar. Ils sont venus de loin pour adorer Jésus.",
    question: "Quels sont les noms des rois mages ?",
    options: ["Pierre, Paul et Jacques", "Melchior, Gaspard et Balthazar", "Abraham, Isaac et Jacob"],
    answer: "Melchior, Gaspard et Balthazar"
  },
  {
    image: "images/cadeaux.jpg",
    text: "Les rois mages ont offert à Jésus l'or, l'encens et la myrrhe. Ces cadeaux ont une signification spéciale.",
    question: "Quels cadeaux ont apporté les rois mages ?",
    options: ["Or, encens et myrrhe", "Or, argent et diamants", "Pain, vin et huile"],
    answer: "Or, encens et myrrhe"
  },
  {
    image: "images/etoile.jpg",
    text: "L'étoile a guidé les rois mages jusqu'à Jésus. Elle est un signe de lumière et d'espérance.",
    question: "Que symbolise l'étoile de Noël ?",
    options: ["La lumière et l'espérance", "La richesse", "La fête"],
    answer: "La lumière et l'espérance"
  },
  {
    image: "images/signification.jpg",
    text: "Le mot Épiphanie vient du grec et signifie “manifestation”. C’est la manifestation de Jésus au monde.",
    question: "Que signifie le mot Épiphanie ?",
    options: ["Naissance", "Manifestation", "Résurrection"],
    answer: "Manifestation"
  },
  {
    image: "images/date.jpg",
    text: "L'Épiphanie est célébrée le 6 janvier, douze jours après Noël.",
    question: "Quand fête-t-on l'Épiphanie ?",
    options: ["Le 25 décembre", "Le 6 janvier", "Le 1er janvier"],
    answer: "Le 6 janvier"
  }
];

let score = 0;

function startQuiz() {
  const username = document.getElementById('username').value;
  if (username.trim() === "") {
    alert("Veuillez entrer votre nom !");
    return;
  }
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('quiz-screen').style.display = 'block';
  document.getElementById('welcome').innerText = `Bienvenue, ${username} !`;
  loadQuestions();
}

function loadQuestions() {
  const container = document.getElementById('quiz-container');
  container.innerHTML = "";
  questions.forEach((q) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<img src="${q.image}" alt="image"><p>${q.text}</p><h3>${q.question}</h3>`;
    q.options.forEach(option => {
      const btn = document.createElement('button');
      btn.innerText = option;
      btn.onclick = () => checkAnswer(option, q.answer, btn);
      card.appendChild(btn);
    });
    container.appendChild(card);
  });
}

function checkAnswer(selected, correct, btn) {
  if (selected === correct) {
    score++;
    btn.style.background = 'green';
  } else {
    btn.style.background = 'red';
  }
  const parent = btn.parentElement;
  Array.from(parent.querySelectorAll('button')).forEach(b => b.disabled = true);
}

function showScore() {
  document.getElementById('score').innerText = `Votre score : ${score}/${questions.length}`;
  // Envoi des données à Google Sheets
  fetch('https://script.google.com/macros/s/AKfycbxtiKd2zq-0j0uo6s-evDWhYh77XT1gQJ8oj37D3YOyYv0eACsDqpDf1mAcfk8MLtFEow/exec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: document.getElementById('username').value,
      score: `${score}/${questions.length}`
    })
  }).then(response => console.log('Score enregistré !'));
}
