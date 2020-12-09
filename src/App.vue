<template>
	<div id="app" class="container">
		<h1>HTTP com VueJS, Axios e Firebase</h1>
		<b-alert 
			show 
			dismissible
			v-for="mensagem in mensagens" 
			:key="mensagem.text"
			:variant="mensagem.type"
		>
			{{ mensagem.text }}
		</b-alert>
		<b-card>
			<b-form-group label="Nome:">
				<b-form-input 
					type="text" 
					size="lg"
					v-model="usuario.nome"
					placeholder="Insira o nome completo"
				>
				</b-form-input>
			</b-form-group>
			<b-form-group label="E-mail:">
				<b-form-input 
					type="email" 
					size="lg"
					v-model="usuario.email"
					placeholder="Insira um e-mail válido"
				>
				</b-form-input>
			</b-form-group>
			<b-form-group>
				<b-button 
					size="lg"
					variant="primary"
					@click="salvarOuAlterarUsers"
				>
					ENVIAR
				</b-button>
				<b-button 
					class="ml-2"
					size="lg"
					variant="success"
					@click="listarUsers"
				>
					LISTAR USUÁRIOS
				</b-button>
			</b-form-group>
		</b-card>
		<b-list-group>
			<b-list-group-item v-for="(usuario, id) in usuarios" :key="id">
				<strong>ID: </strong>{{id}}<br>
				<strong>Nome: </strong>{{usuario.nome}}<br>
				<strong>E-mail: </strong>{{usuario.email}}<br>
				<b-button 
					size="lg"
					variant="warning"
					@click="carregarUser(id)"
				>
					CARREGAR USUÁRIO
				</b-button>
				<b-button 
					class="ml-2"
					size="lg"
					variant="danger"
					@click="excluirUser(id)"
				>
					EXCLUIR USUÁRIO
				</b-button>
			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
export default {
	data() {
		return {
			id: null,
			usuarios: [],
			usuario: {
				nome: '',
				email: ''
			},
			mensagens: []
		}
	},
	methods: {
		limparForm() {
			this.usuario.nome = '',
			this.usuario.email = '',
			this.id = null
		},
		listarUsers() {
			this.$api.get('usuarios.json')
				.then(res => {
					return res,
					this.usuarios = res.data
				})
		},
		salvarOuAlterarUsers() {
			let method = this.id ? 'patch' : 'post'
			let finalURL = this.id ? `/${this.id}.json` : '.json'
			this.$api[method](`usuarios${finalURL}`, this.usuario)
				.then(res => {
					return res,
					this.limparForm(),
					this.listarUsers(),
					this.mensagens.push({
						text: 'O Usuário foi salvo ou editado com sucesso!',
						type: 'success'
					})
				})
		},
		carregarUser(id) {
			this.id = id
			this.usuario = {...this.usuarios[id]}
			console.log(this.id)
		},
		excluirUser(id) {
			this.$api.delete(`usuarios/${id}.json`)
				.then(res => {
					return res,
					this.limparForm(),
					this.listarUsers()
				}).catch(err => {
					this.mensagens.push({
						text: `Ocorreu um erro ao tentar apagar o registro! ${err}`,
						type: 'danger'
					})
				})
		}
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 1.5rem;
}

#app h1 {
	text-align: center;
	margin: 50px;
}
</style>
