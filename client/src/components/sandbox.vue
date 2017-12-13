<template>
  <div class="container">
    <input placeholder="enter password..." v-model="password"></input>
    <h1 v-on:click="getProfiles">submit</h1>
    <h2 v-if="profileOne || profileTwo" v-on:click="animateSVG">click</h2>
    <h1 v-else>enter your password</h1>


    <div class="profilesContainer">
      <div v-if="profileOne || profileTwo" class="profileInner">
        <h1 :class="nameClass">You: {{profileOne}}</h1>
        <component :is="profileOne.toLowerCase()" :data="profileData"></component>
      </div>

      <div v-if="profileOne || profileTwo" class="profileInner">
        <h1 :class="nameClass">You need to buy a gift for: {{profileTwo}}</h1>
        <component :is="profileTwo.toLowerCase()" :data="profileData"></component>
      </div>
    </div>

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
        nameClass: {
          'hidden': true
        },
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
        this.nameClass['hidden'] = false
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
              ctx.nameClass['hidden'] = true
              ctx.profileData.parentClass['hidden'] = true
              ctx.profileData.bgClass['hidden'] = true
              setTimeout(() => {
                ctx.profileOne = null
                ctx.profileTwo = null
              }, 500)
            }, 2000)
          }
        })
      },
      getProfiles() {
        axios.get(`http://localhost:5000/api/password/${this.password}`)
          .then((res) => {
            if (res.data) {
              this.profileOne = res.data.name
              this.profileTwo = res.data.gift
            } else {
              this.profileOne = this.profileTwo = null
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
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

  .profilesContainer {
    position: relative;
    display: flex;
    width: 100%;
  }

  .profileInner {
    position: relative;
    width: 50%;
    height: 250px;
    margin: auto;
    text-align: center;
  }

</style>
