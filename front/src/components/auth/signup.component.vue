<template>
  <v-layout>
    <v-flex md12 lg6 offset-lg3 >
      <v-card class="signup-form-card">
        <h3>Sign up</h3>
        <form @submit="submit">
          <v-text-field
            v-model="username"
            name="username"
            label="Username"
            type="text"
            v-validate="'required|max:255'"
            data-vv-name="username"
            required>
          </v-text-field>
          <v-text-field
            v-model="password"
            name="password"
            label="Password"
            type="password"
            v-validate="'required|min:8|max:20'"
            data-vv-name="password"
            required>
          </v-text-field>
          <v-text-field
            v-model="passwordConfirm"
            name="passwordConfirm"
            label="Confirm password"
            type="password"
            v-validate="'required|min:8|max:20'"
            data-vv-name="passwordConfirm"
            required>
          </v-text-field>
          <p v-for="(error, index) in signupErrors"
            :key="index"
            class="signup-errors">
            {{ error }}
          </p>

          <v-btn type="submit">Signup</v-btn>
        </form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import AuthController from '../../controllers/auth.controller';

  export default {
    name: 'signup',
    data() {
      return {
        username: '',
        password: '',
        passwordConfirm: '',
        signupErrors: [],
      };
    },
    methods: {
      submit(event) {
        event.preventDefault();
        if (this.password !== this.passwordConfirm) {
          this.signupErrors.push('Лозинке нису исте');
          return;
        }

        const data = {
          username: this.username,
          password: this.password,
        };
        AuthController.register(data).then(() => {
          this.$router.push({ name: 'index' });
        }).catch((error) => {
          if (error.response.status === 401) {
            this.signupErrors.push(error.response.data);
          }
        });
      },
    },
  };
</script>

<style lang="stylus">
.signup-form-card
  padding 2rem

.login-errors
  color red
</style>
