console.log("site carregando com sucesso!")

function toggleTheme() {
    document.body.classList.toggle("light-mode");
}

function mostrarToast(event) {
  event.preventDefault(); 

  const toast = document.getElementById("toast");
  toast.classList.add("show");

  setTimeout(() => {
    window.location.href = "index.html"
  }, 1500);
}

function revelarElementos() {
  const elementos = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  elementos.forEach(el => {
    const posicao = el.getBoundingClientRect().top;
    const alturaTela = window.innerHeight;
    
    if (posicao < alturaTela - 100) {
      el.classList.add('active');
    }
  });
}

const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100; // distância da borda inferior da tela

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active');
    }
  });
}

// Ativa ao rolar
window.addEventListener('scroll', revealOnScroll);

// 🔥 ATIVA TAMBÉM ASSIM QUE A PÁGINA CARREGA
window.addEventListener('load', revealOnScroll);


// Ativa ao carregar
window.addEventListener('load', () => {
  revelarElementos();

  // Garante que elementos que já estão na tela apareçam
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    .forEach(el => {
      const posicao = el.getBoundingClientRect().top;
      if (posicao < window.innerHeight) {
        el.classList.add('active');
      }
    });
});

// Ativa ao rolar
window.addEventListener('scroll', revelarElementos);
