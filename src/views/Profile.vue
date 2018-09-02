<template>
  <vs-row vs-w="12" style="padding: 60px;">
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="2" vs-sm="12" vs-xs="12" >
    </vs-col>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="8" vs-sm="12" vs-xs="12" >
      <vs-card>
        <div slot="header">
          <h3> {{user.username}}'s Profile</h3>
        </div>
        <div>
          <vs-row>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="5" vs-sm="12" vs-xs="12">
              <div @click="openUpload" style="cursor: pointer;">
                <img v-if="!selectedFile && user.picture === 'none'" :src="`https://ui-avatars.com/api/?size=260&name=${user.name}&rounded=true`"  alt="profile picture">
                <img v-if="!selectedFile && user.picture !== 'none'" :src="user.picture" alt="profile picture" width="260" height="260"  style=" object-fit: cover; border-radius:50%">
                <img v-if="selectedFile" :src="src" alt="profile picture" width="260" height="260"  style=" object-fit: cover; border-radius:50%">           
              </div>
            </vs-col>
            <vs-col  vs-lg="7" vs-sm="12" vs-xs="12">
              <vs-input style="width: 100%" placeholder="Name" v-model="user.name"></vs-input>
              <br>
              <vs-input style="width: 100%" placeholder="Enail" v-model="user.email"></vs-input>
              
            </vs-col>
          </vs-row>
          
        </div>
        <div slot="footer">
          <vs-row vs-justify="flex-end" >
            <vs-button @click="update" vs-color="#455A64">Save Changes</vs-button>
          </vs-row>
        </div>
      </vs-card>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="2" vs-sm="12" vs-xs="12" >
      <input type="file" ref="imageUpload" style="display:none;" @change="onFileChanged"/>
    </vs-col>
  </vs-row>
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
      this.$vs.loading({
        color: '#455A64',
        scale: 0.7,
        type: 'sound'
      })
      if (this.selectedFile) {
        let ext = this.selectedFile.name.split('.').pop()
        let reader = new window.FileReader()
        reader.onload = async (e) => {
          let { status } = await this.$store.dispatch('updateProfile', { src: e.target.result, ext })
          this.$vs.loading.close()
          if (status) {
            this.$vs.notify({ text: 'Changes Saved!', color: 'success', position: 'top-center' })
          } else {
            this.$vs.notify({ text: 'An error occured!', color: 'danger', position: 'top-center' })
          }
        }
        reader.readAsDataURL(this.selectedFile)
      } else {
        let { status } = await this.$store.dispatch('updateProfile', { src: false, ext: false })
        this.$vs.loading.close()
        if (status) {
          this.$vs.notify({ text: 'Changes Saved!', color: 'success', position: 'top-center' })
        } else {
          this.$vs.notify({ text: 'An error occured!', color: 'danger', position: 'top-center' })
        }
      }
    }
  }
}
</script>

