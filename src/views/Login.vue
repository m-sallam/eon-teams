<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" >
      <el-card v-loading="loading">
        <el-form @submit.prevent="submitForm" :model="loginForm">
          <el-form-item label="Username" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width:100%" @click.prevent="submitForm" native-type="submit" type="primary">LOGIN</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row> 
</template>
  
<script>
  export default {
    data () {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loading: false
      }
    },
    methods: {
      async submitForm () {
        this.loading = true
        let {status, message} = await this.$store.dispatch('login', this.loginForm)
        this.loading = false
        if (status) {
          this.$router.push('/')
        } else {
          this.$message({ showClose: true, message, type: 'error' })
        }
      }
    }
  }
</script>