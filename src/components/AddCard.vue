<template>
    <Header>
        <b-button size="md" variant="primary" class="mr-1" v-b-modal.modal-prevent-closing-add>Add Card</b-button>
      <!-- Add Card Modal -->
      <b-modal
        id="modal-prevent-closing-add"
        ref="modal"
        title="Add Card"
        @show="resetModal"
        @hidden="resetModal"
        @ok="submitData()"
        ok-title="Add Card"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          
         <b-form-group
            :state="frontState"
            label="Front"
            label-for="front-input"
            invalid-feedback="Front is required"
          >
            <b-form-input
              id="front-input"
              v-model="front"
              :state="frontState"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            :state="backState"
            label="Back"
            label-for="back-input"
            invalid-feedback="back is required"
          >
            <b-form-input
              id="back-input"
              v-model="back"
              :state="backState"
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
   name: 'addcard',
   components: {
       Header
   },
   data () {
       return {
           user_id: '',
           set_id: '',
           front: '',
           back: '',
           frontState: null,
           backState: null,
           card: {
               key: 'front', label: 'front', key: 'back', label: 'back'
             },
            //    {key: 'back', label: 'back'}
       }
   },
   methods: {
    //    submitData () {
    //         var postData = {
    //             user_id: this.$store.getters["user/user_log_id"],
    //             // set_id: this.$store.getters["user/set_id"],
    //             card = { front: this.front,
    //                      back: this.back   }
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
        this.front = ''
        this.frontState = null
        this.back = ''
        this.backState = null     
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