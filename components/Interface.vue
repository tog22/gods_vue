<template>
<div class="game_world_root mob_style" :class="[game_type, is_in_dev, which_screen]">
	<div id="active_game">
		<div class="menu_bar">
			<div class="s_left">
				<span class="back">
					⬅️
				</span>
			</div>
			<div class="s_middle">
				<h1>
					Gods
				</h1>
			</div>
			<div class="s_right">
				
			</div>
		</div>
		<GameWorld :online_screen="0" />
	</div>
	<div id="won_game">
		<div id="win_text">
			<div id="victory" v-html="victory_or_defeat">
			</div>
			<div id="type_of_victory" v-html="type_of_victory">
			</div>
			<div id="menu_button_after_victory" @click="back_to_menu">
				Back to menu
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
		back_to_menu() {
			this.which_screen =  'menu'
			this.game_type =  'online'
			this.online_side =  1
			this.win_type =  null
			this.victory_or_defeat =  ''
			this.type_of_victory =  ''
		}
	},
	data() {
		return {
			which_screen: 'active', // (Options: menu/active/victory_or_defeat)
			game_type: 'online',
			online_side: 1,
			win_type: null,
			victory_or_defeat: '',
			type_of_victory: '',
			is_in_dev: 'dev'
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
			
			this.which_screen = 'victory_or_defeat'			
			
		})	
	},
	computed: {
		// is_in_dev: function() {
		// 	return 'dev' // 'dev'
		// }
	}
};
</script>