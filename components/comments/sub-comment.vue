<template>
  <v-alert
    border="right"
    colored-border
    color="primary accent-4"
    elevation="2"
  >
    <div class="text-right">

      {{ comment.user.firstname }} {{ comment.user.lastname }}
      <v-avatar>
        <img
          :src="comment.user.image ? comment.user.image  :'https://cdn.vuetifyjs.com/images/john.jpg'"
          :alt="comment.user.firstname"
        >
      </v-avatar>
    </div>
    <v-spacer></v-spacer>

    <div class="text-right">
      {{ comment.comment }}
    </div>

  </v-alert>
</template>
<script>
export default {
  props: ['comment']
}
</script>
