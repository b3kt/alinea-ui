<template>
  <div>
    <q-card square class="shadow-1">
      <q-card-section class="title" style="padding: 7px">
        <q-btn color="primary" :label="$t('switch_view')" class="full-width" flat>
          <q-menu fit cover anchor="top left" class="bg-light-blue-2">
            <q-list style="min-width: 100px">
              <q-item
                clickable
                @click="onSwitchDashboard(obj)"
                v-for="(obj, idx) in getSession.roles"
                v-bind:key="idx"
              >
                <q-item-section>{{ $t(obj) }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  name: "ViewSwitcher",
  setup() {
    return {};
  },
  mounted() {
    const mode = this.$secureStorage.getItem("current_role");
    if (mode === undefined || mode === null) {
      this.$secureStorage.setItem("current_role", "user");
    }
  },
  methods: {
    onSwitchDashboard(mode) {
      console.log(mode)
      if (mode !== undefined) {
        this.$store
          .dispatch("model/switchView", {
            role: mode,
            uuid: this.getSession.decodedToken.sub,
          })
          .then((resp) => {
            this.$store.dispatch("keycloak/assignRole", resp);
            this.$secureStorage.removeItem("menus");
            this.$store.dispatch("model/fetchMenus");

            this.$router.go();
          });
      }
    },
  },
};
</script>
