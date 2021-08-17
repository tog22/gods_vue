<template>
	<td class="">
		<div class="">
			{{occupant}}
		</div>
	</td>
</template>
<script>
	export default {
		props: {
			occupant: {
				type: String,
				default: null
			},
			side: {
				type: String,
				default: null
			},
			divine_inspiration: {
				type: Boolean,
				default: null
			}
		}
	};
</script>