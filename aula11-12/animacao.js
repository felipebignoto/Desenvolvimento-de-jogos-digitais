function Animacao(context) {
   this.context = context;
   this.sprites = [];
   this.ligado = false;
}
Animacao.prototype = {
   novoSprite: function(sprite) {
      this.sprites.push(sprite);
   },
   ligar: function() {
      this.ligado = true;
      this.proximoFrame();
   },
   desligar: function() {
      this.ligado = false;
   },
   proximoFrame: function() {
      // Posso continuar?
      if ( ! this.ligado ) return;

      // A cada ciclo, limpamos a tela ou desenhamos um fundo
      this.limparTela();

      // Atualizamos o estado dos sprites
      for (var i in this.sprites)
         this.sprites[i].atualizar();

      // Desenhamos os sprites
      for (var i in this.sprites)
         this.sprites[i].desenhar();

      // Chamamos o próximo ciclo
      var animacao = this;
      requestAnimationFrame(function() {
         animacao.proximoFrame();
      });
   },
   limparTela: function() {
      var ctx = this.context;
      var w = ctx.canvas.width;
      var h = ctx.canvas.height;
      var grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0,   '#7EF97E');   
      grad.addColorStop(0.4, '#41C941');   
      grad.addColorStop(1,   '#0B3D0B');  
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
   }
}
