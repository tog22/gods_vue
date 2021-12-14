<template>

<div class="game_world_root mob_style dev" :class="[game_type, which_screen]">
	<div id="pnp_game" class="screen">
		<div class="menu_bar">
			<div class="s_left">
				<span class="back" @click="back_from_pnp">
					⬅️
				</span>
			</div>
			<div class="s_middle">
				<h1>
					Path of the Gods
				</h1>
			</div>
			<div class="s_right">
				
			</div>
		</div>
		<GameWorld :online_screen="0" />
	</div>
	<div id="online_game" class="screen">
		<div class="menu_bar">
			<div class="s_left">
				<span class="back" @click="back_from_online">
					⬅️
				</span>
			</div>
			<div class="s_middle">
				<h1>
					Path of the Gods
				</h1>
			</div>
			<div class="s_right">
				
			</div>
		</div>
		<GameWorld v-if="which_screen === 'show_online'" :online_screen="1" :online="online" />
	</div>
	<div id="end_game" class="screen">
		<div id="win_text">
			<div id="victory" v-html="victory_or_defeat">
			</div>
			<div id="type_of_victory" v-html="type_of_victory">
			</div>
			<div id="menu_button_after_victory" @click="back_after_end_game">
				Back to menu
			</div>
		</div>
	</div>
	<div id="menu" class="screen">
		<h1>
			Path of the Gods
		</h1>
		<div id="menu_buttons">
			<div class="button" @click="new_pass_and_play">
				Pass &amp; Play
			</div>
			<div class="button" @click="online_games">
				Play Online
			</div>
			<div class="button">
				View Rules
			</div>
		</div>
	</div>
	<div id="selecting_online" class="screen">
		<div class="menu_bar">
			<div class="s_left">
				<span class="back" @click="back_within_selecting_online">
					⬅️
				</span>
			</div>
			<div class="s_middle">
				<h1>
					Path of the Gods
				</h1>
			</div>
			<div class="s_right">
				
			</div>
		</div>
		<div id="inner_selecting_online">
			<h2>
				Online Games
			</h2>
			<div id="menu_buttons">
				<div v-if="!online.user" class="button" @click="to_log_in">
					Log In
				</div>
				<div v-if="!online.user" class="button" @click="to_sign_up">
					Sign Up
				</div>
				<div v-else-if="online.user === 'logging_in'">
					<div class="login form">
						<div class="input_with_label">
							<div class="s_label">
								Username
							</div>
							<div class="s_input">
								<input name="user" id="log_u" class="user" type="text" required />
							</div>
						</div>
						<div class="input_with_label">
							<div class="s_label">
								Password
							</div>
							<div class="s_input">
								<input name="pass" id="log_p" class="pass" type="password" required />
							</div>
						</div>
						<div class="s_input">
							<button type="button" @click="log_in_button()">
								Log in
							</button>
						</div>
					</div>
				</div>
				<div v-else-if="online.user === 'login_error'">
					<div class="login_error form">
						<div class="input_with_label">
							<div class="s_label">
								Username
							</div>
							<div class="s_input">
								<input name="user" id="log_err_u" class="user" type="text" required />
							</div>
						</div>
						<div class="input_with_label">
							<div class="s_label">
								Password
							</div>
							<div class="s_input">
								<input name="pass" id="log_err_p" class="pass" type="password" required />
							</div>
						</div>
						<div class="s_input">
							<button type="button" @click="log_in_button('error')">
								Log in
							</button>
						</div>
					</div>
					<div class="form_error">
						{{online.login_error}}
					</div>
				</div>
				<div v-else-if="online.user === 'signing_up'">
					<div class="signup form">
						<div class="input_with_label">
							<div class="s_label">
								Username (no spaces)
							</div>
							<div class="s_input">
								<input name="user" class="user" id="su_u" type="text" required />
							</div>
						</div>
						<div class="input_with_label">
							<div class="s_label">
								Password
							</div>
							<div class="s_input">
								<input name="pass" class="pass" id="su_p" type="password" required />
							</div>
						</div>
						<div class="s_input">
							<button type="button" @click="sign_up_button()">
								Sign up
							</button>
						</div>
					</div>
				</div>
				<div v-else-if="online.user === 'signup_error'">
					<div class="signup_error form">
						<div class="input_with_label">
							<div class="s_label">
								Username
							</div>
							<div class="s_input">
								<input name="user" id="su_err_u" class="user" type="text" required />
							</div>
						</div>
						<div class="input_with_label">
							<div class="s_label">
								Password
							</div>
							<div class="s_input">
								<input name="pass" id="su_err_p" class="pass" type="password" required />
							</div>
						</div>
						<div class="s_input">
							<button type="button" @click="sign_up_button('error')">
								Sign up
							</button>
						</div>
					</div>
					<div class="form_error">
						{{online.signup_error}}
					</div>
				</div>
				<div v-else>
				
					<div v-if="online.subscreen === 'user menu' ">
						<div class="button" @click="new_online">
							New Game
						</div>
						<div class="button" @click="continue_online">
							Continue Game
						</div>
					</div>
					
					<div v-else-if="online.subscreen === 'select opponent' ">
						<div class="form">
							<div class="input_with_label">
								<div class="s_label">
									Opponent's username
								</div>
								<div class="s_input">
									<input name="opponent" id="newg_opponent" type="text" required />
								</div>
							</div>
							<div class="s_input">
								<button type="button" @click="select_opponent">
									Start game
								</button>
							</div>
							<div class="form_error">
								{{online.error}}
							</div>
						</div>
					</div>
					
					<div v-else-if="online.subscreen === 'continue online' ">
						
						<div v-if="online.has_current_games">
							<div
								v-for="(listed_game, lg_index) in online.games" 
									:key="'lg'+lg_index"
									@click="load_game(listed_game.id, listed_game.game_pass, listed_game.side)"
									class="button continue_game_button"
							>
								{{listed_game.opponent}}
							</div>
						</div>
						
						<div v-else>
							<div class="no_current_games">
								No current games
							</div>
						</div>
							
					</div>
					
				</div>
			</div>
		</div>
	</div>
</div>

</template>

<script>
import '@/assets/styles.css';
import { bus } from '@/main'

import GameWorld from './GameWorld.vue';

let l = function (to_log) { 
	console.log(to_log) 
}
let lo = l


export default {
	components: {
		GameWorld
	},
	props: {	
	},
	methods: {
		back_after_end_game() {
			this.which_screen = 'show_menu'
			this.win_type = null
			this.victory_or_defeat =  ''
			this.type_of_victory =  ''
		},
		back_from_pnp() {
			this.back_after_end_game()
		},
		back_within_selecting_online() {
			switch (this.online.subscreen) {
				case 'login or signup':
				case 'user menu':
					this.which_screen =  'show_menu'
					break
				case 'select opponent':
				case 'continue online':
					this.online.subscreen = 'user menu'
					break
				default:
					this.which_screen =  'show_menu'
					break
			}
			
			console.log(this)
			if (this.online.user === 'logging_in' || this.online.user === 'signing_up') {
				this.online.user = ''
			}
		},
		back_from_online() {
			this.which_screen =  'show_selecting_online'
		},
		online_games() {
			this.which_screen =  'show_selecting_online'
			this.online.subscreen = 'login or signup'
		},
		to_log_in() {
			this.online.user = 'logging_in'
		},
		to_sign_up() {
			this.online.user = 'signing_up'
		},
		debug() {
			lo(this)
		},
		log_in_button(error = false) {
			
			var user
			var pw
			if (error) {
				user = document.getElementById('log_err_u').value
				pw = document.getElementById('log_err_p').value
			} else {
				user = document.getElementById('log_u').value
				pw = document.getElementById('log_p').value
			}
			
			var server_request = new XMLHttpRequest()
				
			let get_url = 'http://gods.philosofiles.com/sync/?action=login&username='+user+'&pw='+pw
			//lo(get_url)
			
			server_request.open("GET", get_url, false)
			server_request.send()
			
			const response = JSON.parse(server_request.responseText)
			lo(response)
			
			if (response.result === 'success') {
				this.online.user = user
				this.online.userpass = pw
				this.online.subscreen = 'user menu'
			} else if (response.result === "un or pw wrong") {
				this.which_screen = 'show_selecting_online'
				this.online.user = 'login_error'
				this.online.login_error='Wrong username or password'
			} else {
				// todo: general error message
				alert('other error')
			}
			
		},
		sign_up_button(error = false) {
			
			var user
			var pw
			if (error) {
				user = document.getElementById('su_err_u').value
				pw = document.getElementById('su_err_p').value
			} else {
				user = document.getElementById('su_u').value
				pw = document.getElementById('su_p').value
			}
			
			var server_request = new XMLHttpRequest()
				
			let get_url = 'http://gods.philosofiles.com/sync/?action=signup&username='+user+'&pw='+pw
			//lo(get_url)
			
			server_request.open("GET", get_url, false)
			server_request.send()
			
			const response = JSON.parse(server_request.responseText)
			lo(response)
			
			if (response.result === 'success') {
				this.online.user = user
				this.online.subscreen = 'user menu'
			} else if (response.result === "sql error") {
				this.which_screen = 'show_selecting_online'
				this.online.user = 'signup_error'
				if (response.error_number === '1062') {
					this.online.signup_error='Username already taken'
				} else {
					this.online.signup_error='Unknown error'
				}
			} else {
				// todo: general error message
				alert('other error')
			}
			
		},
		new_online() {
			this.online.subscreen = 'select opponent'
		},
		select_opponent() {
			
			var opp = document.getElementById('newg_opponent').value
			var server_request = new XMLHttpRequest()
							
			let get_url = 'http://gods.philosofiles.com/sync/?action=find_user&user='+opp
			lo(get_url)
			
			server_request.open("GET", get_url, false)
			server_request.send()
			
			const response = JSON.parse(server_request.responseText)
			
			if (response.result === 'failure') {
				this.online.error = 'Opponent not found'
			} else if (response.result === 'success') {
				
				let pw = Math.floor(Math.random() * 32000)
				
				server_request = new XMLHttpRequest()
				get_url = 'http://gods.philosofiles.com/sync/?action=create&pw='+pw+'&p1='+this.online.user+'&p2='+opp
				
				server_request.open("GET", get_url, false)
				server_request.send()
				
				const response = JSON.parse(server_request.responseText)
				
				if (response.result === 'success') {
					this.game_type = 'online'
					this.which_screen =  'show_online'
					this.online.side =  1
					this.online.game_id = response.game_id
					this.online.game_pass = pw
				} else {
					this.online.error = 'Failed to create game'
				}
				
			} else {
				this.online.error = 'Unknown error'
			}
			
		},
		continue_online() {
			
			let server_request = new XMLHttpRequest()
			let get_url = 'https://gods.philosofiles.com/sync/?action=list_games&username='+this.online.user+'&userpass='+this.online.userpass
			lo(get_url)
			
			server_request.open("GET", get_url, false)
			server_request.send()
			
			const response = JSON.parse(server_request.responseText)
			
			if (response.result === 'failure' || !response.games_found) {
				alert("You don't have any active games")
				return
				// todo: change
			}
			
			this.online.games = response.games
			this.online.subscreen = 'continue online'
			
		},
		load_game(id, pw, side) {
			this.game_type = 'online'
			this.which_screen =  'show_online'
			this.online.game_id = id
			this.online.game_pass = pw
			this.online.side =  side
		},
		new_pass_and_play() {
			this.game_type = 'pnp'
			this.which_screen =  'show_pnp'
		},
		test_online_game() {
			this.game_type = 'online'
			this.which_screen =  'show_online'
		}
	},
	data() {
		return {
			which_screen: 'show_selecting_online', 
			// ↑ Options: show_menu/show_selecting_online/show_online/show_pnp/show_end
			game_type: 'online',
			win_type: null,
			victory_or_defeat: '',
			type_of_victory: '',
			online: {
				user: 'Tomek', // Tomek/logging_in/etc
				userpass: 'pass',
				game_id: null,
				game_pass: null,
				side: null,
				subscreen: 'user menu', // default = 'user menu'
				error: '',
				login_error: null,
				signup_error: null,
				has_current_games: true, // todo, low: set
				games: [
					/*
					{
						opponent: 'Mel',
						id: 21,
						game_pass: 21449,
						side: 1
					}
					*/
				]
			}
		}
	},
	created() {
		bus.$on('Winner', (e) => {
			
			if (this.game_type === 'online' && e.winner !== this.online.side) {
				this.victory_or_defeat = 'Defeat!'
				switch (e.win_type) {
					case 'Heartland reached':
						this.type_of_victory = 'The heathens have reached our heartland, and begun to lead our people astray by spreading their false faith'
						break;
					case 'Faith extinguished':
						this.type_of_victory = 'The influx of foreign missionaries has shaken the faith of even our most inspired priesthood. It is as if our God has deserted us.'
						break;
					default: 
						this.type_of_victory = 'The one true faith has been destroyed, and falsehood has prevailed'
						// ↑ A fallback, not actually used
						break;
				}	
			} else {
				this.victory_or_defeat = 'Victory'
				switch (e.win_type) {
					case 'Heartland reached':
						this.type_of_victory = "A divinely inspired monk or abbot reaches the other side's heartland, and begins to convert its populace to the one true faith"
						break;
					case 'Faith extinguished':
						this.type_of_victory = 'The opposing faith was extinguished, leaving the path clear for the conversion of its former believers'
						break;
					default: 
						this.type_of_victory = 'The one true faith prevails'
						// ↑ A fallback, not actually used
						break;
				}	
			}
			
			this.which_screen = 'show_end'			
			
		})	
	},
	computed: {
	}
};
</script>