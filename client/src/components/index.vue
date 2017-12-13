<template>
  <div class="container">

    <div v-if="!profileOne || !profileTwo" class="text-center">
      <h1>Enter your password</h1>
      <input placeholder="Enter password..." v-model="password" v-on:keydown="checkForEnter"></input>
      <h1 v-on:click="getProfiles" class="cursor-pointer">Submit</h1>
    </div>


    <div v-if="profileOne || profileTwo">
      <div class="profilesContainer">
        <div class="profileInner">
          <component :is="profileOne.toLowerCase()" :data="profileData"></component>
          <h1 :class="nameClass">{{profileOne}}</h1>
        </div>
        <div class="profileInner">
          <component :is="profileTwo.toLowerCase()" :data="profileData"></component>
          <h1 :class="nameClass">You are buying for: {{profileTwo}}</h1>
        </div>
      </div>

      <div class="resetButton" :class="resetButtonClass">
        <h1 class="cursor-pointer" v-on:click="resetButtonClick">Reset</h1>
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
        resetButtonClass: {
          'text-center': true,
          'pointer-none': true,
          'hidden': true
        },
        nameClass: {
          'name': true,
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
      checkForEnter(e) {
        if (e.keyCode === 13) {
          this.getProfiles()
        }
      },
      animateSVG() {
        const ctx = this
        const tl = anime.timeline()
        tl
          .add({
            targets: ".name",
            opacity: 1,
            easing: 'easeInOutCubic',
            duration: 1000
          })
          .add({
            targets: ".profile, .bg",
            opacity: 1,
            easing: 'easeInOutCubic',
            duration: 1000
          })
          .add({
            targets: 'path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutCubic',
            duration: 3000,
            offset: "-=1000"
          })
          .add({
            targets: ".resetButton",
            opacity: 1,
            easing: 'easeInOutCubic',
            duration: 1000,
            complete() {
              ctx.resetButtonClass['pointer-none'] = false
            }
          })
      },
      resetButtonClick() {
        const ctx = this
        anime({
          targets: ".name, .profile, .bg, .resetButton",
          opacity: 0,
          duration: 1000,
          easing: 'easeInOutCubic',
          complete() {
            ctx.resetButtonClass['pointer-none'] = true
            ctx.reset()
          }
        })
      },
      getProfiles() {
        axios.get(`${process.env.API}/api/password/${this.password}`)
          .then((res) => {
            if (res.data) {
              this.profileOne = res.data.name
              this.profileTwo = res.data.gift
              setTimeout(() => {
                this.animateSVG()
              })
            } else {
              this.reset()
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      reset() {
        this.password = ''
        this.profileOne = this.profileTwo = null
      }
    },
    components: {
      ...svg
    }
  }

</script>

<style scoped lang="scss">
  .profilesContainer {
    position: relative;
    display: flex;
    width: 100%;
  }

  .profileInner {
    position: relative;
    width: 50%;
    margin: auto;
    text-align: center;
    overflow: hidden;
    // svg {
    //   height: 250px;
    // }
  }

  input {
    transform: scale(1.5, 1.5);
  }

</style>
