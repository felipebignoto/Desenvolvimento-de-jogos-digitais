// Direções
var SONIC_DIREITA = 1;
var SONIC_ESQUERDA = 2;

var SONIC_NUM_LINHAS = 3;  
var SONIC_NUM_COLUNAS = 8;  

function Sonic(context, teclado, imagem) {
   this.context = context;
   this.teclado = teclado;
   this.x = 0;
   this.y = 0;
   this.velocidade = 4;

   this.sheet = new Spritesheet(context, imagem, SONIC_NUM_LINHAS, SONIC_NUM_COLUNAS);
   this.sheet.intervalo = 60;

   this.movendo = false;
   this.direcao = SONIC_DIREITA;
   this.velocidadeCamera = 0; // Para controlar o parallax
}

Sonic.prototype = {
   atualizar: function() {
      var movX = 0;
      var movY = 0;

      // Movimento baseado nas setas (apenas horizontal)
      if (this.teclado.pressionada(SETA_DIREITA)) {
         movX = 1;
         this.direcao = SONIC_DIREITA;
      }
      else if (this.teclado.pressionada(SETA_ESQUERDA)) {
         movX = -1;
         this.direcao = SONIC_ESQUERDA;
      }

      this.movendo = (movX !== 0);
      
      // Define velocidade da câmera para o parallax
      this.velocidadeCamera = movX * this.velocidade;

      if (this.movendo) {
         this.x += movX * this.velocidade;
         // Não há movimento vertical

         switch (this.direcao) {
            case SONIC_DIREITA:  this.sheet.linha = 1; break;
            case SONIC_ESQUERDA: this.sheet.linha = 2; break;
         }
         if (this.sheet.coluna >= this.sheet.numColunas) this.sheet.coluna = 0;
         this.sheet.proximoQuadro();
      } else {
         this.velocidadeCamera = 0; // Para quando não está se movendo
         this.sheet.coluna = 0; 
         switch (this.direcao) {
            case SONIC_DIREITA:  this.sheet.linha = 1; break;
            case SONIC_ESQUERDA: this.sheet.linha = 2; break;
         }
      }

      // Limites do canvas (apenas horizontal)
      var largura = this.sheet.imagem.width / this.sheet.numColunas;
      var canvas = this.context.canvas;
      
      if (this.x < 0) this.x = 0;
      if (this.x > canvas.width - largura) this.x = canvas.width - largura;
      // Posição Y é fixa (sobre o chão)
   },
   desenhar: function() {
      this.sheet.desenhar(this.x, this.y);
   }
};