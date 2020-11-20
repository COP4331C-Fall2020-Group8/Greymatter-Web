<template>
    <Header>
        <b-button size="md" variant="primary" class="mr-1" v-b-modal.modal-prevent-closing-add>Add Topic</b-button>
      <!-- Add Card Modal -->
      <b-modal
        id="modal-prevent-closing-add"
        ref="modal"
        title="Add Topic"
        @show="resetModal"
        @hidden="resetModal"
        @ok="submitData()"
        ok-title="Add Topic"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          
         <b-form-group
            :state="nameState"
            label="Topic Name"
            label-for="name-input"
            invalid-feedback="Topic name is required"
          >
            <b-form-input
              id="Topic-input"
              v-model="name"
              :state="nameState"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            :state="catState"
            label="Category"
            label-for="cat-input"
            invalid-feedback="Category is required"
          >
            <b-form-input
              id="cat-input"
              v-model="category"
              :state="catState"
              required
            >
            </b-form-input>
          </b-form-group>
         </form>
      </b-modal>
    </Header>
</template>

<script>
import Header from '../layouts/Header'
export default {
   name: 'newtopic',
   components: {
       Header
   },
   data () {
       return {
           user_id: '',
           name: '',
           category: '',
           nameState: null,
           catState: null,
       }
   },
   methods: {
    //    submitData () {
    //         var postData = {
    //             user_id: this.$store.getters["user/user_log_id"],
    //             name: this.name,
    //             category: this.category
    //         }
    //         console.log('api/Inserting contact ')
    //         axios
    //         .post('addContact.php', postData)
    //         .then(response => {
    //             if (response.status == 200) {
    //             console.log('Successfully added a card' + response.data.results)
    //             this.card = response.data.results
    //             this.fetchContacts()
    //             this.resetModal()
    //             }
    //             else if ('error' in response.data) {
    //             console.log('A 200 Status Error Occured' + response.data.error)
    //             } 
    //         })
    //         .catch((error) => {
    //             if (error) console.log('Error when adding ' + error)
    //         })
    //     },
       resetModal () {
        this.name = ''
        this.nameState = null
        this.category = ''
        this.catState = null     
        },
        handleOk (bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
       handleSubmit () {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        this.$nextTick(() => {
          this.submitData()
          this.$bvModal.hide('modal-prevent-closing-add')
          this.$bvModal.hide('modal-prevent-closing-edit')
        })
        },
        openEditModal () {
            this.$bvModal.show('modal-prevent-closing-edit')
        },
   }
}
</script>