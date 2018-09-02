<template>
  <vs-card>
    <div slot="header">
      <h3>Owner</h3>
    </div>
    <div>
      <vs-list>
        <vs-list-item :title="project.owner.name" :subtitle="project.owner.username">
          <template slot="avatar">
            <vs-avatar v-if="project.owner.picture === 'none'" size="33px" :text="project.owner.name"/>
            <vs-avatar v-else  size="33px" :src="project.owner.picture"/>
          </template>
        </vs-list-item>
      </vs-list>
    </div>
    <div slot="footer">
      <vs-row vs-justify="flex-end">
        <vs-dropdown v-if="project.owner.username === user.username" vs-color="#455A64" vs-trigger-click>
          <vs-button style="border-radius: 50%" vs-color="#455A64" vs-icon="more_vert"></vs-button>
          <vs-dropdown-menu style="width:200px;">
            <vs-dropdown-item style="text-align: center" @click.native="deleteProject">
              Delete Project
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
        <br v-else>
      </vs-row>
    </div>
  </vs-card>
</template>
    
<script>
  export default {
    computed: {
      project () {
        return this.$store.state.project.currentProject
      },
      user () {
        return this.$store.state.user.user
      }
    },
    methods: {
      async deleteProject () {
        this.$vs.dialog({
          type: 'confirm',
          color: 'danger',
          title: `Delete Project`,
          text: 'Are you sure?',
          acceptText: 'Delete',
          accept: this.acceptDelete
        })
      },
      async acceptDelete () {
        this.$vs.loading({
          color: '#455A64',
          scale: 0.7,
          type: 'sound'
        })
        let { status, message } = await this.$store.dispatch('deleteProject')
        if (status) {
          this.$router.push('/')
        } else {
          this.$vs.loading.close()
          this.$vs.notify({ text: message, color: 'danger', position: 'top-center' })
        }
      }
    }
  }
</script>

    