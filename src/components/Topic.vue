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
              {{front}}
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
               <b-btn class="buttonOptions" variant="white" @click="editCard()">
                <b-icon-pencil-square></b-icon-pencil-square>
              </b-btn>
            </b-col>
          </b-row>
        </b-card-body>
    </b-card>
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
    front: {
      type: String,
      default: () =>{ return null; }
    },
    back: {
      type: String,
      default: () =>{ return null; }
    },
  },
  data () {
    return {
        showFront: true,
        title: '',
        description: ''
    }
  },
  // methods: {
  //   getLinkForCard (cardID) {
  //     console.log(cardID);
  //     return '/home/set/' + cardID;
  //   },
  //   forceRouterLink (id) {
  //     this.$router.push({path: '/home/card/' + id });
  //   }
  // }
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