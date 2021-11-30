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
		<GameWorld :online_screen="1" />
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
				<span class="back" @click="back_from_selecting_online">
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
				<div v-else-if="online.user === 'logging in'">
					<div class="login form">
						<div class="input_with_label">
							<div class="s_label">
								Username
							</div>
							<div class="s_input">
								<input name="user" class="user" type="text" required />
							</div>
						</div>
						<div class="input_with_label">
							<div class="s_label">
								Password
							</div>
							<div class="s_input">
								<input name="pass" class="pass" type="password" required />
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
								<input name="user" class="user" type="text" required />
							</div>
						</div>
						<div class="input_with_label">
							<div class="s_label">
								Password
							</div>
							<div class="s_input">
								<input name="pass" class="pass" type="password" required />
							</div>
						</div>
					</div>
					<div class="s_input">
						<button type="button" @click="log_in_button('error')">
							Log in
						</button>
					</div>
					<div class="form_error">
						Error, try again (TODO: change text)
					</div>
				</div>
				<div v-else-if="online.user === 'signing up'">
					<div class="signup form">
						<div class="input_with_label">
							<div class="s_label">
								Username
							</div>
							<div class="s_input">
								<input name="user" class="user" type="text" required />
							</div>
						</div>
						<div class="input_with_label">
							<div class="s_label">
								Password
							</div>
							<div class="s_input">
								<input name="pass" class="pass" type="password" required />
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
								<input name="user" class="user" type="text" required />
							</div>
						</div>
						<div class="input_with_label">
							<div class="s_label">
								Password
							</div>
							<div class="s_input">
								<input name="pass" class="pass" type="password" required />
							</div>
						</div>
						<div class="s_input">
							<button type="button" @click="sign_up_button('error')">
								Sign up
							</button>
						</div>
					</div>
					<div class="form_error">
						Error, try again (TODO: change text)
					</div>
				</div>
				<div v-else class="button" @click="new_online">
					New Game
				</div>
			</div>
		</div>
	</div>
</div>

</template>

<script>
import $ from 'jquery'
import '@/assets/styles.css';
import { bus } from '@/main'

import GameWorld from './GameWorld.vue';

let l = function (to_log) { 
	console.log(to_log) 
}


export default {
	components: {
		GameWorld
	},
	props: {	
	},
	methods: {
		back_after_end_game() {
			this.which_screen =  'show_menu'
			this.win_type =  null
			this.victory_or_defeat =  ''
			this.type_of_victory =  ''
		},
		back_from_pnp() {
			this.back_after_end_game()
		},
		back_from_selecting_online() {
			this.which_screen =  'show_menu'
		},
		back_from_online() {
			this.which_screen =  'show_selecting_online'
		},
		online_games() {
			this.which_screen =  'show_selecting_online'
		},
		to_log_in() {
			this.online.user = 'logging in'
		},
		to_sign_up() {
			this.online.user = 'signing up'
		},
		log_in_button(error = false) {
			
			var form_class
			if (error) {
				form_class = '.login_error.form'
			} else {
				form_class = '.login.form'
			}
			let user = $(form_class+' .user').val()
			
			
			// var server_request = new XMLHttpRequest()
			// 	
			// let get_url = 'http://gods.philosofiles.com/sync/?action=login&username=BLLLLLLLL&pw=29514'
			// 
			// server_request.open("GET", get_url, false) // false = synchronous
			// server_request.send()
			// 
			// const response = JSON.parse(server_request.responseText)
			// 
			// turn = response.turn
		},
		new_pass_and_play() {
			this.game_type = 'pnp'
			this.which_screen =  'show_pnp'
		},
		new_online() {
			this.game_type = 'online'
			this.which_screen =  'show_online'
			this.online_side =  1
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
			online_side: 1,
			win_type: null,
			victory_or_defeat: '',
			type_of_victory: '',
			online: {
				user: 'logging in', // 'Tomek'
				login_error: null,
				signup_error: null
			}
		}
	},
	created() {
		bus.$on('Winner', (e) => {
			
			if (this.game_type === 'online' && e.winner !== this.online_side) {
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