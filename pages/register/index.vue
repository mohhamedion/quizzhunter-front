<template>
  <v-container>
    <v-main>
      <div align="center">
        <v-col cols="12" lg="6" xl="6">
          <RegisterForm :redirect="true"></RegisterForm>
        </v-col>
      </div>
    </v-main>
  </v-container>
</template>
<script>
import RegisterForm from '../../components/register-form/register-form';

export default {
  components: {RegisterForm}
}
</script>
