<template>
  <v-container>
    <v-row class="justify-center">
      <v-card style="width:400px; margin-top:100px">
        <v-img class="white--text align-end" src="@/assets/login_header.jpg" height="200px">
          <v-card-title primary-title>
            Login
          </v-card-title>
        </v-img>
        <v-card-text>
          <v-form @submit.prevent="submit">
            <v-text-field
              name="username"
              label="Username"
              id="username"
              v-model="account.username"
             />

             <v-text-field
              name="password"
              label="Password"
              id="password"
              v-model="account.password"
              :append-icon="isShowPassword ? 'visibility_off' : 'visibility'"
              @click:append="isShowPassword = !isShowPassword"
              :type="isShowPassword ? 'text' : 'password'"
              counter=""
             />

            <v-row class="justify-space-between mt-5 " style="margin-bottom:1px">
              <v-btn text @click.prevent="$router.push('/register')">Register</v-btn>
              <v-btn type="submit" color="success">Login</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  mounted() {
    if (api.isLoggedIn()) {
      this.$router.push("/stock");
    }
  },
  data() {
    return {
      isShowPassword:false,
      account:{
        username:"",
        password:""
      },
    }
  },
  methods: {
    submit() {
      this.$router.push("/stock").catch(()=>{});
      this.$store.dispatch({
        type:"doLogin",
        username: this.account.username,
        password: this.account.password
      });
    }
  }
}
</script>

<style>

</style>