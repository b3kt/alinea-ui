<template>
  <div class="q-py-md">
    <q-card flat class="q-pa-none">
      <q-card-section>
        <div>
          {{ $t("welcome_greeting") }},
          <span class="text-primary text-weight-bold">{{ getName }}</span>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section horizontal class="q-pa-md">
        <q-card-section
          class="col q-pa-none q-mx-sm"
          v-for="(item, idx) in quickmenu"
          :key="idx"
        >
          <router-link :to="item.to" class="hyperlink clickable">
            <q-card flat bordered class="q-btn full-width q-btn--flat">
              <q-card-section class="text-center text-grey">
                <div><q-icon size="xl" :name="item.icon" /></div>
                <div class="text-weight-light text-small">{{ $t(item.label) }}</div>
              </q-card-section>
            </q-card>
          </router-link>
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
        {
          to: "/user/dashboard/library",
          id: "library",
          label: "library",
          icon: "la la-book",
        },
        {
          to: "/user/dashboard/bookmark",
          id: "bookmark",
          label: "bookmark",
          icon: "la la-bookmark",
        },
        { to: "/user/dashboard/rent", id: "rent", label: "rent", icon: "la la-clock" },
        { to: "/user/dashboard/point", id: "point", label: "point", icon: "la la-coins" },
        {
          to: "/user/dashboard/mission",
          id: "mission",
          label: "mission",
          icon: "la la-check",
        },
      ],
    };
  },
  computed: {
    getName() {
      return this.myProfile !== undefined && this.myProfile !== null
        ? this.myProfile.name
        : "";
    },
  },
};
</script>
