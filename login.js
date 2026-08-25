const btnLogin = document.getElementById("btnLogin");

const campoUsuario = document.getElementById("usuario");
const campoSenha = document.getElementById("senha");
const mensagemLogin = document.getElementById("mensagemLogin");

btnLogin.addEventListener("click", function() {
    const usuario = campoUsuario.value;
    const senha = campoSenha.value;

    if (usuario === "ti" && senha === "1234") {
        
        localStorage.setItem("usuarioLogado", "ti");

        window.location.href = "index.html";

    } else if (usuario === "usuario" && senha === "1234") {

        localStorage.setItem("usuarioLogado", "usuario");

        window.location.href = "index.html";

    } else {

        mensagemLogin.textContent = "Usuario ou senha incorretos";
        mensagemLogin.className = "mensagem erro";
    }
})