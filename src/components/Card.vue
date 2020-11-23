<template>
  <div>
    <!-- Front Card -->
    <b-card 
      @click="flipCard"
      bg-variant="dark" 
      text-variant="white" 
      footer-bg-variant="secondary" 
      header-bg-variant="secondary"
    >
      <template #header>
        <span v-if="showFront" class="card-header-large mb-0">Question</span>
        <span v-else class="card-header-large mb-0">Answer</span>
        <b-button v-if="showEdit" @click.stop="verifyDelete" variant="danger" class="float-right">Delete</b-button>
        <b-button v-if="showEdit" @click.stop="editCard" variant="info" class="float-right mr-2">Edit</b-button>
      </template>
      <b-card-title v-if="showFront" class="text-center">
        <h3 class="mb-0">{{front}}</h3>
      </b-card-title>
      <b-card-title v-else class="text-center">
        <h3 class="mb-0">{{back}}</h3>
      </b-card-title>
      <b-card-sub-title v-if="showFront" class="mb-2 text-center">
        Click To View Answer
      </b-card-sub-title>
      <b-card-sub-title v-else class="mb-2 text-center">
        Click To View Question
      </b-card-sub-title>
      <template #footer class="text-center">
      </template>
    </b-card>

    <b-modal
      :id="'modal-edit-card-' + cardID"
      ref="modal"
      title="Edit Card"
      ok-title="Save Changes"
      @ok="submitCardEdit"
      ok-variant="success"
      cancel-variant="danger"
    >
      <form ref="form" @submit.stop.prevent="doNothing">
        
        <b-form-group
            :state="modalData.frontState"
            label="Question"
            :label-for="'question-input-' + cardID"
            invalid-feedback="Question is required"
        >
          <b-form-input
            :id="'question-input-' + cardID"
            v-model="modalData.front"
            :state="modalData.frontState"
            required
          >
            </b-form-input>
        </b-form-group>
        
        <b-form-group
          :state="modalData.backState"
          label="Answer"
          :label-for="'answer-input-' + cardID"
          invalid-feedback="Answer is required"
        >
          <b-form-input
              :id="'answer-input-' + cardID"
              v-model="modalData.back"
              :state="modalData.backState"
              required
          >
          </b-form-input>
        </b-form-group>
        </form>
    </b-modal>
    <b-modal 
      :id="'verify-delete-' + cardID" 
      :title="'Are You Sure?'"
      ok-title="I'm Sure, Delete It"
      cancel-title="Nevermind"
      @ok="performDeleteSelf"
      ok-variant="danger"
      cancel-variant="success"
      >
      <p class="my-4">This will permanently delete the card:</p>
      <p class="my-4">Question: {{front}}</p>
      <p class="my-4">Answer: {{back}}</p>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Card',
  props: {
    cardID: {
      type: String,
      default: () =>{ return null; }
    },
    showEdit:{
      type: Boolean,
      default: ()=>{ return false; }
    },
    showFront:{
      type: Boolean,
      default: ()=>{ return true; }
    },
    front: {
      type: String,
      default: () =>{ return null; }
    },
    back: {
      type: String,
      default: () =>{ return null; }
    },
    informParentDeleted: {
      type: Function
    },
    informParentEdited: {
      type: Function
    }
  },
  data: () => {
    return{
      showFront: true,
      modalData: {
        front: null,
        frontState: null,
        back: null,
        backState: null
      }
    }
  },
  methods: {
	  flipCard(){
      console.log('Flip')
      this.showFront = !this.showFront;
    },
    editCard(){
      this.modalData = {
        front: this.front,
        frontState: null,
        back: this.back,
        backState: null
      };
      this.$bvModal.show('modal-edit-card-' + this.cardID)
    },
    verifyDelete(){
      this.$bvModal.show('verify-delete-' + this.cardID);
    },
    performDeleteSelf(){
      var postData = {
        id: this.cardID
      };
      axios
      // .post('/api/removeCard', postData)
      .post('/removeCard', postData)
      .then(response => {
        if (response.status == 200){
          this.$bvModal.hide('verify-delete-' + this.cardID);
          this.informParentDeleted(this.cardID);
        }else{
          // TODO
        }
      })
      .catch((error) => {
        console.log(error)
        // TODO
      })
    },
    submitCardEdit(){
      var postData = {
        id: this.cardID,
        front: this.modalData.front,
        back: this.modalData.back
      };
      axios
      // .post('/api/updateCard', postData)
      .post('/updateCard', postData)
      .then(response => {
        if (response.status == 200){
          this.$bvModal.hide('modal-edit-card-' + this.cardID)
          this.informParentEdited(this.cardID, this.modalData.front, this.modalData.back);
        }else{
          // TODO
        }
      })
      .catch((error) => {
        console.log(error)
        // TODO
      })
    },
    resetModal() {
      this.modalData = {
        front: null,
        frontState: null,
        back: null,
        backState: null
      }  
    },
  },  
  computed: {
  },
};
</script>

<style lang="scss" scoped>
.card-header-large{
    font-size: 1.5rem;
    font-weight: 500;
}
.card {
    transform-style: preserve-3d;
    transition: transform 0.3s ease-in-out;
    position: relative;
    perspective: 800px;
}

.back,
.front {
    backface-visibility: hidden;
    transition: transform 0.3s ease-in-out;
    transform-style: preserve-3d;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.front {
    transform: rotateY(0deg);
    position: absolute;
}

.back {
    transform: rotateY(-180deg);
}

.card.flipped .front {
    transform: rotateY(180deg);
}
.card.flipped .back {
    transform: rotateY(0deg);
}

.backData,
.frontData {
    width: 100%;
    height: 100%;
}

.buttonOptions {
    z-index: 20;
    position: absolute;
    bottom: 0;
    right: 0;
}

.buttonFlip {
    z-index: 25;
    position: absolute;
    bottom: 0;
    left: 0;
}

.deleteOption {
    z-index: 15;
    position: absolute;
    bottom: 0;
}
</style>