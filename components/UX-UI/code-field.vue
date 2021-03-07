<template>
 <pre >
<code v-highlight="code" :class="[language,color]" >{{code}}</code>
 </pre>

</template>

<script>
export default{
  props:['language','code','color']

}
</script>
