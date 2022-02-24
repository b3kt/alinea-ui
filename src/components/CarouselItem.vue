<template>
  <div>
    <!--  -->
    <div class="row full-width">
      <div class="col-9 text-center q-my-auto">
        <div class="text-h4">asdhgfsahdgfahsgdasd</div>
        <div class="text-h6 text-weight-bold">asdhgfsahdgfahsgdasd</div>
        <div class="caption">asytdrya sda ds</div>
      </div>
      <q-card class="q-mx-auto" style="width:180px">
        <q-card-section class="q-pa-xs">
          <q-img lazy :src="config.defaultImageURL" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarouselItem",
  setup() {
    return {};
  },
};
</script>
