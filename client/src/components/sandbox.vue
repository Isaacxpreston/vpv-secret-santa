<template>
  <div class="container">
    <h2 v-on:click="animateSVG">click</h2>
    <component :is="profileOne" :data="profileData"></component>
    <component :is="profileTwo" :data="profileData"></component>
  </div>
</template>


<script>
  import anime from 'animejs'
  import svg from './svg'

  export default {
    data() {
      return {
        profileOne: 'aenea',
        profileTwo: 'darren',
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

</style>
