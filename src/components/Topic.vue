<template>
  <div>
    <!-- Front Card -->
    <!-- <b-card v-if="showFront" bg-variant="primary" class="text-center">
        <b-card-body>
          <b-card-title>Topic Name</b-card-title>
            <b-card-text>
            Topic description
            {{showFront}}
            </b-card-text>
        </b-card-body>
        <b-btn variant="white" @click="flipCard()">
          <b-icon-inbox-fill></b-icon-inbox-fill>
        </b-btn>
    </b-card> -->
    <!-- New Topic  -->
    <b-card v-if="showFront" bg-variant="primary" class="text-center">
        <b-card-body>
          <b-row>
            <b-col>
              {{name}}
            </b-col>
          </b-row>
          <b-row>
            <!-- <b-col>
               <b-btn class="buttonFlip" variant="white" @click="flipCard()">
               <b-button :href="getLinkForCard(topic.set_id)">Go To Card</b-button>
                <b-icon-box-arrow-up-right></b-icon-box-arrow-up-right>
              </b-btn>
            </b-col> -->
            <b-col>
              {{category}}
              <b-button v-b-modal.modal-prevent-closing-add class="buttonOptions" variant="white" @click="startEdit()">
                <b-icon-pencil-square></b-icon-pencil-square>
              </b-button>
            </b-col>
          </b-row>
        </b-card-body>
    </b-card>
    <!-- Edit Modal -->
        <!-- <b-modal
          id="modal-prevent-closing-add"
          ref="modal"
          title="Add Set"
          @show="resetModal"
          @hidden="resetModal"
          @ok="submitSet()"
          ok-title="Add Set"
        >
          <form ref="form" @submit.stop.prevent="handleSubmit">
            
            <b-form-group
                :state="modalData.frontState"
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
              :state="modalData.backState"
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
        </b-modal> -->
  </div>
</template>.

<script>
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
    _id: {
      type: String,
      default: () =>{ return null; }
    }
    // num_cards: {
    //   type: 0,
    //   default: () =>{ return 0; }
    // }
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
    forceRouterLink (id) {
      this.$router.push({path: '/home/card/' + id });
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
       this.$nextTick(() => {
           this.submitSet()
           this.$bvModal.hide('modal-prevent-closing-add')
           this.$bvModal.hide('modal-prevent-closing-edit')
       })
     },
     openEditModal () {
       this.$bvModal.show('modal-prevent-closing-edit')
     }//,
    //  startEdit(topic){
    //     this.modalData = {
    //       editname = topic.name,
    //       editcategory = topic.category
    //     }
    //  },
    // editData () {
    //   var postData = {
    //     userId: this.$store.getters["user/user_log_id"],
    //     name: this.modalData.editname,
    //     category:this.editcategory,
    //   }
    //   console.log('Editing Contact')
    //   axios
    //     .post('/api/updateSet', postData)
    //     .then(response => {
    //         if (response.status == 200){
    //             console.log("Updated Set")
    //             this.fetchAllSetsAndSearchForSelfInReturnedSets()
    //             // this.fetchCardsInSet();
    //         }else{
    //             // TOD
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //         // TODO
    //         })
    // },
  }
};
</script>

<style lang="scss" scoped>

.buttonOptions {
    z-index: 20;
    position: absolute;
    bottom: 0;
    right: 0;
}

</style>