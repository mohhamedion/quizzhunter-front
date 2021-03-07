<template>
<div v-ripple>
    <a>
      <v-banner
        elevation="10"
        :class="[choosen && 'primary white--text']"
      >

        <v-list-item-title>{{answer}}</v-list-item-title>

      </v-banner>
    </a>
</div>
</template>
<script>
export default{
  props:['answer','choosen']
}

</script>
