// Direções
var HOMEM_DIREITA = 1;
var HOMEM_ESQUERDA = 2;
var HOMEM_CIMA = 3;
var HOMEM_BAIXO = 4;

var HOMEM_NUM_LINHAS = 4;  
var HOMEM_NUM_COLUNAS = 6;  

function Homem(context, teclado, imagem) {
   this.context = context;
   this.teclado = teclado;
   this.x = 0;
   this.y = 0;
   this.velocidade = 4;

   this.sheet = new Spritesheet(context, imagem, HOMEM_NUM_LINHAS, HOMEM_NUM_COLUNAS);
   this.sheet.intervalo = 90;

   this.movendo = false;
   this.direcao = HOMEM_BAIXO;
}

Homem.prototype = {
   atualizar: function() {
      var movX = 0;
      var movY = 0;

      // Movimento baseado nas setas
      if (this.teclado.pressionada(SETA_DIREITA)) {
         movX = 1;
         this.direcao = HOMEM_DIREITA;
      }
      else if (this.teclado.pressionada(SETA_ESQUERDA)) {
         movX = -1;
         this.direcao = HOMEM_ESQUERDA;
      }
      else if (this.teclado.pressionada(SETA_CIMA)) {
         movY = -1;
         this.direcao = HOMEM_CIMA;
      }
      else if (this.teclado.pressionada(SETA_BAIXO)) {
         movY = 1;
         this.direcao = HOMEM_BAIXO;
      }

      this.movendo = (movX !== 0 || movY !== 0);

      if (this.movendo) {
         this.x += movX * this.velocidade;
         this.y += movY * this.velocidade;

         switch (this.direcao) {
            case HOMEM_BAIXO:    this.sheet.linha = 0; break;
            case HOMEM_ESQUERDA: this.sheet.linha = 1; break;
            case HOMEM_DIREITA:  this.sheet.linha = 2; break;
            case HOMEM_CIMA:     this.sheet.linha = this.sheet.numLinhas - 1; break;
         }
         if (this.sheet.coluna >= this.sheet.numColunas) this.sheet.coluna = 0;
         this.sheet.proximoQuadro();
      } else {
         this.sheet.coluna = 0; 
         switch (this.direcao) {
            case HOMEM_BAIXO:    this.sheet.linha = 0; break;
            case HOMEM_ESQUERDA: this.sheet.linha = 1; break;
            case HOMEM_DIREITA:  this.sheet.linha = 2; break;
            case HOMEM_CIMA:     this.sheet.linha = this.sheet.numLinhas - 1; break;
         }
      }

      // Limites do canvas
      var largura = this.sheet.imagem.width / this.sheet.numColunas;
      var altura = this.sheet.imagem.height / this.sheet.numLinhas;
      var canvas = this.context.canvas;
      if (this.x < 0) this.x = 0;
      if (this.y < 0) this.y = 0;
      if (this.x > canvas.width - largura) this.x = canvas.width - largura;
      if (this.y > canvas.height - altura) this.y = canvas.height - altura;
   },
   desenhar: function() {
      this.sheet.desenhar(this.x, this.y);
   }
};
