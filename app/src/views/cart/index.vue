<template>
  <div class="page-cart">
    <div class="title">
      <span>共{{totalAllAmount}}件宝贝</span>
      <span>选中{{totalAmount}}</span>
      <span>总价 {{totalPrice}}</span>
    </div>
    <div class="list">
      <cart-item
        v-for="(product, index) in cartProducts"
        :key="index"
        :product="product"
        @amount-change="handleAmountChange(product, arguments)"
        @check="handleResetProducts"
      />
    </div>
    <add-product @add="handleAddProduct" />
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import cartItem from './components/cartItem'
  import addProduct from './components/addProduct'

  const generateProduct = (code,isChecked) => ({
    code,
    amount: 1,
    price: 100,
    isChecked
  })
  export default {
    name: 'cart',
    components: {
      cartItem,
      addProduct,
    },
    computed: {
      ...mapState({
        cartProducts: state => state.cart.cartProducts,
      }),
      ...mapGetters({
          totalPrice: 'cartTotalPrice',
          totalAllAmount:'cartTotalAllAmount',
          totalAmount:'cartTotalAmount',

      }),
    },
    methods: {
      ...mapActions([
        'cartAddProduct',
        'cartChangeCount',
        'cartCancelProduct',
        'cartChangeChecked'

      ]),
      handleAmountChange(product, agrs) {
        const amount = agrs[0]
        this.cartChangeCount({
          code: product.code,
          amount,
        })
      },
      handleAddProduct: function(code) {
        this.cartAddProduct(generateProduct(code,true))
      },
        handleResetProducts(code,isChecked){
          this.cartChangeChecked(generateProduct(code,isChecked))
        }
    },
  }
</script>

<style src="./cart.css"></style>
