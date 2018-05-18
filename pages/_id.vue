<template>
  <div>
    내용: {{name}}
  </div>
</template>
<script>

export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  data({ req }) {
    return {
      name: req ? "server" : "client"
    };
  }
};
</script>
<style>
</style>
