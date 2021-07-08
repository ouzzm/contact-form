<template>
  <v-app dark>
    <v-main>
      <v-container justify-center fluid fill-height>
        <v-card elevation="24" width="500" class="rounded-xl">
          <v-card-subtitle class="text-center display-4 font-weight-black">
            {{ error.statusCode }}
          </v-card-subtitle>
          <v-card-subtitle class="text-center display-1 font-weight-regular">
            {{ error.message }}
          </v-card-subtitle>
          <v-card-actions class="justify-center">
            <v-btn
              class="title white--text text-capitalize"
              color="#4db848"
              width="50%"
              height="60"
              @click="$router.go(-1)"
            >
              Return
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head() {
    const title = this.error.statusCode + ' - ' + this.error.message
    return {
      title,
    }
  },
}
</script>
