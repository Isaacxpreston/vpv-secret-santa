<template>
  <div class="container">
    <input placeholder="enter password..." v-model="password"></input>
    <h1 v-on:click="getProfiles">submit</h1>
    <h2 v-if="profileOne || profileTwo" v-on:click="animateSVG">click</h2>
    <component :is="profileOne" :data="profileData"></component>
    <component :is="profileTwo" :data="profileData"></component>

  </div>
</template>


<script>
  import anime from 'animejs'
  import axios from 'axios'
  import svg from './svg'

  export default {
    data() {
      return {
        password: null,
        profileOne: null,
        profileTwo: '',
        profileData: {
          parentClass: {
            'profile': true,
            'hidden': true
          },
          bgClass: {
            'bg': true,
            'hidden': true
          }
        },
      }
    },
    methods: {
      animateSVG() {
        this.profileData.parentClass['hidden'] = false
        this.profileData.bgClass['hidden'] = false
        const ctx = this
        anime({
          targets: 'path',
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutCubic',
          duration: 1000,
          complete() {
            setTimeout(() => {
              ctx.profileData.parentClass['hidden'] = true
              ctx.profileData.bgClass['hidden'] = true
            }, 1500)
          }
        })
      },
      getProfiles() {
        axios.get(`http://localhost:5000/api/password/${this.password}`)
          .then((res) => {
            console.log('here')
            if (res.data) {
              this.profileOne = res.data.name.toLowerCase()
              this.profileTwo = res.data.gift.toLowerCase()
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    mounted() {},
    components: {
      ...svg
    }
  }

</script>

<style scoped lang="scss">
  h2 {
    cursor: pointer;
    font-size: 100px;
  }

</style>
