<template>
  <v-container>
    <v-main>
      <div align="center">
        <div class="col-6">
          <RegisterForm :redirect="true"></RegisterForm>
        </div>
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
