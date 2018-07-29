<template>
  <el-menu :default-active="$route.path" mode="horizontal" router>
    <el-menu-item index="/"><img src="../assets/logo.png" width="40px"></el-menu-item>
    <el-menu-item v-if="!authenticated" index="/login" class="float-right">Login</el-menu-item>  
    <el-menu-item v-if="!authenticated" index="/register" class="float-right">Register</el-menu-item>  
    <el-dropdown v-if="authenticated" trigger="click">
      <img v-if="user.picture === 'none'" :src="`https://ui-avatars.com/api/?size=40&name=${user.name}&rounded=true`" style="cursor: pointer;">
      <img v-else :src="user.picture" width="40" height="40"  style=" object-fit: cover; border-radius:50%; cursor: pointer;">
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="$router.push('/profile')">Edit Profile</el-dropdown-item>
        <el-dropdown-item @click.native="logout" divided>Logout</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>  
</template>

<script>
  export default {
    name: 'topMenu',
    methods: {
      async logout () {
        this.$store.dispatch('logout')
      }
    },
    computed: {
      authenticated () {
        return this.$store.getters.isAuthenticated
      },
      user () {
        return this.$store.state.user.user
      }
    }
  }
</script>

<style scoped>
  .el-menu {
    overflow: hidden;
    position: fixed;
    top: 0; 
    width: 100%;
    z-index: 3;
    left: 0;
    border: 0;
  }

  .el-dropdown {
    float:right;
    right:30px;
    top: 11px;
    height: 40px;
  }

  .float-right {
    float:right !important;
    right:30px !important;
  }
</style>