<template>
    <div>
        <b-row>
            <b-col cols="2" class="text-info">
                <b-button @click="last" class="giant-button" :disabled="currentIndex == 0 ">
                    <b-icon-chevron-left></b-icon-chevron-left>
                </b-button>
            </b-col>
            <b-col cols="8">
                <standard-card 
                    :cardID="workingSet[currentIndex]._id"
                    :front="workingSet[currentIndex].card.front"
                    :back="workingSet[currentIndex].card.back"
                    :showEdit="false"
                    :showFront="true"
                ></standard-card>
            </b-col>
            <b-col cols="2" class="text-info">
                <b-button @click="next" class="giant-button" :disabled="(currentIndex + 1) > (workingSet.length - 1) ">
                    <b-icon-chevron-right></b-icon-chevron-right>
                </b-button>
            </b-col>
            <b-col>
                <b-button-toolbar justify>
                    <b-button @click="shuffle">
                        Shuffle Cards
                    </b-button>
                    <b-button @click="reset">
                        Un-Shuffle Cards
                    </b-button>
                </b-button-toolbar>
            </b-col>
        </b-row>        
    </div>
</template>

<script>
import Card from '../components/Card'

export default {
    name: 'Quiz',
    components: {
        'standard-card': Card
    },
    props: {
        cardSet: {
            type: Array,
            default: () =>{ return []; }
        }
    },
    data: () => {
        return{
            workingSet: [],
            currentIndex: 0
        }
    },
    methods: {
        // getThreeRandomAnswers(){
        //     var currentlyViewing = this.workingSet[this.currentIndex];
        //     var allCards = JSON.parse(JSON.stringify(this.cardSet));
        //     allCards.filter((card)=>{})
        // },
        next(){
            this.currentIndex++;
        },
        last(){            
            this.currentIndex--;
        },
        reset(){
            this.workingSet = JSON.parse(JSON.stringify(this.cardSet));
            this.currentIndex = 0;
        },
        shuffle(){
            this.workingSet.sort( (a, b) => { return 0.5 - Math.random() })
            this.currentIndex = 0;
        },
        shuffleArray(array) {
            let curId = array.length;
            // There remain elements to shuffle
            while (0 !== curId) {
                // Pick a remaining element
                let randId = Math.floor(Math.random() * curId);
                curId -= 1;
                // Swap it with the current element.
                let tmp = array[curId];
                array[curId] = array[randId];
                array[randId] = tmp;
            }
            return array;
        }
    },
    
    computed: {
    },
    mounted(){
        this.workingSet = JSON.parse(JSON.stringify(this.cardSet));
    }
};
</script>

<style lang="scss" scoped>
    .giant-button{
        height: 100%;
        width: 100%;
        font-size: 5rem;
        font-weight: 800;
    }
</style>