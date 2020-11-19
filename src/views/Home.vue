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


        <h1>Flashcard App!</h1>

        <div class="flashcard-form">
          <label for="front">Front
            <input v-model.trim="newFront" type="text" id="front">
          </label>
          <label for="back">Back
            <input v-on:keypress.enter="addNew" v-model.trim="newBack" type="text" id="back">
          </label>
          <button v-on:click="addNew">Add a New Card</button>
          <span class="error" v-show="error">Oops! Flashcards need a front and a back.</span>
        </div>

        <!-- <ul class="flashcard-list">
        <li v-for="(card, index) in cards" v-bind:key="index" v-on:click="toggleCard(card)">
          <transition name="flip">
            <p class="card" v-if="!card.flipped" key="front">
              {{card.front}}
              <span class="delete-card" v-on:click="cards.splice(index, 1)">X</span>
            </p>
            <p class="card" v-else key="back">
              {{card.back}}
              <span class="delete-card" v-on:click="cards.splice(index, 1)">X</span>
            </p>
          </transition>
        </li>
        </ul>  -->
        <!-- Alternative solution -->
        <!-- <ul class="flashcard-list">
          <li v-for="(card, index) in cards" v-bind:key="index" v-on:click="toggleCard(card)">
            <transition name="flip">
                <p class="card" v-bind:key="card.flipped">
                  {{ card.flipped ? card.back : card.front }}
                  <span class="delete-card" v-on:click="cards.splice(index, 1)">X</span>
                </p>
            </transition>
          </li> 
        </ul> -->
        <Card />
        <div>
          <b-button size="md" variant="dark" @click.prevent="logout()">Logout</b-button>
        </div>
      </div>
    </div>
  </Header>
</template>

<script>
import Header from '../layouts/Header'
import Card from '../components/Card'
import axios from 'axios'

export default {
  name: 'home',
  components: {
    Header,
    Card
  },
  data () {
    return {
    cards: [],
    newFront: '',
    newBack: '',
    error: false
    }
  },
  methods: {
    toggleCard: function(card){
      card.flipped = !card.flipped;
    },
    addNew: function(){
      //!this.newFront || !this.newBack also works
      if(!this.newFront.length || !this.newBack.length){
        this.error = true;
      } else {
        this.cards.push({
          front: this.newFront,
          back: this.newBack,
          flipped: false
        });
        this.newFront = ''; 
        this.newBack = '';
        this.error = false;
      }
    }, 
    logout () {
      console.log("Here!")
      this.$store.commit('user/setLoggedIn', false)
      this.$store.commit('user/setUserID', -1)
      this.$router.push('/login')
    }
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
