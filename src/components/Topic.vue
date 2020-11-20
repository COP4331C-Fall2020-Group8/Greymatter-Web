<template>
  <div>
    <!-- Front Card -->
    <b-card v-if="showFront" bg-variant="primary" class="text-center">
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
    </b-card>
  </div>
</template>.

<script>
export default {
  name: 'Topic',

  data () {
    return {
        showFront: true,
        title: '',
        description: ''
    }
  },
  
//   methods: {

//   }
};
</script>