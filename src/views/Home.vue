<template>
    <div>
      <b-navbar variant="dark" type="dark">
        <b-navbar-brand href="#">
          <b-img src="https://i.ibb.co/QJ3J3Ct/tinybrain.png" class="d-inline-block brand-img" alt="Grey Matter"></b-img>
          Grey Matter
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-form @submit.prevent="">
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"  v-on:keyup.enter="searchTopics" v-model="searchTerm"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" @click="searchTopics">Search</b-button>
          </b-nav-form>
          <b-nav-item @click.prevent="logout()">Logout</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
      <b-row v-if="showingSearch">
        <b-col cols="10">
          Results For: {{searchTerm}} 
        </b-col>
        <b-col cols="2">
          <b-button @click="stopSearch">
            Clear Search
          </b-button>
        </b-col>
      </b-row>
      <div>
        <!-- <b-row>
            <b-col>
              <h1>Welcome back {{this.$store.getters["user/user_log_id"]}}!</h1>
          </b-col>
        </b-row> -->
        <!-- <b-row>
            <b-col>
              <b-button v-b-modal.modal-prevent-closing-add>Add Set</b-button>
            </b-col>
        </b-row> -->
        <b-row>
            <b-col sm="12" md="6" lg="4" v-for="(topic,index) in topics" v-bind:key="index">
                <standard-topic
                    :name="topic.name"
                    :category="topic.category"
                    :_id="topic._id"
                    :updateParent="receiveTopicUpdate"
                    :informParentDeleted ="receiveTopicDeletedNotification"
                    :cardNum="index + 1"
                    :numCards="topics.length"
                    :cardsInSet="topic.num_cards"
                ></standard-topic>
                <!-- <div v-for="(set,index) in topics" v-bind:key="index">
                  <b-button :href="getLinkForCard(set._id)">Go To Card</b-button>
                </div> -->
            </b-col>
            <b-col cols="12">
              <b-card v-b-modal.modal-prevent-closing-add bg-variant="dark" text-variant="white" footer-bg-variant="secondary" header-bg-variant="secondary" >
                <template #header >
                  <h4 class="mb-0 text-center">Create New Topic</h4>
                </template>
                <b-card-title class="text-center">
                  <h1 class="text-success">
                    <b-icon-plus-circle-fill></b-icon-plus-circle-fill>
                  </h1>
                </b-card-title>
                <b-card-sub-title class="mb-2 text-center">
                  Click Anywhere To Create A New Topic
                </b-card-sub-title>
                <template #footer class="text-center">
                  Don't Worry, Its Easy
                </template>
              </b-card>
            </b-col>
        </b-row>
        <!-- Add Card -->
        <b-modal
            id="modal-prevent-closing-add"
            ref="modal"
            title="Add Topic"
            @show="resetModal"
            @hidden="resetModal"
            @ok="submitSet()"
            ok-title="Add Topic"
            ok-variant="success"
        >
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <!-- Name  -->
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
            <!-- Category -->
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
        </b-modal>
      </div>
    </div>
</template>

<script>
import Header from '../layouts/Header'
import Topic from '../components/Topic'
import axios from 'axios'

export default {
  name: 'home',
  components: {
      'standard-topic': Topic
  },
  data () {
    return {
        searchTerm: null,
        showingSearch: false,
        topicName: null,
        setID: null,
        setData: {
            _id: "",
            category: "",
            name: "",
            num_cards: 0
        },
        topics: [],
        modalData:{
            name: null,
            category: null,
            nameState: null,
            catState: null
        }
    }
  },
  methods: {
    stopSearch(){
      this.fetchAllSetsAndSearchForSelfInReturnedSets();
      this.showingSearch = false;
    },
    searchTopics(){
      var postData = {
        user_id: this.$store.getters["user/user_log_id"],
        search: this.searchTerm
      }
      axios.post('/api/searchSet', postData)
      .then((response) => {
        if (response.status == 200){
          this.topics = response.data.results
          this.showingSearch = true;
        }else{
          // TODO
          console.log("400 error")
          console.log(response.data.results);
          this.topics = response.data.results;
        }
      })
      .catch((error) => {
        console.log(error)
        // TODO
      })
    },
    receiveTopicUpdate(topicID, name, category){
      console.log(`Received Update From Child Topic: ${topicID}`);
      var selectedTopic = this.topics.filter( (topic)=>{ return topic._id == topicID;} );
      selectedTopic[0].name = name;
      selectedTopic[0].category = category;
    },
    receiveTopicDeletedNotification(topicID){
      console.log(`Child Informed Me Of Self-Deletion: ${topicID}`);
      this.topics = this.topics.filter( (topic)=>{ return topic._id != topicID;} );
    },
    getLinkForCard(setID){
        return '/home/set/' + setID;
    },
    forceRouterLink(id){
        this.$router.push({path: '/home/set/' + id});
    },
    submitSet(){
      var postData = {
        user_id: this.$store.getters["user/user_log_id"],
        name: this.modalData.name,
        category: this.modalData.category
      };
      axios.post('/api/addSet', postData)
      .then(response => {
        if (response.status == 200){
          console.log("Added Set")
          this.fetchAllSetsAndSearchForSelfInReturnedSets();
          // this.fetchCardsInSet();
        }else{
            // TODO
        }
      })
      .catch((error) => {
        console.log(error)
        // TODO
      })
    },
    fetchAllSetsAndSearchForSelfInReturnedSets(){
      var postData = {
          user_id: this.$store.getters["user/user_log_id"],
          search: ""
      }
      axios.post('/api/searchSet', postData)
      .then(response => {
        if (response.status == 200){
          console.log("All Sets of the user")
          console.log(response.data)
          this.setData = response.data.results
          this.topics = this.setData
          // var self = sets.filter((setObj)=>{ return setObj._id == this.setID})
          // this.setData = self[0];
          console.log(this.topics)
        }else{
          // TODO
          console.log("400 error")
          console.log(response.data.results);
          this.topics = response.data.results;
        }
      })
      .catch((error) => {
        console.log(error)
        // TODO
        console.log(response.data.error);
      })
    },
    fetchCardsInSet(){
        var postData = {
          user_id: this.$store.getters["user/user_log_id"],
          search: ""
        }
        axios.post('/api/searchCard', postData)
        .then(response => {
          if (response.status == 200){
            this.cards = response.data.results
          }else{
            // TODO
          }
        })
        .catch((error) => {
          console.log(error)
          // TODO
        })
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
        //this.submitSet()
        this.$bvModal.hide('modal-prevent-closing-add')
        this.$bvModal.hide('modal-prevent-closing-edit')
      })
    },
    openEditModal () {
        this.$bvModal.show('modal-prevent-closing-edit')
    },
    logout () {
        console.log("Signing out!")
        this.$store.commit('user/setLoggedIn', false)
        this.$store.commit('user/setUserID', -1)
        this.$router.push('/login')
      }
    },
    beforeMount(){
        this.setID = this.$route.params.setID;
        this.fetchAllSetsAndSearchForSelfInReturnedSets();
        this.fetchCardsInSet();
    }
}
</script>
<style>
body {
  font-family: 'Montserrat', sans-serif;
  text-align: center;
}
.brand-img{
  max-height: 30px;
  max-width: 30px;
}
</style>
<style scoped>


/*
ul {
  padding-left: 0;
  display: flex;
  flex-flow: row wrap;
}

li {
  list-style-type: none;
  padding: 10px 10px;
  transition: all 0.3s ease;
}

.container {
  max-width: 100%;
  padding: 2em;
}

.card {
  display: block;
  width: 150px;
  height: 175px;
  padding: 80px 50px;
  background-color: #51aae5;
  border-radius: 7px;
  margin: 5px;
  text-align: center;
  line-height: 27px;
  cursor: pointer;
  position: relative;
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  -webkit-box-shadow: 9px 10px 22px -8px rgba(209,193,209,.5);
  -moz-box-shadow: 9px 10px 22px -8px rgba(209,193,209,.5);
  box-shadow: 9px 10px 22px -8px rgba(209,193,209,.5);
  will-change: transform;
}

li:hover{
  transform: scale(1.1);
}

li:nth-child(-n+3) .card{
  background-color: #e65f51;
  }

li:nth-child(2n+1) .card{
  background-color: #a17de9;
  }

li:nth-child(4n) .card{
  background-color: #feca34;
  }

li:nth-child(5n-2) .card{
  background-color: #51aae5;
  }

li:nth-child(4n+4) .card{
  background-color: #feca34;
  }

li:nth-child(-7n+7) .card{
  background-color: #e46055;
  }

.delete-card {
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px 15px;
  opacity: .4;
  transition: all 0.5s ease;
}

.delete-card:hover, .error {
  opacity: 1;
  transform: rotate(360deg);
}

.flip-enter-active {
  transition: all 0.4s ease;
}

.flip-leave-active {
  display: none;
}

.flip-enter, .flip-leave {
  transform: rotateY(180deg);
  opacity: 0;

}

/* Form */
/*
.flashcard-form{
  position: relative;
}


label{
  font-weight: 400;
  color: #333;
  margin-right: 10px;
}

input{
  border-radius: 5px;
  border: 2px solid #eaeaea;
  padding: 10px;
  outline: none;
} */
/* 
button{
  border-radius: 5px;
  border: 1px solid #40424260;
  background-color: #434b4ace;
  padding: 8px 15px;
  outline: none;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover{
  background-color: #555c55;
}

.error{
  margin-top: 10px;
  display: block;
  color: #e44e42;
  font-weight: 600;
} */
</style>
