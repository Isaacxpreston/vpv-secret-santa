<template>
  <div class="container">
    <h2 v-on:click="animateSVG">click</h2>
    <anshey :data="ansheyData"></anshey>
    <ross :data="ansheyData"></ross>
  </div>
</template>


<script>
  import anime from 'animejs'

  import anshey from './svg/anshey'
  import ross from './svg/ross'

  export default {
    data() {
      return {
        ansheyData: {
          class: {
            'profile': true,
            'hidden': true
          }
        },
        rossData: {
          class: {
            'profile': true,
            'hidden': true
          }
        }
      }
    },
    methods: {
      animateSVG() {
        this.ansheyData.class['hidden'] = false
        this.rossData.class['hidden'] = false
        const ctx = this
        anime({
          targets: 'path',
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutCubic',
          duration: 1000,
          complete() {
            setTimeout(() => {
              ctx.ansheyData.class['hidden'] = true
              ctx.rossData.class['hidden'] = true
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
