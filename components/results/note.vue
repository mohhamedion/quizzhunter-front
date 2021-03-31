<template>
  <v-alert
    outlined
    type="info"

  >
    <div class="text-right rtl">
      {{ explanation }}
    </div>
  </v-alert>
</template>
<script>
export default {
  props:['explanation']
}
</script>
