<template>
  <div class="container">

    <transition name="fade">
      <div v-if="!profileOne || !profileTwo" class="password-container text-center vertical-center box-shadow">

        <h1>Enter your password</h1>
        <input placeholder="Enter password..." v-model="password" v-on:keydown="checkForEnter"></input>
        <h1 v-on:click="getProfiles" class="cursor-pointer ">Submit</h1>

      </div>
    </transition>
    
    <transition name="fade-delayed">
    <div v-if="profileOne || profileTwo" class="vertical-center">
      
      <div class="profile-container">

        <div class="profile-inner box-shadow">
          <component :is="profileOne.toLowerCase()" :data="profileData"></component>
          <h3 class="hidden">(spacer)</h3>
          <h1 class="name hidden">{{profileOne}}</h1>
        </div>

        <div class="profile-inner box-shadow">
          <component :is="profileTwo.toLowerCase()" :data="profileData"></component>
          <h3 class="name">You are buying for:</h3>
          <h1 class="name hidden">{{profileTwo}}</h1>
        </div>

      </div>
      

      <div class="reset-button text-center hidden" :class="resetButtonClass">
        <h2 class="cursor-pointer box-shadow" v-on:click="resetButtonClick">Reset</h2>
      </div>

    </div>
    </transition>
    

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
          'pointer-none': true,
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
            duration: 1000,
            delay: 750
          })
          .add({
            targets: ".profile, .bg",
            opacity: 1,
            easing: 'easeInOutCubic',
            duration: 1000,
            delay: 250
          })
          .add({
            targets: 'path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutCubic',
            duration: 3000,
            offset: "-=1000"
          })
          .add({
            targets: ".reset-button",
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
          targets: ".name, .profile, .bg, .reset-button",
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

  .reset-button {
    h2 {
      display: inline-block;
      padding: 0px 12px 0px 12px;
    }
  }

  .vertical-center {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  .password-container {
    width: 50%;
    margin: auto;
    box-sizing: border-box;
    padding-top: 48px;
    padding-bottom: 48px;
    @media screen and (max-width: 1000px) {
      width: calc(100% - 96px);
    }
    @media screen and (max-width: 500px) {
      width: calc(100% - 48px);
    }
  }

  .profile-container {
    position: relative;
    display: flex;
    width: 100%;
    padding-top: 48px;
  }

  .profile-inner {
    position: relative;
    box-sizing: border-box;
    width: calc(50% - 96px - 96px);
    margin: auto;
    text-align: center;
    overflow: hidden;
    svg {
      max-height: calc(100vh - 96px);
    }
    @media screen and (max-width: 1000px) {
      width: calc(50% - 48px);
    }
    @media screen and (max-width: 500px) {
      width: calc(50% - 12px);
    }
  }

  input {
    transform: scale(1.75, 1.75);
    &:focus {
      outline: 0;
    }
  }

  .profile {
    position: relative;
    width: 100%;
    height: 100%;
  }

</style>
