function GerenciadorParallax(context) {
    this.context = context;
    this.camadas = [];
    this.velocidadeCamera = 0;
}

GerenciadorParallax.prototype = {
    adicionarCamada: function(imagem, velocidade) {
        var fundo = new Fundo(this.context, imagem, velocidade);
        this.camadas.push(fundo);
    },
    
    adicionarChao: function(chao) {
        this.camadas.push(chao);
    },
    
    definirVelocidadeCamera: function(velocidade) {
        this.velocidadeCamera = velocidade;
    },
    
    atualizar: function() {
        // Atualiza todas as camadas com base na velocidade da câmera
        for (var i = 0; i < this.camadas.length; i++) {
            this.camadas[i].atualizar(this.velocidadeCamera);
        }
    },
    
    desenhar: function() {
        // Desenha todas as camadas em ordem (do fundo para frente)
        for (var i = 0; i < this.camadas.length; i++) {
            this.camadas[i].desenhar();
        }
    },
    
    limpar: function() {
        // Limpa o canvas antes de desenhar
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }
};