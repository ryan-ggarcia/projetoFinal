const apiUrl = 'http://localhost:3000/api';

// Função para listar eventos
const listEvents = async () => {
    try {
        const response = await fetch(`${apiUrl}/eventos`);
        const events = await response.json();
        const eventTable = document.getElementById('eventTable').getElementsByTagName('tbody')[0];
        const eventSelect = document.getElementById('eventSelect');
       
        // Limpar a tabela e o seletor de eventos
        eventTable.innerHTML = '';
        eventSelect.innerHTML = '';
       
        events.forEach(event => {
            // Preencher a tabela com eventos
            const row = eventTable.insertRow();
            row.innerHTML = `
                <td>${event.nome}</td>
                <td>${event.data}</td>
                <td>${event.local}</td>
                <td><button onclick="viewParticipants(${event.evento_id})">Ver Participantes</button></td>
            `;
           
            // Preencher o seletor de eventos para cadastrar participantes
            const option = document.createElement('option');
            option.value = event.evento_id;
            option.textContent = event.nome;
            eventSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao listar eventos:', error);
    }
};

// Função para cadastrar um evento
const createEvent = async (eventData) => {
    try {
        const response = await fetch(`${apiUrl}/eventos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar evento');
        }

        alert('Evento cadastrado com sucesso!');
        listEvents(); // Atualiza a lista de eventos
    } catch (error) {
        console.error('Erro ao cadastrar evento:', error);
    }
};

// Função para adicionar um participante a um evento

const createParticipant = async (eventoId, participantData) => {
    try {
        console.log("Evento ID selecionado:", eventoId); // Verificação do evento
        if (!eventoId) {
            alert('Por favor, selecione um evento.');
            return;
        }

        const response = await fetch(`${apiUrl}/participantes/${eventoId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(participantData),
        });

        const json = await response.json();
        if (response.status == 200) {
            
            alert('Participante cadastrado com sucesso!');
            viewParticipants(eventoId);
        }

        listEvents()
    } catch (error) {
        alert(`Erro ao cadastrar participante: ${error.message}`);
    }
};

// Função para visualizar os participantes de um evento
const viewParticipants = async (eventoId) => {
    try {
        const response = await fetch(`${apiUrl}/participantes/eventos/${eventoId}`);
        const participantes = await response.json();
        let participantsHtml = '';
        
        participantes.forEach(participant => {
            participantsHtml += `
                <div>
                    <p><strong>Nome:</strong> ${participant.nome}</p>
                    <p><strong>Email:</strong> ${participant.email}</p>
                    <p><strong>Telefone:</strong> ${participant.telefone}</p>
                    <hr>
                </div>
            `;
        });

        document.body.innerHTML = `
            <h1>Participantes do Evento</h1>
            ${participantsHtml}
            <a href="index.html">Voltar para lista de eventos</a>
        `;
    } catch (error) {
        console.error('Erro ao visualizar participantes:', error);
    }
    
};

// Inicialização - Listar eventos ao carregar a página
document.addEventListener('DOMContentLoaded', listEvents);

// Captura o evento de envio do formulário de evento
document.getElementById('eventForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const eventData = {
        nome: document.getElementById('eventName').value,
        data: document.getElementById('eventDate').value,
        local: document.getElementById('eventLocation').value,
        descricao: document.getElementById('eventDescription').value,
    };

    createEvent(eventData);
});

// Captura o evento de envio do formulário de participante
document.getElementById('participantForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const eventoId = document.getElementById('eventSelect').value;
    if (!eventoId) {
        alert('Por favor, selecione um evento.');
        return;
    }

    const participantData = {
        nome: document.getElementById('participantName').value,
        email: document.getElementById('participantEmail').value,
        telefone: document.getElementById('participantPhone').value,
    };
    createParticipant(eventoId, participantData);
});

