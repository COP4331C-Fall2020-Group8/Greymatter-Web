<template>
  <div>
    <!-- Front Card -->
    <b-card v-if="showFront" bg-variant="primary" class="text-center">
        <b-card-body>
          <b-card-title>Topic Name</b-card-title>
            <b-card-text>
            Front topic description
            {{showFront}}
            </b-card-text>
        </b-card-body>
        <b-btn class="buttonFlip" variant="white" @click="flipCard()">
          <b-icon-box-arrow-up-right></b-icon-box-arrow-up-right>
        </b-btn>
    </b-card>
    <!-- Back Card -->
    <b-card v-else bg-variant="primary" class="text-center">
        <b-card-body>
          <b-card-title>Answer</b-card-title>
          <b-card-text>
            Back topic description
            {{showFront}}
          </b-card-text>
          </b-card-body>
          <b-btn class="buttonFlip" variant="white" @click="flipCard()">
            <b-icon-box-arrow-up-right></b-icon-box-arrow-up-right>
          </b-btn>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Card',

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
    z-index: 15;
    position: absolute;
    bottom: 0;
    right: 0;
}

.buttonFlip {
    z-index: 15;
    position: absolute;
    bottom: 0;
    left: 0;
}
</style>