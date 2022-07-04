<template>
  <v-card :loading="loading" >

    <v-form v-model="valid">
      <v-container>

        <div class="py-4 px-4">
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
              v-model="firstname"
              :rules="firstnameRules"
              label="firstname"
              required
              :error="Boolean(this.errors.firstname)"
              :messages="this.errors.firstname"
            ></v-text-field>
          </div>


          <div>
            <v-text-field
              v-model="lastname"
              :rules="lastnameRules"
              label="lastname"
              required
              :error="Boolean(this.errors.lastname)"
              :messages="this.errors.lastname"
            ></v-text-field>
          </div>


          <div>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="password"
              required
              type="password"
              :error="Boolean(this.errors.password)"
              :messages="this.errors.password"
            ></v-text-field>
          </div>

          <div>
            <v-text-field
              v-model="c_password"
              :rules="c_passwordRules"
              label="confirm password"
              required
              type="password"
              :error="Boolean(this.errors.c_password)"
              :messages="this.errors.c_password"
            ></v-text-field>
          </div>
          <div class="my-1">{{$t('auth.youAgreeWithTerms')}} <NuxtLink to="/policy">{{$t('auth.terms')}}</NuxtLink> {{$t('auth.and')}}  <NuxtLink to="privacy">{{$t('auth.privacy')}}</NuxtLink></div>

          <div>
            <v-btn @click="register"> {{$t('auth.createNewAccount')}}</v-btn>
          </div>
        </div>

      </v-container>
    </v-form>
  </v-card>

</template>
<script>
export default {
  props:['redirect','callbackFunction'],
  data: () => ({
    errors:{},
    loading:false,
    valid: false,
    password: '',
    passwordRules: [
      v => !!v || 'password is required',
      v => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    c_password: '',
    c_passwordRules: [
      v => !!v || 'confirm password is required',
      v => v.length <= 10 || 'Name must be less than 10 characters',
    ],

    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],


    firstname: '',
    firstnameRules: [
      v => !!v || 'firstname is required',
    ],

    lastname: '',
    lastnameRules: [
      v => !!v || 'lastname is required',
    ],


  }),
  methods: {
    register() {
      this.loading  = true;
      this.$axios.post(`${process.env.baseUrl}/api/register`, {
        email: this.email,
        password: this.password,
        c_password: this.c_password,
        firstname: this.firstname,
        lastname: this.lastname
      })
        .then((res) => {
          this.$auth.setUserToken(res.data.token).then(() => {
              if(this.redirect){
                this.$router.push('/')
              }
              else{
                this.callbackFunction();
              }
            this.loading=false;

          })
        }).catch(err=>{
          this.errors = err.response.data.errors;
          this.loading=false;

      })
    }
  }
}
</script>

