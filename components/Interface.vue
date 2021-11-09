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
			<div class="button" @click="test_online_game">
				Online Test
			</div>
			<div class="button">
				View Rules
			</div>
		</div>
	</div>
</div>
</template>

<script>
import '@/assets/styles.css';
import { bus } from '@/main'

import GameWorld from './GameWorld.vue';


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
			which_screen: 'show_menu', // (Options: show_menu/show_pnp/show_end)
			game_type: 'online',
			online_side: 1,
			win_type: null,
			victory_or_defeat: '',
			type_of_victory: '',
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
};
</script>