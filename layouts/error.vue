<template>
  <v-app dark>

    <div class="text-center my-9">
      <div class="text-h5">
        Oops...      <v-icon>mdi-emoticon-sad-outline</v-icon>

      </div>

      <div v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </div>
      <div v-else>
        {{ otherError }}
      </div>
      <NuxtLink :to="localePath('/')">
        الصفحة الرئيسية
      </NuxtLink>
    </div>

  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
