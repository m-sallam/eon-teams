<template>
  <el-row>
    <el-col :xs="24" :sm="2" :md="2" :lg="2" :xl="2" >
      <el-menu :default-active="$route.path" :mode="menuMode" router :collapse="menuCollapse" :class="menuVertical">
        <el-menu-item :index="'/projects/' + project._id">
          <i class="el-icon-menu"></i>
        </el-menu-item>
        <el-menu-item :index="'/projects/' + project._id + '/lists'">
          <i class="el-icon-tickets"></i>
        </el-menu-item>
        <el-menu-item :index="'/projects/' + project._id + '/chat'">
          <i class="el-icon-message"></i>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :xs="24" :sm="22" :md="22" :lg="22" :xl="22" >
      <el-card>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">home</el-breadcrumb-item>
          <el-breadcrumb-item :to="$route.params.listId ? `/projects/${project._id}` : ''">{{project.title}}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="showList">{{list}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-card>
      <router-view/>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        windowWidth: 0
      }
    },
    computed: {
      project () {
        return this.$store.state.project.currentProject
      },
      menuMode () {
        if (this.windowWidth > 768) {
          return 'vertical'
        } else {
          return 'horizontal'
        }
      },
      menuCollapse () {
        if (this.windowWidth > 768) {
          return true
        } else {
          return false
        }
      },
      menuVertical () {
        if (this.windowWidth > 768) {
          return 'menuVertical'
        } else {
          return false
        }
      },
      list () {
        let list = this.project.lists.find(l => l._id === this.$route.params.listId)
        if (!list) return false
        return list.title
      },
      showList () {
        return this.$route.params.listId
      }
    },
    created () {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    },
    destroyed () {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize () {
        this.windowWidth = window.innerWidth
      }
    }
  }
</script>

<style scoped>
  .menuVertical {
    height: 80vh;
  }
</style>

