function Nave(context, teclado, imagem) {
   this.context = context;
   this.teclado = teclado;
   this.imagem = imagem;
   this.x = 0;
   this.y = 0;
   this.velocidade = 0;
}
Nave.prototype = {
   atualizar: function() {
      if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0)
         this.x -= this.velocidade;
         
      if (this.teclado.pressionada(SETA_DIREITA) && 
               this.x < this.context.canvas.width - this.imagem.width)
         this.x += this.velocidade;
         
      if (this.teclado.pressionada(SETA_CIMA) && this.y > 0)
         this.y -= this.velocidade;
         
      if (this.teclado.pressionada(SETA_BAIXO) &&
               this.y < this.context.canvas.height - this.imagem.height)
         this.y += this.velocidade;
   },
   desenhar: function() {
      this.context.drawImage(this.imagem, this.x, this.y, 
            this.imagem.width, this.imagem.height);
   },
   atirar: function() {
      if (typeof window.animacao !== 'undefined') {
         // Usando fração da largura da nave para offset automático
         var offsetEsquerda = -this.imagem.width * 0.3;
         var offsetDireita = this.imagem.width * 0.3;
         var t1 = new Tiro(this.context, this, offsetEsquerda);
         var t2 = new Tiro(this.context, this, offsetDireita);
         window.animacao.novoSprite(t1);
         window.animacao.novoSprite(t2);
      }
   }
}
