<template>
  <div>
    <q-card flat bordered class="my-card">
      <q-btn
        outline
        dense
        icon="la la-edit"
        class="absolute text-white"
        style="top: 36px; right: 16px; transform: translateY(-50%); z-index: 999"
      >
        <q-tooltip>
          {{ $t("edit_profile") }}
        </q-tooltip>
      </q-btn>
      <q-img :src="config.defaultImageURL" height="180px" />
      <q-card-section>
        <q-avatar
          rounded
          class="bg-white absolute shadow-2"
          size="100px"
          style="top: 0; right: 16px; transform: translateY(-50%)"
        >
          <q-img cover lazy :src="config.defaultImageURL" />
        </q-avatar>

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">getAuthorName </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-caption text-grey">
           getAuthorBio 
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions class="row">
        <div class="col">500K Follower</div>
        <div class="col">500K Follower</div>
        <div class="col">500K Follower</div>
      </q-card-actions>
    </q-card>
  </div>
</template>


<script>
export default {
  // name: 'ComponentName',
  setup () {
    return {}
  }
}
</script>
