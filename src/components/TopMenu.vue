<template>
  <div>
    <vs-topbar id="topbar" v-if="authenticated" vs-color="#455A64">
      <vs-dropdown vs-trigger-click>
        <vs-avatar v-if="user.picture === 'none'" size="40px" :text="user.name"/>
        <vs-avatar v-else  size="40px" :src="user.picture"/>
        <vs-dropdown-menu style="width: 200px">
          <vs-dropdown-item style="text-align: center" to="/">
            Projects
          </vs-dropdown-item>
          <vs-dropdown-item style="text-align: center" to="/profile">
            Profile
          </vs-dropdown-item>
          <vs-dropdown-item vs-divider style="text-align: center" @click.native="logout">
            Logout
          </vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </vs-topbar>
  </div>
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

<style>
  #topbar {
    position: fixed;
    width: auto; 
    right: 7%; 
    border-radius: 0 0 50% 50%; 
    z-index: 4;
  }
</style>