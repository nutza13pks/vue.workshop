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
          <v-form>
            <v-text-field
              name="username"
              label="Username"
              id="username"
             />

             <v-text-field
              name="password"
              label="Password"
              id="password"
              :append-icon="isShowPassword ? 'visibility_off' : 'visibility'"
              @click:append="isShowPassword = !isShowPassword"
              :type="isShowPassword ? 'text' : 'password'"
              counter=""
             />

            <v-row class="justify-space-between mt-5 " style="margin-bottom:1px">
              <v-btn text @click.prevent="$router.push('/register')">Register</v-btn>
              <v-btn color="success">Login</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isShowPassword:false
    }
  },
}
</script>

<style>

</style>