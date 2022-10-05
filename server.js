const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const porta = 8080;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/processa-calc', (req, res) => {
    const valor1 = parseInt(req.body.fValor1);
    const valor2 = parseInt(req.body.fValor2);
    const operacao = parseInt(req.body.fOperacao);

    let msgAlert = 'O resultado da operação foi: ';
    
    switch (operacao) {
        case 1:
            resultado = valor1 + valor2; break;
        case 2:
            resultado = valor1 - valor2; break;
        case 3:
            resultado = valor1 * valor2; break;
        case 4:
            if (valor2 == 0) {
                msgAlert = 'Impossível dividir por zero!';
                resultado = '';
            } else {
                resultado = valor1 / valor2;
            }
            break;
        default:
            resultado = 0;
    }

    msgAlert += resultado;
    let mensagem = `<h3><div class="alert alert-primary">${msgAlert}</div></h3>`;

    HTML = `
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" crossorigin="anonymous">

        <div class="container" style="margin-top: 0.5rem">
            ${mensagem}
            
            <button type="button" onclick="window.history.back()" class="btn btn-outline-danger">
                <i class="fas fa-door-open"></i>
                Voltar
            </button>
            &nbsp
            <button type="button" onclick="alert('${msgAlert}');" class="btn btn-primary">
                    <i class="fab fa-js-square"></i></i>
                    JavaScript
            </button>
        </div>
    `;

    res.send(HTML);
});

app.get('/', (request, response) => {
    response.status(200).send();
});

app.listen(porta, () => console.log(`Servidor iniciado na porta: ${porta}`));