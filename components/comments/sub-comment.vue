<template>
  <v-alert
    border="right"
    colored-border
    color="primary accent-4"
    elevation="2"
  >
    <div :class="this.$languageHelper.siteIsRtl() ? 'rtl': ''">
      <template v-if="!this.$languageHelper.isRtl()">
        {{ comment.user.firstname }} {{ comment.user.lastname }}
        <v-avatar>
          <img
            :src="comment.user.image ? comment.user.image  : require(`~/assets/img/quizzhunter.png`)"
            :alt="comment.user.firstname"
          >
        </v-avatar>
      </template>
      <template v-else>
        <v-avatar>
          <img
            :src="comment.user.image ? comment.user.image  : require(`~/assets/img/quizzhunter.png`)"
            :alt="comment.user.firstname"
          >
        </v-avatar>
        {{ comment.user.firstname }} {{ comment.user.lastname }}
      </template>

    </div>
    <v-spacer></v-spacer>

    <div :class="this.$languageHelper.isRtl(comment.comment)">
      {{ comment.comment }}
    </div>

  </v-alert>
</template>
<script>
export default {
  props: ['comment']
}
</script>
