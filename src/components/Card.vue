<template>
  <div>
    <!-- Front Card -->
    <b-card v-if="showFront" bg-variant="primary" class="text-center">
        <b-card-body>
          <b-row>
            <b-col>
              {{front}}
            </b-col>
          </b-row>
          <b-row>
            <b-col>
               <b-btn class="buttonFlip" variant="white" @click="flipCard()">
                 
                <b-icon-box-arrow-up-right></b-icon-box-arrow-up-right>
              </b-btn>
            </b-col>
            <b-col>
               <b-btn class="buttonOptions" variant="white" @click="editCard()">
                <b-icon-pencil-square></b-icon-pencil-square>
              </b-btn>
            </b-col>
          </b-row>
        </b-card-body>
    </b-card>
    <!-- Back Card -->
    <b-card v-else bg-variant="primary" class="text-center">
            <!-- <b-card-body>
              <b-card-text>
                {{back}}
              </b-card-text>
              </b-card-body>
              <b-btn class="buttonFlip" variant="white" @click="flipCard()">
                <b-icon-box-arrow-up-right></b-icon-box-arrow-up-right>
              </b-btn>
        </b-card> -->
    <b-card-body>
          <b-row>
            <b-col>
              {{back}}
            </b-col>
          </b-row>
          <b-row>
            <b-col>
               <b-btn class="buttonFlip" variant="white" @click="flipCard()">
                 
                <b-icon-box-arrow-up-right></b-icon-box-arrow-up-right>
              </b-btn>
            </b-col>
            <b-col>
               <b-btn class="buttonOptions" variant="white" @click="editCard()">
                <b-icon-pencil-square></b-icon-pencil-square>
              </b-btn>
            </b-col>
          </b-row>
        </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    showEdit:{
      type: Boolean,
      default: ()=>{ return false; }
    },
    front: {
      type: String,
      default: () =>{ return null; }
    },
    back: {
      type: String,
      default: () =>{ return null; }
    },
  },
  data: () => {
    return{
      showFront: true,
    }
  },
  methods: {
	flipCard(){
      console.log('Flip')
      this.showFront = !this.showFront;
    }
  },
  computed: {
  },
};
</script>

<style lang="scss" scoped>
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