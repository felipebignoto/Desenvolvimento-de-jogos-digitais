function Bola(context) {
   this.context = context;
   this.x = 0;
   this.y = 0;
   this.velocidadeX = 0;
   this.velocidadeY = 0;
   this.cor = "black";
   this.raio = 10;
   this.visivel = true;
   this.ultimoRetangColidido = -1;
   this.ocultoTimer = 0;
}

Bola.prototype = {
   atualizar: function() {
      var ctx = this.context;
      if (this.x < this.raio || this.x > ctx.canvas.width - this.raio)
         this.velocidadeX *= -1;
      if (this.y < this.raio || this.y > ctx.canvas.height - this.raio)
         this.velocidadeY *= -1;
      this.x += this.velocidadeX;
      this.y += this.velocidadeY;
      if (this.ocultoTimer > 0) {
         this.ocultoTimer--;
         this.visivel = false;
         if (this.ocultoTimer === 0) {
            this.visivel = true;
            this.ultimoRetangColidido = -1;
         }
      }
   },

   desenhar: function() {
      var ctx = this.context;
      if (!this.visivel) return;
      ctx.save();
      ctx.fillStyle = this.cor;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.raio, 0, 2 * Math.PI, false);
      ctx.fill();

      if (this.ultimoRetangColidido !== -1) {
         var rets = this.retangulosColisao();
         var r = rets[this.ultimoRetangColidido];
         if (r) {
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.strokeRect(r.x, r.y, r.largura, r.altura);
         }
      }

      ctx.restore();
   },

   retangulosColisao: function() {
      var largura = this.raio * 2;
      var altura = Math.round((this.raio * 2) / 3);
      return [
         { x: this.x - this.raio, y: this.y - this.raio, largura: largura, altura: altura },
         { x: this.x - this.raio, y: this.y - this.raio + altura, largura: largura, altura: altura },
         { x: this.x - this.raio, y: this.y - this.raio + altura * 2, largura: largura, altura: altura }
      ];
   },

   colidiumCom: function(sprite) {
      if (this.x < sprite.x)
         this.velocidadeX = -Math.abs(this.velocidadeX);
      else
         this.velocidadeX = Math.abs(this.velocidadeX);

      if (this.y < sprite.y)
         this.velocidadeY = -Math.abs(this.velocidadeY);
      else
         this.velocidadeY = Math.abs(this.velocidadeY);
   }
};

Bola.prototype.colidiuCom = function(outro) {
   this.velocidadeX *= -1;
   this.velocidadeY *= -1;
};
