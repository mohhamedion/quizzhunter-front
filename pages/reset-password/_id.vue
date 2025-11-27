<template>
  <v-container>
    <v-main>
      <v-card>

        <div class="py-4 px-4">
          <div class="text-right">تغيير كلمة المرور</div>
          <div>
            <v-text-field
              label="password"
              v-model="password"
              type="password"
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              label="confirm password"
              v-model="c_password"
              type="password"

            ></v-text-field>
          </div>
          <div class="text-right">
            <v-btn @click="resetPassword">
              تغيير
            </v-btn>
          </div>
        </div>

      </v-card>
    </v-main>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      password: '',
      c_password: '',
    }
  },
  methods: {
    resetPassword() {
      this.$axios.post('/reset-password', {
        token: this.$route.params.id,
        email: this.$route.query.email,
        password: this.password,
        password_confirmation: this.c_password

      }).then((response) => {
        console.log(response.data);
      }).catch(response => {
        console.log(response.response.data.errors);
      });
    }
  }
}
</script>
