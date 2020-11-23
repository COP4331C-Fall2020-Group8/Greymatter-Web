<template>
  <!-- <div class= "container"> -->
    
    <div class="centered">
    <b-row>
      <b-col>
        <div class="vertical-center">
            <h1>  
                <img src="../assets/brain2.png" style="width:200px;height:200px;" alt="">
            </h1>
            
            <h2>
              Grey Matter
            </h2>
              <div class="inner-block">
            <slot />
          </div>
        </div>
      </b-col>
    </b-row>
    </div>
  <!-- </div> -->
</template>

<style lang="scss" scoped>
  @media (min-width: 320px){
      img {
        width: 30px;
        height: 25px;
        margin-top: 5px;
        margin-left: 5px;
      }
  
  .container{
      h1 {
        font-size: 35px;
        align-self: flex-start;
      }

      // .inner-block
      // {
      //   width: 350px;
      //   max-height: 550px;
      // }

      h5 {
        font-size: 15px;
      }
      
      // .form-group {
      //   height: 66px;
      // }
      
      .table {
        width: 200px;
      }
    }
  }

  .centered {
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  .inner-block {
    width: 350px;
    margin: auto;
    max-height: 675px;
    background: #ffffff4b;
    box-shadow: 0px 14px 80px rgba(4, 243, 131, 0.2);
    padding: 20px 40px 40px;
    border-radius: 45px;
    transition: all .3s;
  }

  .vertical-center {
    h3 {
      text-align: center;
      margin: 0;
      line-height: 1;
      padding-bottom: 20px;
    }

    .form-control:focus {
      border-color: rgb(5, 156, 211);
      box-shadow: none;
    }
  }
   
  img {
     width: 40px;
     height: 35px;
   }

  .username {
    padding-top: 8px;
  }

  h1 {
    text-align: center;
    padding-top: 12%;
  }

  h2 {
    text-align: center;
    padding-bottom: 2%;
    color: rgb(4, 243, 131, 0.2);
    text-shadow: 2px 2px 6px rgb(46, 45, 48);
  }
</style>
