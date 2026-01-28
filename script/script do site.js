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

