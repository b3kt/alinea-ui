<template>
  <div>
    <q-card flat bordered class="my-card">
      <q-btn
        outline
        dense
        icon="la la-edit"
        class="absolute text-white"
        style="top: 36px; right: 16px; transform: translateY(-50%); z-index: 999"
        @click="onEditProfile()"
      >
        <q-tooltip>
          {{ $t("edit_profile") }}
        </q-tooltip>
      </q-btn>
      <q-img :src="getAuthorCover" height="180px" />
      <q-card-section>
        <q-avatar
          rounded
          class="bg-white absolute shadow-2"
          size="100px"
          style="top: 0; right: 16px; transform: translateY(-50%)"
        >
          <q-img cover lazy :src="getAuthorAvatar" />
        </q-avatar>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis text-capitalize">{{ getAuthorName }}</div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-caption text-grey">
          {{ getAuthorBio }}
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
import authorProfileSchema from "components/forms/author-profile-form";
export default {
  name: "ProfileCard",
  setup() {
    return {};
  },
  methods: {
    populateFormModel() {
      if (!this.isNil(this.myProfile)) {
        authorProfileSchema.name.value = this.myProfile.name;
        authorProfileSchema.bio.value = this.myProfile.bio;
        authorProfileSchema.email.value = this.myProfile.email;
        authorProfileSchema.phone.value = this.myProfile.phone;
        authorProfileSchema.website.value = this.myProfile.website;
      }
    },
    onEditProfile() {
      this.populateFormModel();
      this.$store.commit("ui/showDashboardDialog", {
        title: this.$t("edit_profile"),
        schema: authorProfileSchema,
      });
    },
  },
  computed: {
    
  },
};
</script>
