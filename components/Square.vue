<template>
	<td :class="square_class_computed_version" v-on:click="click">
		<div :class="occupant_class">
			{{occupant_image}}
			 {{refresh_trigger_occupant}} 
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
				occupant_image: '',
				occupant_class: '',
				square_class: ''
			};
		},
		computed: {
			square_class_computed_version: function() {
				let ret = '';
				if (this.square.divinely_inspired) {
					ret += ' divinely_inspired ';
				}
				if (this.is_selected) {
					ret += ' selected ';
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
			// <div class="angel baboon ">🐒</div>
			switch (this.square.side) {
				case 'red':
					this.occupant_class = ' baboon ';
					this.occupant_image = '🐒';
					break;
				case 'black':
					this.occupant_class = ' hippo ';
					this.occupant_image = '🦛';
					break;
			}
			switch (this.square.occupant) {
				case 'mortal':
					this.occupant_class += ' mortal ';
					break;
				case 'angel':
					this.occupant_class += ' angel ';
					break;
			}
		}
	};
</script>