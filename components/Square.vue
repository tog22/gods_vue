<template>
	<td class="">
		<div class="">
			{{square.occupant}}
		</div>
	</td>
</template>
<script>
	export default {
		props: {
			square: {
				type: Object,
				default: null
			}
		}
	};
</script>