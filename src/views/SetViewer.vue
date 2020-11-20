<template>
    <div>
        <b-row>
            <b-col cols="12">Viewing Topic: {{setData.name}} With {{setData.num_cards}} Cards</b-col>
            <b-col>
                <b-button v-b-modal.modal-prevent-closing-add>Add Card To Set</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="12" md="6" lg="4" v-for="(card,index) in cards" v-bind:key="index">
                <standard-card 
                    :front="card.card.front"
                    :back="card.card.back"
                ></standard-card>
                <!-- This will be added in the topic card  -->
                <b-button :href="getLinkForCard(card._id)">Go To Card</b-button>
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
import axios from 'axios'

export default {
    name: 'setviewer',
    components: {
        'standard-card': Card
    },
    data () {
        return {
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
        getLinkForCard(cardID){
            console.log(cardID);
            return '/home/card/' + cardID;
        },
        forceRouterLink(id){
            this.$router.push({path: '/home/card/' + id });
        },
        addCard(){

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

            axios.post('/api/addCard', postData)
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
            axios.post('/api/searchSet', postData)
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
                this.submitCard()
                this.$bvModal.hide('modal-prevent-closing-add')
                this.$bvModal.hide('modal-prevent-closing-edit')
            })
        },
        openEditModal () {
            this.$bvModal.show('modal-prevent-closing-edit')
        },
    },
    beforeMount(){
        this.setID = this.$route.params.setID;
        this.fetchAllSetsAndSearchForSelfInReturnedSets();
        this.fetchCardsInSet();
    }
}
</script>