<template>
	<aside>
		<nav>
			<Menu :menuData="this.MenuItem" @expandSideMene="handelExpandEvent"/>
		</nav>
	</aside>

	<main> <router-view/> </main>
</template>

<script>
import Menu from './components/Menu.vue'
export default {
	components: { Menu },
	data(){ 
		return{ 
			MenuItem : []
		}
	},
	methods: {
		handelExpandEvent(id, expand) {
			let p = this.MenuItem.find(item => { 
				return item.id === id 
			})
			p.expand = expand
		}
	},
	mounted() {
		fetch('http://localhost:3000/menu')
			.then(res => res.json())
			.then(data => this.MenuItem = data)
			.catch(err => console.log(err.message))
	}
}
</script>

<style>
	#app { font-family: "DM Sans", serif;;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;text-align: center;color: #2c3e50;display:flex; font-size: 13px; }

	main { flex: 1 1 auto;background-color: whitesmoke; overflow: auto; height: 100vh; }
	aside { flex: 0 0 auto;width: 250px;height: 100vh; }
	aside nav { display: flex; flex-direction: column; padding: 5px; align-items: normal; margin-top: 100px; }
	aside nav a { padding: 10px 20px;display: flex; margin-bottom: 2px;display: flex; margin-bottom: 2px;border-left: 5px solid rgb(0,0,0, 0.1); justify-content: space-between; align-items: center; }
	aside nav a [smticon] { font-size: 14px; }
	aside nav a:hover { border-color: rgb(0,0,0, 0.3); }
	aside nav ul ul { margin-bottom: 5px; }
	aside nav ul ul a { border-left-width:1px; margin-left:2.5px; margin-bottom: 0; padding-left: 40px; }
	aside nav ul ul a.router-link-active { border-color: rgb(0, 98, 255); border-width: 2.5px; }
	aside nav ul ul.expand { display:flex }
	aside nav a.router-link-active { border-color: rgb(0, 98, 255); font-weight: 800; }

	.grid {display: grid;grid-template-columns: repeat(var(--fg), [col] 1fr);grid-gap: var(--gap); width: 100%;}
</style>




