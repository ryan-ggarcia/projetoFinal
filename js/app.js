// app.js

const apiUrl = 'http://localhost:3000/api';
let jwtToken = '';

// Função para armazenar o token JWT no localStorage
const saveToken = (token) => {
    localStorage.setItem('jwtToken', token);
};

// Função para obter o token JWT do localStorage
const getToken = () => {
    return localStorage.getItem('jwtToken');
};

// Função para verificar o login
const login = async (email, password) => {
    try {
        const response = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            jwtToken = data.token;
            saveToken(jwtToken);
            window.location.href = 'events.html'; // Redireciona para a página de eventos
        } else {
            document.getElementById('error-message').textContent = data.message;
        }
    } catch (error) {
        console.error(error);
        document.getElementById('error-message').textContent = 'Erro na comunicação com o servidor.';
    }
};

// Função para cadastrar evento
const createEvent = async (eventData) => {
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/eventos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(eventData)
        });

        const data = await response.json();
        if (response.ok) {
            alert('Evento criado com sucesso');
            window.location.reload(); // Recarrega a página para mostrar o novo evento
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao criar evento');
    }
};

// Função para listar eventos
const listEvents = async () => {
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/eventos`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const events = await response.json();
        const tableBody = document.getElementById('eventTable').getElementsByTagName('tbody')[0];

        events.forEach(event => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${event.nome}</td>
                <td>${event.data}</td>
                <td>${event.local}</td>
                <td><button onclick="viewParticipants(${event.evento_id})">Ver Participantes</button></td>
            `;
        });
    } catch (error) {
        console.error(error);
    }
};

// Função para exibir os participantes de um evento
const viewParticipants = async (eventId) => {
    // Redireciona para a página de participantes com o ID do evento
    window.location.href = `participants.html?event_id=${eventId}`;
};

// Função para cadastrar participantes
const createParticipant = async (participantData, eventId) => {
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/eventos/${eventId}/participants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(participantData)
        });

        const data = await response.json();
        if (response.ok) {
            alert('Participante cadastrado com sucesso');
            window.location.reload();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao cadastrar participante');
    }
};

// Função de manipulação do formulário de login
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
});

// Função de manipulação do formulário de evento
document.getElementById('eventForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('eventName').value;
    const data = document.getElementById('eventDate').value;
    const local = document.getElementById('eventLocation').value;
    const descricao = document.getElementById('eventDescription').value;
    createEvent({ nome, data, local, descricao });
});

// Função de carregamento dos eventos ao carregar a página
window.onload = () => {
    if (document.getElementById('eventTable')) {
        listEvents();
    }
};
