function Fundo(context, imagem, velocidade) {
    this.context = context;
    this.imagem = imagem;
    this.velocidade = velocidade;
    this.x = 0;
    this.y = 0;
    
    // Para repetição contínua, precisamos de duas cópias da imagem
    this.largura = imagem.width;
    this.altura = imagem.height;
}

Fundo.prototype = {
    atualizar: function(deslocamentoCamera) {
        // Move o fundo baseado no deslocamento da câmera e na velocidade da camada
        this.x -= deslocamentoCamera * this.velocidade;
        
        // Quando a primeira imagem sai completamente da tela, reposiciona
        if (this.x <= -this.largura) {
            this.x = 0;
        }
    },
    
    desenhar: function() {
        // Desenha a primeira imagem
        this.context.drawImage(this.imagem, this.x, this.y);
        
        // Desenha a segunda imagem para continuidade (lado direito)
        this.context.drawImage(this.imagem, this.x + this.largura, this.y);
        
        // Se necessário, desenha uma terceira imagem (para casos em que a velocidade é muito alta)
        if (this.x > -this.largura + this.context.canvas.width) {
            this.context.drawImage(this.imagem, this.x - this.largura, this.y);
        }
    }
};