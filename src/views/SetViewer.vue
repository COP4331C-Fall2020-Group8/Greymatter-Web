<template>
    <div>
        <b-navbar variant="dark" type="dark">
            <b-navbar-brand href="#">
                <b-img src="https://i.ibb.co/QJ3J3Ct/tinybrain.png" class="d-inline-block brand-img" alt="Grey Matter"></b-img>
                Grey Matter
            </b-navbar-brand>
            <b-navbar-nav>
                <b-button size="sm"  class="my-2 my-sm-0" variant="secondary" @click.prevent="home()">Return To Home</b-button> 
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-form @submit.prevent="">
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"  v-on:keyup.enter="searchCards" v-model="searchTerm"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" @click="searchCards">Search</b-button>
                </b-nav-form>
                <b-nav-item @click.prevent="logout()">Logout</b-nav-item>
            </b-navbar-nav>
        </b-navbar>
        
        <b-row class="bg-info" align-v="stretch">
            <b-col cols="10" class="text-left">
                <span class="set-title ml-3">{{setData.name}}</span><br>
                <span class="set-sub-title ml-3">{{setData.category}}</span>
            </b-col>
            <b-col cols="2" class="text-right align-middle">
                <span class="set-sub-title mr-3">{{setData.num_cards}} Cards</span>
                <b-button v-if="!quizMode" size="sm" class="mr-3" @click="enableQuizMode">Start Quiz</b-button>
                <b-button v-else size="sm" class="mr-3" @click="disableQuizMode">End Quiz</b-button>
            </b-col>
        </b-row>
        <b-row v-if="showingSearch" class="bg-dark text-white">
            <b-col cols="10">
                <span class="set-sub-title ml-3">Results For: {{searchTerm}}</span>
            </b-col>
            <b-col cols="2">
            <b-button @click="stopSearch">
                Clear Search
            </b-button>
            </b-col>
        </b-row>
        
        <b-row v-if="!quizMode">
            <b-col sm="12" md="6" lg="4" v-for="(card,index) in cards" v-bind:key="index">
                <standard-card 
                    :cardID="card._id"
                    :front="card.card.front"
                    :back="card.card.back"
                    :showEdit="showEditing"
                    :informParentEdited="childInformUpdate"
                    :informParentDeleted="childInformDeletion"
                ></standard-card>
            </b-col>
            <b-col v-if="showEditing" cols="12">
                <b-card v-b-modal.modal-prevent-closing-add bg-variant="dark" text-variant="white" footer-bg-variant="secondary" header-bg-variant="secondary" >
                    <template #header >
                        <h4 class="mb-0 text-center">Add New Card</h4>
                    </template>
                <b-card-title class="text-center">
                    <h1 class="text-success">
                        <b-icon-plus-circle-fill></b-icon-plus-circle-fill>
                    </h1>
                </b-card-title>
                <b-card-sub-title class="mb-2 text-center">
                  Click Anywhere To Add A New Card To This Set
                </b-card-sub-title>
                <template #footer class="text-center">
                  Don't Worry, Its Easy
                </template>
              </b-card>
            </b-col>
        </b-row>
        <b-row v-else>
            <b-col>
                <quiz
                    :cardSet="cards"
                ></quiz>
            </b-col>
        </b-row>
        <!-- Add Card -->
        <b-modal
            id="modal-prevent-closing-add"
            ref="modal"
            title="Add Card"
            @show="resetModal"
            @hidden="resetModal"
            @ok="submitCard()"
            ok-title="Add Card"
            ok-variant="success"
        >
            <form ref="form" @submit.stop.prevent="handleSubmit">
            <!-- Front Card -->
            <b-form-group
                :state="modalData.frontState"
                label="Front"
                label-for="front-input"
                invalid-feedback="Front is required"
            >
                <b-form-input
                    id="front-input"
                    v-model="modalData.front"
                    :state="modalData.frontState"
                    required
                >
                </b-form-input>
            </b-form-group>
            <!-- Back Card -->
            <b-form-group
                :state="modalData.backState"
                label="Back"
                label-for="back-input"
                invalid-feedback="back is required"
            >
                <b-form-input
                    id="back-input"
                    v-model="modalData.back"
                    :state="modalData.backState"
                    required
                >
                </b-form-input>
            </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<script>
import Card from '../components/Card'
import Quiz from '../components/Quiz'
import axios from 'axios'

export default {
    name: 'setviewer',
    components: {
        'standard-card': Card,
        'quiz': Quiz
    },
    data () {
        return {
            quizMode: false,
            showEditing: true,
            searchTerm: null,
            showingSearch: null,
            topicName: null,
            setID: null,
            setData: {
                _id: null,
                category: "",
                name: "",
                num_cards: 0
            },
            cards: [],
            modalData:{
                front: null,
                back: null,
                frontState: null,
                backState: null
            }
        }
    },
    methods: {
        enableQuizMode(){
            this.quizMode = true;
        },
        disableQuizMode(){
            this.quizMode = false;
        },
        childInformDeletion(cardID){
            this.cards = this.cards.filter( (card)=>{ return card._id != cardID;} );
        },
        childInformUpdate(cardID, front, back){
            var selectedCard = this.cards.filter( (card)=>{ return card._id == cardID;} );
            selectedCard[0].card.front = front;
            selectedCard[0].card.back = back;
        },
        stopSearch(){
            this.fetchCardsInSet();
            this.showingSearch = false;
        },
        searchCards(){
            var postData = {
                set_id: this.setID,
                search: this.searchTerm
            }
            axios
            // .post('/api/searchCard', postData)
            .post('/searchCard', postData)
            .then((response) => {
            if (response.status == 200){
                this.cards = response.data.results
                this.showingSearch = true;
            }else{
                // TODO
                console.log("400 error")
                console.log(response.data.results);
            }
            })
            .catch((error) => {
            console.log(error)
            // TODO
            })
        },
        getLinkForCard(cardID){
            console.log(cardID);
            return '/home/card/' + cardID;
        },
        forceRouterLink(id){
            this.$router.push({path: '/home/card/' + id });
        },
        submitCard(){
             var postData = {
                user_id: this.$store.getters["user/user_log_id"],
                set_id: this.setID,
                card:{
                    front: this.modalData.front,
                    back: this.modalData.back
                }
            };

            axios
            // .post('/api/addCard', postData)
            .post('/addCard', postData)
            .then(response => {
                if (response.status == 200){
                    console.log("Added Card")
                    this.fetchCardsInSet();
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
            axios
            // .post('/api/searchSet', postData)
            .post('/searchSet', postData)
            .then(response => {
                if (response.status == 200){
                    console.log("All Sets")
                    console.log(response.data);
                    var sets = response.data.results;
                    var self = sets.filter((setObj)=>{ return setObj._id == this.setID})
                    this.setData = self[0];
                    console.log(self)
                }else{
                    // TODO

                }
            })
            .catch((error) => {
                console.log(error)
                // TODO
            })
        },
        fetchCardsInSet(){
            var postData = {
                set_id: this.setID,
                search: ""
            }
            axios
            // .post('/api/searchCard', postData)
            .post('/searchCard', postData)
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
                front: null,
                back: null,
                frontState: null,
                backState: null
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
                // this.submitCard()
                this.$bvModal.hide('modal-prevent-closing-add')
                this.$bvModal.hide('modal-prevent-closing-edit')
            })
        },
        openEditModal () {
            this.$bvModal.show('modal-prevent-closing-edit')
        },
        home () {
            console.log("Heading to home")
            this.$router.push('/home')
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
.set-title{
    font-size: 1.75rem;
    font-weight: 600;
}
.set-sub-title{
    font-size: 1.25rem;
    font-weight: 400;
}
.container {
  max-width: 100%;
  padding: 2em;
}
</style>