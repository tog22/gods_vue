<template>
	<td :class="inspiration_class">
		<div :class="occupant_class">
			{{occupant}}
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
			occupant: {
				type: String,
				default: ''
			},
			occupant_class: {
				type: String,
				default: ''
			},
			inspiration_class: {
				type: String,
				default: ''
			}
		},
		mounted() {
			// <div class="angel baboon ">🐒</div>
			switch (this.square.side) {
				case 'red':
					this.occupant_class = ' baboon ';
					this.occupant = '🐒';
					break;
				case 'black':
					this.occupant_class = ' hippo ';
					this.occupant = '🦛';
					break;
			}
			if (this.square.divinely_inspired) {
				this.inspiration_class = 'divinely_inspired';
			}
		}
	};
</script>