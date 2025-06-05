class Parquimetro {
    constructor(valor) {
        this.valor = valor;
        this.tempo = 0;
        this.troco = 0;
    }

    calcularTempo() {
        if (this.valor < 1) {
            return "Valor insuficiente. Insira no mínimo R$ 1,00.";
        }

        // Regras base
        const tabela = [
            { valor: 3.00, tempo: 120 },
            { valor: 1.75, tempo: 60 },
            { valor: 1.00, tempo: 30 },
        ];

        for (let item of tabela) {
            if (this.valor >= item.valor) {
                this.tempo = item.tempo;
                this.troco = this.valor - item.valor;
                return `Tempo: ${this.tempo} minutos<br>Troco: R$ ${this.troco.toFixed(2).replace('.', ',')}`;
            }
        }

        // Proporcional entre R$1,00 e R$1,75 ou entre R$1,75 e R$3,00
        if (this.valor > 1 && this.valor < 1.75) {
            const minutosExtras = ((this.valor - 1) / 0.75) * 30;
            this.tempo = 30 + Math.round(minutosExtras);
            return `Tempo proporcional: ${this.tempo} minutos<br>Troco: R$ 0,00`;
        }

        if (this.valor > 1.75 && this.valor < 3.00) {
            const minutosExtras = ((this.valor - 1.75) / 1.25) * 60;
            this.tempo = 60 + Math.round(minutosExtras);
            return `Tempo proporcional: ${this.tempo} minutos<br>Troco: R$ 0,00`;
        }
    }
}

function obterValorInserido() {
    return parseFloat(document.getElementById('valorInserido').value);
}

function simularParquimetro() {
    const valor = obterValorInserido();

    const mensagemElemento = document.getElementById('mensagem');

    if (isNaN(valor)) {
        mensagemElemento.innerHTML = "Por favor, insira um valor válido.";
        return;
    }

    const parquimetro = new Parquimetro(valor);
    const resultado = parquimetro.calcularTempo();

    mensagemElemento.innerHTML = resultado;
}
