function Colisor() {
    this.sprites = [];
    this.aoColidir = null;
    this.contadores = {};
}

Colisor.prototype = {
    novoSprite: function(sprite) {
        this.sprites.push(sprite);
    },

    processar: function() {
        var jaTestado = {};
        for (var i = 0; i < this.sprites.length; i++) {
            for (var j = i + 1; j < this.sprites.length; j++) {
                var s1 = this.sprites[i];
                var s2 = this.sprites[j];
                var id1 = this.stringUnica(s1);
                var id2 = this.stringUnica(s2);
                if (!jaTestado[id1]) jaTestado[id1] = [];
                if (!jaTestado[id2]) jaTestado[id2] = [];
                if (!(jaTestado[id1].indexOf(id2) >= 0 || jaTestado[id2].indexOf(id1) >= 0)) {
                    this.testaColisao(s1, s2);
                    jaTestado[id1].push(id2);
                    jaTestado[id2].push(id1);
                }
            }
        }
    },

    stringUnica: function(sprite) {
        var str = '';
        var retangulos = sprite.retangulosColisao();

        for (var i in retangulos) {
            str += 'x:' + retangulos[i].x + ',' +
                    'y:' + retangulos[i].y + ',' +
                    'l:' + retangulos[i].largura + ',' +
                    'a:' + retangulos[i].altura + '\n';
        }

        return str;
    },

    testaColisao: function(sprite1, sprite2) {
        var rets1 = sprite1.retangulosColisao();
        var rets2 = sprite2.retangulosColisao();
        for (var i = 0; i < rets1.length; i++) {
            var r1 = rets1[i];
            for (var j = 0; j < rets2.length; j++) {
                var r2 = rets2[j];
                if (this.retangulosColidem(r1, r2)) {
                    if (sprite1.colidiuCom) sprite1.colidiuCom(sprite2);
                    if (sprite2.colidiuCom) sprite2.colidiuCom(sprite1);

                    var key = this._keyPar(sprite1, sprite2);
                    if (!this.contadores[key]) this.contadores[key] = 0;
                    this.contadores[key]++;

                    if (this.aoColidir) this.aoColidir(sprite1, sprite2, i, j, this.contadores[key]);

                    return;
                }
            }
        }
    },

    _keyPar: function(s1, s2) {
        var id1 = this.stringUnica(s1);
        var id2 = this.stringUnica(s2);
        return id1 < id2 ? id1 + '|' + id2 : id2 + '|' + id1;
    },

    retangulosColidem: function(r1, r2) {
        return (
            r1.x < r2.x + r2.largura &&
            r1.x + r1.largura > r2.x &&
            r1.y < r2.y + r2.altura &&
            r1.y + r1.altura > r2.y
        );
    }
};
