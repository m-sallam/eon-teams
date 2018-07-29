<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" >
      <el-card v-loading="loading">
        <el-form @submit.prevent="submitForm" :model="registerForm" :rules="rules">
          <el-form-item label="Username" prop="username">
            <el-input v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="registerForm.email"></el-input>
          </el-form-item>
          <el-form-item label="Name" prop="name">
            <el-input v-model="registerForm.name"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="registerForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width:100%" @click.prevent="submitForm" native-type="submit" type="primary">SUBMIT</el-button>
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
        registerForm: {
          username: '',
          email: '',
          name: '',
          password: ''
        },
        loading: false,
        rules: {
          username: [
            { required: true, message: 'Username is required', trigger: 'blur' }
          ],
          email: [
            { type: 'email', required: true, message: 'Enter a valid Email', trigger: 'blur' }
          ],
          name: [
            { required: true, message: 'Name is required', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Password is required', trigger: 'blur' },
            { min: 6, message: 'Password has to be at least 6 chars', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      async submitForm () {
        this.loading = true
        let {status, message} = await this.$store.dispatch('register', this.registerForm)
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
  