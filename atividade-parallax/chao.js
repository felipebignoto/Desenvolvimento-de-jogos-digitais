function Chao(context, larguraCanvas, alturaCanvas) {
    this.context = context;
    this.larguraCanvas = larguraCanvas;
    this.alturaCanvas = alturaCanvas;
    this.x = 0;
    this.velocidade = 1.0; // Velocidade máxima para o chão (mais próximo)
    
    // Configurações do chão
    this.altura = 100; // Altura do chão em pixels
    this.y = alturaCanvas - this.altura; // Posição Y do chão (na parte inferior)
    
    // Padrão do chão
    this.larguraTile = 50; // Largura de cada "ladrilho" do chão
    this.cores = ['#654321', '#8B4513', '#A0522D']; // Tons de marrom para o chão
}

Chao.prototype = {
    atualizar: function(deslocamentoCamera) {
        // Move o chão baseado no deslocamento da câmera
        this.x -= deslocamentoCamera * this.velocidade;
        
        // Quando um tile sai completamente da tela, reposiciona
        if (this.x <= -this.larguraTile) {
            this.x = 0;
        }
    },
    
    desenhar: function() {
        var ctx = this.context;
        
        // Desenha o chão básico
        ctx.fillStyle = '#8B4513'; // Cor base do chão
        ctx.fillRect(0, this.y, this.larguraCanvas, this.altura);
        
        // Desenha padrão de ladrilhos
        var numTiles = Math.ceil(this.larguraCanvas / this.larguraTile) + 2; // +2 para garantir cobertura completa
        
        for (var i = -1; i < numTiles; i++) {
            var tileX = this.x + (i * this.larguraTile);
            
            // Varia a cor baseada na posição
            var corIndex = Math.abs(i) % this.cores.length;
            ctx.fillStyle = this.cores[corIndex];
            
            // Desenha retângulo do ladrilho
            ctx.fillRect(tileX, this.y, this.larguraTile - 2, this.altura);
            
            // Adiciona detalhes ao chão
            ctx.fillStyle = '#654321'; // Cor mais escura para detalhes
            
            // Linhas de separação
            ctx.fillRect(tileX + this.larguraTile - 2, this.y, 2, this.altura);
            
            // Pequenos detalhes (pedras/texturas)
            for (var j = 0; j < 3; j++) {
                var detX = tileX + (j * 15) + 5;
                var detY = this.y + 10 + (j * 20);
                ctx.fillRect(detX, detY, 3, 2);
            }
        }
        
        // Borda superior do chão (grama/transição)
        ctx.fillStyle = '#228B22'; // Verde para simular grama
        ctx.fillRect(0, this.y - 5, this.larguraCanvas, 5);
        
        // Pequenos detalhes de grama
        ctx.fillStyle = '#32CD32'; // Verde mais claro
        for (var k = 0; k < this.larguraCanvas; k += 10) {
            var grassX = (k + this.x * 0.5) % this.larguraCanvas;
            ctx.fillRect(grassX, this.y - 3, 2, 3);
        }
    }
};