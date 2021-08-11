<template>
  <div class="q-py-md">
    <q-card flat>
      <q-card-section>
        <div>
          {{ $t("welcome_greeting") }},
          <span class="text-primary text-weight-bold">{{ getName }}</span>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section class="col" v-for="(item, idx) in quickmenu" :key="idx">
          <q-card flat bordered class="q-btn full-width q-btn--flat">
            <q-card-section class="text-center">
              <div><q-icon size="xl" :name="item.icon" /></div>
              <div>{{ $t(item.label) }}</div>
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "Quicklink",
  setup() {
    return {
      quickmenu: [
        { id: "library", label: "library", icon: "la la-home" },
        { id: "bookmark", label: "bookmark", icon: "la la-home" },
        { id: "rent", label: "rent", icon: "la la-home" },
        { id: "point", label: "point", icon: "la la-home" },
        { id: "mission", label: "mission", icon: "la la-home" },
      ],
    };
  },
  computed:{
    getName() {
      return this.myProfile !== undefined && this.myProfile !== null  ? this.myProfile.name : "";
    }
  }
};
</script>
