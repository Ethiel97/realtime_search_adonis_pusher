<template>
  <div class="container">
    <div class="row" v-if="products.length> 0" v-for="products in groupedProducts">
      <div class="col-md-3 col-sm-6" v-for="product in products">
        <product class="animated fadeIn" :product="product"></product>
      </div>
      <div class="col w-100"></div>
    </div>
    <div v-else >
      <p class="text-center">No items</p>
    </div>
  </div>
</template>


<!--<script src=""></script>-->
<script>
  import {mapGetters} from 'vuex'
  import product from '../components/Product'

  // const Pusher = require('pusher')

  export default {
    name: "Products",
    components: {
      product
    },
    mounted() {

      this.$store.dispatch('GET_PRODUCTS')

      let pusher = new Pusher('aac7493e27ef97acdfc6', {
        cluster: 'eu',
        encrypted: false
      });

      //Subscribe to the channel we specified in our Adonis Application
      let channel = pusher.subscribe('search-channel')

      channel.bind('results', (data) => {

        this.$store.commit('SET_PRODUCTS', data.products)
      })

    },
    computed: {
      groupedProducts() {
        return _.chunk(this.products, 4);
      },
      ...mapGetters([
        'products'
      ])
    }
  }
</script>
