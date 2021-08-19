<template>
	<td :class="inspiration_class" v-on:click="click">
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
			}
		},
		data() {
			return {
				occupant_image: '',
				occupant_class: '',
				inspiration_class: ''
			};
		},
		methods: {
			click: function(event) {
				// alert('sq clk');
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
			console.log(this.occupant_image);
			if (this.square.divinely_inspired) {
				this.inspiration_class = 'divinely_inspired';
			}
		}
	};
</script>