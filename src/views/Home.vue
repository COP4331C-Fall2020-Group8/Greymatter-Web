<template>
  <Header>
    <div>
      <div id="flashcard-app" class="container">
        <b-button v-b-toggle.sidebar-variant>
          <b-icon icon="chevron-bar-down" aria-hidden="true"></b-icon>
        </b-button>
          <b-sidebar id="sidebar-variant" title="Sidebar" bg-variant="light" text-variant="dark" shadow>
            <div class="px-3 py-1">
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <b-icon icon="person-fill" scale="2" variant="secondary"></b-icon>
              Profile
            </b-list-group-item>
            <b-list-group-item>
              <b-icon icon="house-door-fill" scale="2" variant="secondary"></b-icon>
            </b-list-group-item>
            <b-list-group-item>
              <b-icon icon="collection-fill" scale="2" variant="secondary"></b-icon>
            </b-list-group-item>
            <b-list-group-item>
              <b-icon icon="book" scale="2" variant="secondary"></b-icon>
            </b-list-group-item>
            </div>
          </b-sidebar>
          <b-button size="md" variant="dark" @click.prevent="logout()">Logout</b-button>

        <h1>Home page with sets of Topic</h1>

        <!-- <div>
          <span class="error" v-show="error">Oops! Flashcards need a front and a back.</span>
        </div> -->

        <b-row>
            <!-- <b-col cols="12">Viewing Topic: {{setData.name}} With {{setData.num_cards}} Cards</b-col> -->
            <b-col>
                <b-button v-b-modal.modal-prevent-closing-add>Add Set</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="12" md="6" lg="4" v-for="(topic,index) in topics" v-bind:key="index">
                <standard-topic
                    :front="topic.front"
                ></standard-topic>
                <!-- This will be added in the topic card  -->
                <b-button :href="getLinkForCard(setData._id)">Go To Card</b-button>
            </b-col>
        </b-row>
        <!-- Add Card -->
        <b-modal
            id="modal-prevent-closing-add"
            ref="modal"
            title="Add Set"
            @show="resetModal"
            @hidden="resetModal"
            @ok="submitSet()"
            ok-title="Add Set"
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
  </Header>
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
        getLinkForCard(cardID){
            console.log(cardID);
            return '/home/card/' + cardID;
        },
        forceRouterLink(id){
            this.$router.push({path: '/home/card/' + id });
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
                    // fetchAllSetsAndSearchForSelfInReturnedSets()
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
            // axios.post('/api/searchCard', postData)
            // .then(response => {
            //     if (response.status == 200){
            //         this.cards = response.data.results
            //     }else{
            //         // TODO
            //     }
            // })
            // .catch((error) => {
            //     console.log(error)
            //     // TODO
            // })
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
        },
        logout () {
          console.log("Here!")
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

<style scoped>
body {
  font-family: 'Montserrat', sans-serif;
  text-align: center;
}

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
}

button{
  border-radius: 5px;
  border: 1px solid #87cb84;
  background-color: #87cb84;
  padding: 8px 15px;
  outline: none;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover{
  background-color: #70a66f;
}

.error{
  margin-top: 10px;
  display: block;
  color: #e44e42;
  font-weight: 600;
}
</style>
