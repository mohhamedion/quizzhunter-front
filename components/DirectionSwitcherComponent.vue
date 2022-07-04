<template>
  <v-div v-if="this.$languageHelper.siteIsRtl()">
    {{ first }}
    {{second}}
  </v-div>
  <v-div v-else>
    {{ second }}
    {{first}}
  </v-div>

</template>
<script>
// import the component and the necessary extensions
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from "tiptap-vuetify";
export default {
  props: ['first', 'second'],
};
</script>
