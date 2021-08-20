<template>
	<td :class="square_class" v-on:click="click">
		<div :class="occupant_class">
			{{occupant_image}}{{is_selected}}
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
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				occupant_image: '',
				occupant_class: '',
				square_class: ''
			};
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
			if (this.square.divinely_inspired) {
				this.square_class = ' divinely_inspired ';
			}
		}
	};
</script>