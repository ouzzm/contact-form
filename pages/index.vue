<template>
  <v-card
    :width="
      $vuetify.breakpoint.xl
        ? '50%'
        : $vuetify.breakpoint.mobile
        ? '100%'
        : '75%'
    "
    elevation="24"
    class="rounded-xl"
  >
    <v-row no-gutters>
      <v-col
        v-if="!$vuetify.breakpoint.mobile"
        cols="12"
        sm="6"
        md="6"
        lg="6"
        xl="6"
      >
        <v-img
          :lazy-src="require('@/static/bg.png')"
          :src="require('@/static/bg.png')"
          class="align-center fill-height"
          :style="
            $vuetify.rtl
              ? 'border-radius: 0px 24px 24px 0px'
              : 'border-radius: 24px 0px 0px 24px'
          "
          gradient="to top right, #0072bcc4, #4db848ab"
          type="image"
        >
          <v-card-title class="justify-center">
            <v-img
              :lazy-src="require('@/static/logo.png')"
              :src="require('@/static/logo.png')"
              max-width="260"
              max-height="62"
              type="image"
            />
          </v-card-title>
          <v-carousel :show-arrows="false" height="auto" hide-delimiters cycle>
            <v-carousel-item
              v-for="(item, index) in $t('metaContent')"
              :key="index"
            >
              <v-card-subtitle
                class="text-center display-1 font-weight-light white--text"
              >
                {{ item }}
              </v-card-subtitle>
            </v-carousel-item>
          </v-carousel>
          <v-card-subtitle class="text-center white--text">
            <v-btn
              :disabled="loading"
              href=""
              class="title white--text text-capitalize"
              elevation="12"
              width="60%"
              height="60"
              type="url"
              outlined
            >
              {{ $t('returnTouOurWebSite') }}
            </v-btn>
          </v-card-subtitle>
          <v-card-subtitle
            class="text-center headline font-weight-regular white--text"
          >
            {{ $t('name1') }} <br />
            {{ $t('name2') }}
          </v-card-subtitle>
        </v-img>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <v-card-title
          :style="
            $vuetify.rtl
              ? 'background: #0072bc; border-radius: 24px 0px 0px 0px'
              : !$vuetify.breakpoint.mobile
              ? 'background: #0072bc; border-radius: 0px 24px 0px 0px'
              : {
                  background: 'url(' + require('@/static/banner.png') + ')',
                  borderRadius: '24px 24px 0px 0px',
                  backgrounPosition: 'center',
                }
          "
          :class="
            $vuetify.breakpoint.mobile
              ? 'headline white--text'
              : 'display-1 white--text'
          "
        >
          <a v-if="$vuetify.breakpoint.mobile" href="">
            <v-img
              :lazy-src="require('@/static/logo.png')"
              :src="require('@/static/logo.png')"
              width="200"
              type="image"
            />
          </a>
          {{ !$vuetify.breakpoint.mobile ? $t('header') : '' }}
          <v-spacer />
          <v-menu rounded="b-xl" left offset-y>
            <template #activator="{ on, attrs }">
              <v-badge avatar overlap>
                <template #badge>
                  <v-avatar>
                    <v-img
                      :lazy-src="
                        languages.find((x) => {
                          return x.id === $route.fullPath.split('/')[1]
                        }).image
                      "
                      :src="
                        languages.find((x) => {
                          return x.id === $route.fullPath.split('/')[1]
                        }).image
                      "
                    />
                  </v-avatar>
                </template>
                <v-icon
                  :disabled="loading"
                  v-bind="attrs"
                  x-large
                  left
                  dark
                  v-on="on"
                >
                  {{ icons.mdiTranslate }}
                </v-icon>
              </v-badge>
            </template>
            <v-list>
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="(item, index) in languages"
                  :key="index"
                  :to="localePath('index', item.id)"
                >
                  <v-list-item-avatar>
                    <v-img :lazy-src="item.image" :src="item.image" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name" />
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-card-title>
        <v-card-text class="py-6">
          <v-form ref="form" v-model="validation" lazy-validation>
            <v-row>
              <v-col
                v-if="$vuetify.breakpoint.mobile"
                cols="12"
                sm="12"
                md="12"
                lg="12"
                xl="12"
              >
                <v-card-subtitle
                  class="pa-0 pb-2 gray--text text-center headline"
                >
                  {{ $t('header') }}
                </v-card-subtitle>
                <v-divider style="color: #00000099" />
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-text-field
                  v-model="nameSurname"
                  :rules="[(val) => (val || '').length > 0 || $t('required')]"
                  :prepend-inner-icon="icons.mdiAccountTie"
                  :label="$t('nameUsername')"
                  :disabled="loading"
                  hide-details="auto"
                  type="text"
                  outlined
                  required
                />
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-text-field
                  v-model="phone"
                  :rules="[(val) => (val || '').length > 0 || $t('required')]"
                  :prepend-inner-icon="icons.mdiCellphone"
                  :label="$t('phone')"
                  :disabled="loading"
                  hide-details="auto"
                  type="number"
                  class="phone"
                  outlined
                  required
                />
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-text-field
                  v-model="email"
                  :rules="[
                    (v) => !!v || $t('required'),
                    (v) => /.+@.+\..+/.test(v) || $t('emailValid'),
                  ]"
                  :prepend-inner-icon="icons.mdiEmailOutline"
                  :label="$t('email')"
                  :disabled="loading"
                  hide-details="auto"
                  type="email"
                  outlined
                  required
                />
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-select
                  v-model="selectedProducts"
                  :items="products"
                  :menu-props="{ bottom: true, offsetY: true, maxHeight: 210 }"
                  :prepend-inner-icon="icons.mdiCarLiftedPickup"
                  :label="$t('products')"
                  :disabled="loading"
                  item-color="success"
                  item-text="name"
                  item-value="id"
                  hide-details
                  outlined
                  multiple
                >
                  <template #selection="{ item, index }">
                    <v-chip
                      v-if="index === 0"
                      :disabled="loading"
                      class="white--text"
                      color="#4db848"
                    >
                      <span class="subtitle-2 font-weight-regular">
                        {{ item.name }}
                      </span>
                    </v-chip>
                    <span
                      v-if="index === 1"
                      class="gray--text subtitle-2 font-weight-regular"
                    >
                      (+{{ selectedProducts.length - 1 }} {{ $t('others') }})
                    </span>
                  </template>
                  <template #item="{ item }">
                    <img :lazy-src="item.image" :src="item.image" />
                    {{ item.name }}
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-textarea
                  v-model="message"
                  :disabled="loading"
                  :prepend-inner-icon="icons.mdiMessageOutline"
                  :label="$t('message')"
                  height="100"
                  type="text"
                  hide-details
                  outlined
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="pt-0 pb-6 px-4 justify-center">
          <v-btn
            :loading="loading"
            :disabled="loading"
            class="title white--text text-capitalize"
            color="#4db848"
            type="submit"
            height="60"
            width="50%"
            rounded
            @click="Submit"
          >
            {{ $t('submit') }}
          </v-btn>
        </v-card-actions>
      </v-col>
      <v-slide-y-reverse-transition>
        <v-overlay
          v-if="overlay"
          :color="!error ? '#036358' : '#802323'"
          opacity="0.96"
          absolute
        >
          <v-card-title class="justify-center">
            <v-img
              :lazy-src="require('@/static/logo.png')"
              :src="require('@/static/logo.png')"
              max-width="260"
              max-height="62"
              type="image"
            />
          </v-card-title>
          <v-card-subtitle
            class="my-4 text-center display-2 font-weight-light white--text"
          >
            {{ !error ? $t('overlay1') : $t('error1') }}<br />
            {{ !error ? $t('overlay2') : $t('error2') }}
          </v-card-subtitle>
          <v-card-actions class="my-4 justify-center">
            <v-btn
              class="title white--text text-capitalize"
              color="#4db848"
              type="submit"
              height="60"
              width="50%"
              outlined
              rounded
              @click="overlay = !overlay"
            >
              {{ $t('close') }}
            </v-btn>
          </v-card-actions>
        </v-overlay>
      </v-slide-y-reverse-transition>
    </v-row>
  </v-card>
</template>

<script>
import {
  mdiTranslate,
  mdiAccountTie,
  mdiCellphone,
  mdiEmailOutline,
  mdiCarLiftedPickup,
  mdiMessageOutline,
} from '@mdi/js'
export default {
  data() {
    return {
      icons: {
        mdiTranslate,
        mdiAccountTie,
        mdiCellphone,
        mdiEmailOutline,
        mdiCarLiftedPickup,
        mdiMessageOutline,
      },
      nameSurname: null,
      phone: null,
      email: null,
      selectedProducts: null,
      message: null,
      validation: false,
      loading: false,
      overlay: false,
      error: false,
      languages: [
        { id: 'tr', name: 'Türkçe', image: require('@/static/tr-TR.png') },
        { id: 'en', name: 'English', image: require('@/static/en-US.png') },
        { id: 'ru', name: 'Русский', image: require('@/static/ru-RU.png') },
        { id: 'es', name: 'Español', image: require('@/static/es-ES.png') },
        { id: 'ar', name: 'العربية', image: require('@/static/ar-SA.png') },
      ],
      products: [
        {
          id: 'prod1',
          name: this.$t('prod1'),
          image: require('@/static/prod1.png'),
        },
        {
          id: 'prod2',
          name: this.$t('prod2'),
          image: require('@/static/prod2.png'),
        },
        {
          id: 'prod3',
          name: this.$t('prod3'),
          image: require('@/static/prod3.png'),
        },
        {
          id: 'prod4',
          name: this.$t('prod4'),
          image: require('@/static/prod4.png'),
        },
        {
          id: 'prod5',
          name: this.$t('prod5'),
          image: require('@/static/prod5.png'),
        },
        {
          id: 'prod6',
          name: this.$t('prod6'),
          image: require('@/static/prod6.png'),
        },
        {
          id: 'prod7',
          name: this.$t('prod7'),
          image: require('@/static/prod7.png'),
        },
      ],
    }
  },
  head() {
    return {
      title: this.$t('metaTitle'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('metaContent')[0]
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.$t('metaContent')[0]
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.$t('metaContent')[0]
        },
      ],
    }
  },
  watch: {
    overlay(oldValue, newValue) {
      if (oldValue && !newValue) {
        setTimeout(() => {
          this.overlay = false
          this.error = false
        }, 3000)
      }
    },
  },
  created() {
    this.$route.fullPath.split('/')[1] === 'ar'
      ? (this.$vuetify.rtl = true)
      : (this.$vuetify.rtl = false)
  },
  methods: {
    Submit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.$axios
          .$post('', 
             this.nameSurname,
            this.phone,
            this.email,
            this.selectedProducts,
            this.message
          )
          .then((response) => {
            if (response.status) {
              this.$refs.form.reset()

              this.overlay = true
              this.loading = false
            } else {
              this.error = true

              this.overlay = true
              this.loading = false
            }
          })
      }
    },
  },
}
</script>
<style scoped>
.phone >>> input[type='number'] {
  -moz-appearance: textfield;
}
.phone >>> input::-webkit-outer-spin-button,
.phone >>> input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
