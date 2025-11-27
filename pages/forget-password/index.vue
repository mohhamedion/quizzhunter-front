<template>
  <v-container>
    <v-main>
      <div align="center">
        <v-card class="col-6 ">
          <div class="px-1 ">
            <div class="text-h5">
              تغيير كلمة المرور
            </div>

            <v-text-field

              label="email" v-model="email">
            </v-text-field>
          </div>
        <v-btn @click="resetPassword">
          ارسل
        </v-btn>
        </v-card>
      </div>

    </v-main>
  </v-container>
</template>
<script>
export default{
  data(){
    return {
      email:''
    }
  },

  methods:{
    resetPassword(){
      this.$axios.post('/forgot-password',{email:this.email}).then(res=>{
      console.log(res.data);
      });
    }
  }
}
</script>
