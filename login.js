document.addEventListener('DOMContentLoaded', function() {
    // Selecionando elementos
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // Função para alternar entre abas
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover classe ativa de todos os botões
            tabBtns.forEach(b => b.classList.remove('active'));
            // Adicionar classe ativa ao botão clicado
            btn.classList.add('active');
            
            // Esconder todos os conteúdos
            tabContents.forEach(content => content.classList.add('hidden'));
            
            // Mostrar o conteúdo correspondente
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.remove('hidden');
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
    
    // Tratamento de envio do formulário de registro
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;
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
    
    // Verificar se usuário já está logado
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        const loginHeader = document.querySelector('.login-header');
        loginHeader.innerHTML = `
            <h2>Bem-vindo, ${currentUser.name}!</h2>
            <p>Você já está conectado</p>
            <button id="logout-btn" class="btn-primary">Sair da conta</button>
        `;
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });
        
        // Adicionar botão de logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.reload();
        });
    }
});