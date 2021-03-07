<template>
  <v-alert
    elevation="5"
    class=""
    :color="correct ? 'passed-question' : 'fail-question' "
  >
    <!--    :icon="correct ? 'mdi-check correct' : 'mdi-alpha-x incorrect' "-->

    <div class="text-h6  text-right ">
      {{ question }}
    </div>

  <CodeField v-if="code" :code="code"></CodeField>


  </v-alert>
</template>
<script>
import CodeField from "../../components/UX-UI/code-field";

export default{
  props:['question','code','correct'],
  components:{
    CodeField
  }
}
</script>
