<template>
  <v-container>
    <v-main>
      <v-row>


        <v-col cols="3">
          <div align="center">
            <v-avatar
              color="primary"
              size="168"
            >
              <img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John">
            </v-avatar>
          </div>
        </v-col>

        <v-col cols="9">
          <v-text-field
            class=""

            v-model="firstname"
            label="firstname"
          ></v-text-field>

          <v-text-field
            class=""
            v-model="lastname"
            label="lastname"
          ></v-text-field>

          <v-btn @click="editFullName">
            تعديل
          </v-btn>

        </v-col>

      </v-row>

    </v-main>
  </v-container>
</template>
<script>
export default{
  data(){
    return {
      firstname:this.$auth.user.firstname,
      lastname:this.$auth.user.lastname,
    }
  },
  methods:{
    editFullName(){
      this.$axios.patch(`${process.env.baseUrl}/api/user/profile`,{
        firstname:this.firstname,lastname:this.lastname
      }).then(res=>{

      }).catch(err=>{

      })
    }
  }
}
</script>
