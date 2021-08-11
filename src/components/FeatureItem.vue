<template>
  <div>
    <q-card flat class="bg-transparent">
      <q-card-section class="text-center" horizontal>
        <q-card-section v-if="icon !== null">
          <q-icon :name="icon" size="xl" :color="color"/>
        </q-card-section>
        <q-card-section>
          <div :class="'text-' +color+ ' text-weight-bolder text-h6'">{{title}}</div>
        </q-card-section>
      </q-card-section>
      <q-card-section class="q-pt-none justify-center text-weight-light text-small ">
          asgfdahs dhas dha gdhfsagd fhasgd fhasgfdhags fdhasdhasdhasg hsadfhas
          asgfdahs dhas dha gdhfsagd fhasgd fhasgfdhags fdhasdhasdhasg hsadfhas
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'FeatureItem',
  props: {
    color: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    }
  },
  setup () {
    return {}
  }
}
</script>
