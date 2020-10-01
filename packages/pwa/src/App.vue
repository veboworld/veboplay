
<template>
  <div>
    <h1 class="text-4xl text-white bg-black">
      {{name}}
    </h1>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    data: function() {
      return {
        name: 'Hello World!',
      }
    },
  });
</script>

<style lang="scss">
$primary-color: white;
$bg: black;
h1 {
  color: $primary-color;
  background-color: $bg;
}
</style>
<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
