<template>
<v-container>
  <div class="text-right">
    <Editor v-model="content"></Editor>
  </div>

  <div class="text-right" v-if="content">
    <div class="text-h6">كيف ستظهر للمستخدم</div>
    <div v-html="content" ></div>
  </div>


<div class="my-5 text-right">
  <v-btn color="dark">ارفاق سلسلة اختبارات لهذه الوظيفة</v-btn>
  <v-btn >انشاء الوظيفة</v-btn>
</div>
</v-container>

</template>
<script>
import Editor from "../../../components/Editor";

export default{
  layout:'hr',
  components:{Editor},
  data(){
    return {
      content:''
    }
  }

}
</script>
