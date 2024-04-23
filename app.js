
const app = {
	data () {
		return {
			palavras: [
				[],[],[],[],[],[]
			],
			dicas: [[],[],[],[],[],[]],
			sCol: 0,  //0-6
			sLin: 0,   //0-5
			showModal: "show",
			mensagem: "",
			titulo: "Começar jogo",
			lista: listaDePalavras, //Presente em lista_de_palavras.js
		}
	},
	methods: {
		teclar(a) {
			if(this.showModal == "show") return;
			if( a.keyCode >= 65 && a.keyCode <= 90) {
				if(this.sCol < 5) {
					this.palavras[this.sLin].push(a.key.toUpperCase());
				}
			}
			if (a.code == "Backspace") {
				this.palavras[this.sLin] = this.palavras[this.sLin].slice(0, -1);
			}
			if (a.key == "Enter") {
				let chute = this.palavras[this.sLin].join('').toLowerCase();
				if(!this.checar(chute)) {
					return;
				}

				if(this.darDica(chute)) {
					this.showModal = 'show';
					this.mensagem = `Você acertou em ${this.sLin + 1} tentativas`;
					this.titulo = "Vitória!";
				}
				this.sLin += 1;
				this.sCol = 0;
				if(this.sLin == 6) {
					this.showModal = 'show';
					this.mensagem = `A palavra era: ${this.palavraSelec.toUpperCase()}`;
					this.titulo = "Você perdeu...";
				}
			}
			this.sCol = this.palavras[this.sLin].length;
		},
		//Verifica se essa palavra existe
		checar(chute) {
			return this.lista.includes(chute.toLowerCase());
		},
		zerar() {
			this.palavras = [
				[],[],[],[],[],[]
			];
			this.dicas = [[],[],[],[],[],[]];
			this.sCol = 0;  //0-6
			this.sLin = 0;   //0-5
			this.lista = this.lista.map(p => p.toLowerCase());
		},
		novoJogo() {
			var tam = this.lista.length;
			this.palavraSelec = this.lista[Math.floor(Math.random() * tam)].toLowerCase();
			//console.log(this.palavraSelec);
			this.showModal = "oculto";
			this.zerar();
		},
		darDica(chute) {
			var dica = ['', '', '', '', ''];
			var classes = ["nada", "meio", "certo"];
			var pal = this.palavraSelec.toLowerCase();

			var certos = 0;
			for(var i = 0; i < 5; i++) {
				if(chute[i] == pal[i]) {
					dica[i] = "certo";
					pal = pal.replace(chute[i], '.');
					certos++;
				}
			}

			for(var i = 0; i < 5; i++) {
				if(dica[i] != '') continue;
				if(pal.includes(chute[i])) {
					dica[i] = "meio";
					pal = pal.replace(chute[i], '.');
				} else {
					dica[i] = "nada";
				}
			}
			this.dicas[this.sLin]= dica;
			if (certos == 5) {
				return true;
			}
			return false;
		}
	},
	mounted() {
		window.addEventListener("keyup", this.teclar);
	}
}
Vue.createApp(app).mount('#app')