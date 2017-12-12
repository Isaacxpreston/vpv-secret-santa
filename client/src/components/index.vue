<template>
  <div>
    <h1>{{ msg }}</h1>
    <sandbox></sandbox>
  </div>
</template>

<script>
  import sandbox from './sandbox'

  export default {
    data() {
      return {
        msg: 'VPV Secret Santa 2017'
      }
    },
    components: {
      sandbox
    }
  }

</script>
