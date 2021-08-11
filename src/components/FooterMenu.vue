<template>
  <div class="row">
    <div class="col-4">
      <q-card flat>
        <q-card-section class="q-py-xs text-primary text-weight-bold">
          Alinea
        </q-card-section>
        <q-card-section class="q-pt-xs text-small text-weight-light">
          {{alineaDesc}}
        </q-card-section>
      </q-card>
    </div>
    <div class="col-5">
      <div class="row q-col-gutter-md q-pa-sm q-px-lg">
        <div class="col-6"><router-link class="hyperlink" to="/">First column</router-link></div>
        <div class="col-6"><router-link class="hyperlink" to="/">Second column</router-link></div>
        <div class="col-6"><router-link class="hyperlink" to="/">Third column</router-link></div>
        <div class="col-6"><router-link class="hyperlink" to="/">First column</router-link></div>
        <div class="col-6"><router-link class="hyperlink" to="/">Second column</router-link></div>
        <div class="col-6"><router-link class="hyperlink" to="/">Third column</router-link></div>
      </div>
    </div>
    <div class="col-3">
      <q-card flat>
        <q-card-section class="q-py-xs text-primary text-weight-bold">{{$t('digital_library_in_your_hand')}}</q-card-section>
        <q-card-section>
          <q-btn class="full-width" :label="$t('download_from')"></q-btn>
          <q-btn class="full-width" :label="$t('download_from')"></q-btn>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterMenu',
  setup () {
    return {
      alineaDesc: "Alinea is a digital library for read and write that contains a collections of inspirational books and stories from world-renowned authors and publishers "
    }
  }
}
</script>
