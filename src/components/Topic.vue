<template>
  <div>
    <b-card 
        @click="viewTopic"
        bg-variant="dark" 
        text-variant="white" 
        footer-bg-variant="secondary" 
        header-bg-variant="secondary" 
    >
      <template #header>
        <span class="card-header-large mb-0">{{category}}</span>
        <b-button @click.stop="verifyDelete" variant="danger" class="float-right">Delete</b-button>
        <b-button @click.stop="startEdit" variant="info" class="float-right mr-2">Edit</b-button>
      </template>
      <b-card-title class="text-center">
        <h3 class="mb-0">{{name}}</h3>
      </b-card-title>
      <b-card-sub-title class="mb-2 text-center">
        {{cardsInSet}} Cards
      </b-card-sub-title>
      <b-card-sub-title class="mb-2 text-center">
        Click To View Cards In Topic
      </b-card-sub-title>
      <template #footer>
      </template>
    </b-card>
    
    <!-- Edit Modal -->
    <b-modal
      :id="'modal-edit-topic-' + _id"
      ref="modal"
      title="Edit Topic"
      ok-title="Save Topic"
      @ok="submitTopicEdit"
      ok-variant="success"
      cancel-variant="danger"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        
        <b-form-group
            :state="modalData.nameState"
            label="Topic"
            label-for="name-input"
            invalid-feedback="Topic is required"
        >
          <b-form-input
            id="name-input"
            v-model="modalData.name"
            :state="modalData.nameState"
            required
          >
            </b-form-input>
        </b-form-group>
        
        <b-form-group
          :state="modalData.catState"
          label="Category"
          label-for="cat-input"
          invalid-feedback="Category is required"
        >
          <b-form-input
              id="cat-input"
              v-model="modalData.category"
              :state="modalData.catState"
              required
          >
          </b-form-input>
        </b-form-group>
        </form>
    </b-modal>
    <b-modal 
      :id="'verify-delete-' + _id" 
      :title="'Are You Sure?'"
      ok-title="I'm Sure, Delete It"
      cancel-title="Nevermind"
      @ok="deleteSelf"
      ok-variant="danger"
      cancel-variant="success"
      >
      <p class="my-4">This will permanently delete the topic:</p>
      <p class="my-4">{{name}}</p>
      <p class="my-4">Along With All {{cardsInSet}} Cards Contained Within It.</p>
    </b-modal>
  </div>
</template>.

<script>
import axios from 'axios'

export default {
    name: 'Topic',
    props: {
        showEdit:{
        type: Boolean,
        default: ()=>{ return false; }
        },
        name: {
        type: String,
        default: () =>{ return null; }
        },
        category: {
        type: String,
        default: () =>{ return null; }
        },
        nameState: {
        type: String,
        default: () =>{ return null; }
        },
        catState: {
        type: String,
        default: () =>{ return null; }
        },
        _id: {
        type: String,
        default: () =>{ return null; }
        },
        updateParent: {
        type: Function
        },
        informParentDeleted: {
        type: Function
        },
        numCards: {
        type: Number,
        default: ()=>{ return 0; }
        },
        cardNum:{
        type: Number,
        default: ()=>{return 0; }
        },
        cardsInSet:{
        type: Number,
        default: ()=>{return 0; }
        }
    },
    data () {
        return {
        showFront: true,
        title: '',
        description: '',
        modalData:{
            name: null,
            category: null,
            nameState: null,
            catState: null
        }
        }
    },
    methods: {
        getLinkForCard (cardID) {
        console.log(cardID);
        return '/home/set/' + cardID;
        },
        verifyDelete(){
        this.$bvModal.show('verify-delete-' + this._id);
        },
        doNothing(){
        return null;
        },
        viewTopic(){
        this.$router.push({path: '/home/set/' + this._id });
        },
        forceRouterLink (id) {
        this.$router.push({path: '/home/card/' + id });
        },
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.modalData.nameState = valid 
            this.modalData.catState = valid
            // return this.$refs.form.checkValidity()
            return valid
        },
        resetModal () {
            this.modalData = {
                name: null,
                category: null,
                nameState: null,
                catState: null
            };  
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
                //this.submitSet()
                this.$bvModal.hide('modal-prevent-closing-add')
                this.$bvModal.hide('modal-prevent-closing-edit')
            })
        },
        openEditModal () {
            this.$bvModal.show('modal-prevent-closing-edit')
        },
        startEdit(){
            this.modalData = {
            name: this.name,
            category: this.category
            }
            this.$bvModal.show('modal-edit-topic-' + this._id)
        },
        submitTopicEdit(){
            var postData = {
                id: this._id,
                name: this.modalData.name,
                category: this.modalData.category
            };
            axios
            // .post('/api/updateSet', postData)
            .post('/updateSet', postData)
            .then(response => {
                if (response.status == 200){
                this.$bvModal.hide('modal-edit-topic-' + this._id);
                this.updateParent(this._id, this.modalData.name, this.modalData.category);
                }else{
                // TODO
                }
            })
            .catch((error) => {
                console.log(error)
                // TODO
            })
        
        },
        deleteSelf(){
            var postData = {
                id: this._id
            };
            axios
            // .post('/api/removeSet', postData)
            .post('/removeSet', postData)
            .then(response => {
                if (response.status == 200){
                //this.$bvModal.hide('modal-confirm-delete-topic-' + this._id);
                this.informParentDeleted(this._id);
                }else{
                // TODO
                }
            })
            .catch((error) => {
                console.log(error)
                // TODO
            })
        }
    }
};
</script>

<style lang="scss" scoped>
.card-header-large{
    font-size: 1.5rem;
    font-weight: 500;
}
.buttonOptions {
    z-index: 20;
    position: absolute;
    bottom: 0;
    right: 0;
}

</style>