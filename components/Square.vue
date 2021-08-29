<template>
	<td :class="square_class" v-on:click="click">
		<div :class="occupant_class">
			{{occupant_image}}
		</div>
	</td>
</template>
<script>
	export default {
		props: {
			square: {
				type: Object,
				default: null
			},
			row: {
				type: Number,
				default: null
			},
			col: {
				type: Number,
				default: null
			},
			is_selected: {
				type: String,
				default: ''
			},
			refresh_trigger_occupant: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
			};
		},
		computed: {
			square_class: function() {
				let ret = '';
				if (this.square.divinely_inspired) {
					ret += ' divinely_inspired ';
				}
				if (this.is_selected) {
					ret += ' selected ';
				}
				return ret;
			},
			occupant_class: function() {
				let ret = '';
				switch (this.square.side) {
					case 'red':
						ret = ' baboon ';
						break;
					case 'black':
						ret = ' hippo ';
						break;
				}
				switch (this.square.occupant) {
					case 'mortal':
						ret += ' mortal ';
						break;
					case 'angel':
						ret += ' angel ';
						break;
				}
				return ret;
			},
			occupant_image: function() {
				let ret = '';
				switch (this.square.side) {
					case 'red':
						ret = '🐒';
						break;
					case 'black':
						ret = '🦛';
						break;
				}
				return ret;
			}
		},
		methods: {
			click: function() {
				this.$emit('square_click_emission', this.row, this.col);
			}
		},
		mounted() {
			
		}
	};
</script>