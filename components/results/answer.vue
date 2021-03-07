<template>
  <v-banner
    elevation="1"
    class="my-1 correct"
    :class="(correct && choosen) ? ' ' : '' "
    :icon="(correct && choosen)  ? 'mdi-check correct' :  (choosen && !correct)  ? 'mdi-alpha-x incorrect' : correct ? 'mdi-check' : '' "
  >
    <!--    :color="color"-->
    <!--    :icon="icon"-->
    <div class="text-h6  text-right " >
      {{ answer }}
    </div>

  </v-banner>
</template>
<script>
export default {
  props: ['icon', 'color', 'answer', 'correct', 'choosen']
}
</script>
