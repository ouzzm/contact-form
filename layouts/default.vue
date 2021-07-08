<template>
  <v-app>
    <v-main>
      <v-container
        justify-center
        fluid
        :fill-height="!$vuetify.breakpoint.mobile"
      >
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {}
</script>
