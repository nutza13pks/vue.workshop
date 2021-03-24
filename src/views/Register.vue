<template>
  <v-container>
    <v-row class="justify-center">
      <v-card style="width:400px; margin-top:100px">
        <v-img class="white--text align-end" src="@/assets/login_header.jpg" height="200px">
          <v-card-title primary-title>
            Register
          </v-card-title>
        </v-img>
        <v-card-text>
          <v-form @submit.prevent="submit">
            <v-text-field
              name="username"
              label="Username"
              id="username"
              v-model="account.username"
              :rules="usernameRules"
             />

             <v-text-field
              name="password"
              label="Password"
              id="password"
              :append-icon="isShowPassword ? 'visibility_off' : 'visibility'"
              @click:append="isShowPassword = !isShowPassword"
              :type="isShowPassword ? 'text' : 'password'"
              counter
              v-model="account.password"
              :rules="passwordRules"
             />

            <span>{{account}}</span>
            <v-row class="justify-space-between mt-5 " style="margin-bottom:1px">
              <v-btn text @click.prevent="$router.back()">Cancel</v-btn>
              <v-btn type="submit" color="success">Confirm</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import api from '@/services/api'

export default {
  data() {
    return {
      isShowPassword:false,
      account:{
        username:"",
        password:""
      },
      usernameRules:[v1=>!!v1 || "Username is required"],
      passwordRules:[v1=>!!v1 || "Password is required", v2=>!!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v2) || "Minimum eight characters, at least one letter and one number"]
    }
  },
  methods: {
    async submit () {            
      await api.register(this.account)  
    }
  }
}
</script>

<style>

</style>