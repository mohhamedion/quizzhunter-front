<template>
 <pre dir="ltr" style="direction: ltr; text-align: left;">
<code v-highlight="code" :class="[language,color]" style="direction: ltr; text-align: left;">{{code}}</code>
 </pre>

</template>

<script>
export default{
  props:['language','code','color']

}
</script>
