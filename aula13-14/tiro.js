function Tiro(context, nave, offsetX) {
    this.context = context;
    this.nave = nave;
    this.largura = 4;
    this.altura = 20;
    this.velocidade = 10;
    this.cor = "red";

    var naveWidth = nave.imagem.width;
    this.x = nave.x + naveWidth / 2 + offsetX - this.largura / 2;
    this.y = nave.y - this.altura;
}
Tiro.prototype = {
    atualizar: function() {
        this.y -= this.velocidade;
    },
    desenhar: function() {
        var ctx = this.context;
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
        ctx.restore();
    }
}