<template>
  <div>
    <el-card v-loading="loading">
      <div slot="header" class="clearfix">
        <span>Edit Profile</span>
        <el-button @click="update" style="float: right; padding: 5px 0" type="text">SAVE</el-button>
      </div>
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10" >
          <el-row type="flex" justify="center">
            <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" style="text-align:center">
              <div @click="openUpload" style="cursor: pointer;">
                <img v-if="!selectedFile && user.picture === 'none'" :src="`https://ui-avatars.com/api/?size=260&name=${user.name}&rounded=true`"  alt="profile picture">
                <img v-if="!selectedFile && user.picture !== 'none'" :src="user.picture" alt="profile picture" width="260" height="260"  style=" object-fit: cover; border-radius:50%">
                <img v-if="selectedFile" :src="src" alt="profile picture" width="260" height="260"  style=" object-fit: cover; border-radius:50%">           
              </div>
              <h2>{{user.username}}</h2>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
           <el-form :model="user">
            <el-form-item label="Name" prop="name">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input type="email" v-model="user.email"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <input type="file" ref="imageUpload" style="display:none;" @change="onFileChanged"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedFile: false,
      loading: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user.user
    },
    src () {
      return window.URL.createObjectURL(this.selectedFile)
    }
  },
  methods: {
    openUpload () {
      this.$refs.imageUpload.click()
    },
    onFileChanged (event) {
      this.selectedFile = event.target.files[0]
    },
    async update () {
      this.loading = true
      if (this.selectedFile) {
        let ext = this.selectedFile.name.split('.').pop()
        let reader = new window.FileReader()
        reader.onload = async (e) => {
          let {status} = await this.$store.dispatch('updateProfile', {src: e.target.result, ext})
          this.loading = false
          if (status) {
            this.$message({type: 'success', message: 'Changes Saved!'})
          } else {
            this.$message({type: 'error', message: 'An error occured, please contact support!'})
          }
        }
        reader.readAsDataURL(this.selectedFile)
      } else {
        let {status} = await this.$store.dispatch('updateProfile', {src: false, ext: false})
        this.loading = false
        if (status) {
          this.$message({type: 'success', message: 'Changes Saved!'})
        } else {
          this.$message({type: 'error', message: 'An error occured, please contact support!'})
        }
      }
    }
  },
  mounted () {
    this.$store.dispatch('disableGlobalLoading')
  }
}
</script>

