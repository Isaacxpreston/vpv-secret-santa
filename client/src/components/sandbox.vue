<template>
  <div class="container">
    <h2 v-on:click="animateSVG">click</h2>
    <anshey :data="profileData"></anshey>
    <ross :data="profileData"></ross>
  </div>
</template>


<script>
  import anime from 'animejs'

  import anshey from './svg/anshey'
  import ross from './svg/ross'

  export default {
    data() {
      return {
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
      anshey,
      ross
    }
  }

</script>

<style scoped lang="scss">
  h2 {
    cursor: pointer;
    font-size: 100px;
  }

</style>
