<template>
  <v-container>
    <v-main>
      <div align="center">
        <v-col cols="12" lg="6" xl="6">
          <v-card :loading="loading">

            <v-form v-model="valid">
              <v-container>

                <div class="">
                  <div>
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                      :error="Boolean(this.errors.email)"
                      :messages="this.errors.email"
                    ></v-text-field>
                  </div>

                  <div>
                    <v-text-field
                      v-model="password"
                      :rules="nameRules"
                      label="password"
                      required
                      type="password"
                      :error="Boolean(this.errors.password)"
                      :messages="this.errors.password"
                    ></v-text-field>
                  </div>

                  <div>
                    <v-btn @click="login">{{ $t("auth.login") }}</v-btn>
                  </div>
                </div>

              </v-container>
            </v-form>
          </v-card>

        </v-col>

      </div>
    </v-main>
  </v-container>
</template>
<script>


export default {

  data: () => ({
    errors: {},
    loading: false,
    valid: false,
    password: '',
    nameRules: [
      v => !!v || 'password is required',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),

  middleware({redirect, $auth}) {
    if ($auth.loggedIn) {
      return redirect('/')
    }
  },

  methods: {
    login() {
      this.loading = true;
      this.$auth.loginWith('local', {data: {email: this.email, password: this.password}})
        .then((res) => {
          this.loading = false
          this.$router.push('/')
        }).catch(err => {
        this.errors = err.response.data.error || err.response.data.errors;
        this.loading = false;

      })
    }
  }
}
</script>
