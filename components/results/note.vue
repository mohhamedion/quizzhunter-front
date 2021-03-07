<template>
  <v-alert
    outlined
    type="info"

  >
    <div class="text-right">
      {{ explanation }}
    </div>
  </v-alert>
</template>
<script>
export default {
  props:['explanation']
}
</script>
