<template>
  <div class="row q-px-md q-py-sm" >
    <div class="col">
      <q-breadcrumbs separator="|"  v-once>
        <q-breadcrumbs-el class="text-weight-light text-small text-white" label="&copy; 2021 @alinea.app" />
        <q-breadcrumbs-el class="text-weight-light text-small text-white" :label="$t('about')" />
        <q-breadcrumbs-el class="text-weight-light text-small text-white" :label="$t('careers')" />
        <q-breadcrumbs-el class="text-weight-light text-small text-white" :label="$t('contact_us')" />
      </q-breadcrumbs>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  setup() {
    return {};
  },
};
</script>
