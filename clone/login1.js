document.addEventListener('DOMContentLoaded', function() {
    // Selecionando elementos
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');
    const registerContent = document.querySelector('.tab-content-hidden');

    // Função para alternar entre abas
    tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Remover classe ativa de todos os botões
            tabBtns.forEach(b => b.classList.remove('active'));
            // Adicionar classe ativa ao botão clicado
            btn.classList.add('active');
            
            // Alternar visibilidade dos formulários
            if (index === 0) { // Login
                loginForm.style.display = 'block';
                registerContent.style.display = 'none';
            } else { // Cadastro
                loginForm.style.display = 'none';
                registerContent.style.display = 'block';
            }
        });
    });
    
    // Tratamento de envio do formulário de login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Validação básica
        if (!email || !password) {
            showMessage('Por favor, preencha todos os campos', 'error');
            return;
        }
        
        // Simulação de login - em produção, isso seria uma chamada à API
        loginUser(email, password);
    });
    
    // Tratamento de envio do formulário de cadastro
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = registerForm.querySelector('input[type="email"]').value;
        const password = registerForm.querySelector('input[type="password"]').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const termsAccepted = document.getElementById('terms').checked;
        
        // Validação básica
        if (!name || !email || !password || !confirmPassword) {
            showMessage('Por favor, preencha todos os campos', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showMessage('As senhas não coincidem', 'error');
            return;
        }
        
        if (!termsAccepted) {
            showMessage('Você precisa aceitar os termos de uso', 'error');
            return;
        }
        
        // Simulação de registro - em produção, isso seria uma chamada à API
        registerUser(name, email, password);
    });
    
    // Função para login
    function loginUser(email, password) {
        // Simulando uma requisição ao servidor
        setTimeout(() => {
            // Em um ambiente real, isso seria verificado no servidor
            // Aqui estamos apenas simulando para propósitos de demonstração
            const mockUser = {
                email: "usuario@exemplo.com",
                password: "senha123",
                name: "Usuário Teste"
            };
            
            if (email === mockUser.email && password === mockUser.password) {
                // Login bem-sucedido
                localStorage.setItem('currentUser', JSON.stringify({
                    email: mockUser.email,
                    name: mockUser.name
                }));
                
                showMessage('Login realizado com sucesso! Redirecionando...', 'success');
                
                // Atualizar o carrinho se necessário
                updateCartCount();
                
                // Redirecionar para a página inicial após 2 segundos
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                // Login falhou
                showMessage('Email ou senha incorretos', 'error');
            }
        }, 1000); // Simulando um atraso de rede
    }
    
    // Função para registro
    function registerUser(name, email, password) {
        // Simulando uma requisição ao servidor
        setTimeout(() => {
            // Em um ambiente real, isso seria processado no servidor
            // Aqui estamos apenas simulando para propósitos de demonstração
            localStorage.setItem('currentUser', JSON.stringify({
                email: email,
                name: name
            }));
            
            showMessage('Conta criada com sucesso! Redirecionando...', 'success');
            
            // Redirecionar para a página inicial após 2 segundos
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }, 1000); // Simulando um atraso de rede
    }
    
    // Função para mostrar mensagens ao usuário
    function showMessage(message, type) {
        // Remover mensagem anterior se existir
        const existingMessage = document.querySelector('.message-alert');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Criar novo elemento de mensagem
        const messageElement = document.createElement('div');
        messageElement.className = `message-alert ${type}`;
        messageElement.textContent = message;
        
        // Adicionar ao DOM
        const loginCard = document.querySelector('.login-card');
        loginCard.insertBefore(messageElement, loginCard.firstChild);
        
        // Remover após alguns segundos
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
    
    // Função para atualizar o contador do carrinho
    function updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCountElement.textContent = cart.length;
    }
    
    // Verificar se usuário já está logado
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        const loginHeader = document.querySelector('.login-header');
        loginHeader.innerHTML = `
            <h2>Bem-vindo, ${currentUser.name}!</h2>
            <p>Você já está conectado</p>
            <button id="logout-btn" class="btn-primary">Sair da conta</button>
        `;
        
        loginForm.style.display = 'none';
        registerContent.style.display = 'none';
        
        // Adicionar botão de logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.reload();
        });
    }
    
    // Inicializar contador do carrinho
    updateCartCount();
    
    // Funcionalidade do menu mobile
    const menuButton = document.querySelector('.menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            document.querySelector('.navbar').classList.toggle('show-menu');
        });
    }
    
    // Funcionalidade do carrinho
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    }
});