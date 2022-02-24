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

import { mapGetters } from "vuex";
import authorProfileSchema from "components/forms/author-profile-form";
export default {
  name: "ProfileCard",
  setup() {
    return {};
  },
  methods: {
    populateFormModel() {
      if (!this.isNil(this.getProfile)) {
        authorProfileSchema.name.value = this.getProfile.name;
        authorProfileSchema.bio.value = this.getProfile.bio;
        authorProfileSchema.email.value = this.getProfile.email;
        authorProfileSchema.phone.value = this.getProfile.phone;
        authorProfileSchema.website.value = this.getProfile.website;
      }
    },
    onEditProfile() {
      this.populateFormModel();
      this.$store.commit("ui/showDashboardDialog", {
        title: this.$t("edit_profile"),
        schema: authorProfileSchema,
        events: {
          onSave: () => {
            this.onSaveProfile();
          },
        }
      });
    },
    onSaveProfile() {
      if (this.getDialogModel !== undefined && this.getDialogModel !== null) {
        const vars = {
          name:
            this.getDialogModel.name !== undefined
              ? this.getDialogModel.name
              : this.getProfile.name,
          bio:
            this.getDialogModel.bio !== undefined
              ? this.getDialogModel.bio
              : this.getProfile.bio,
          email: this.getProfile.email,
          phone:
            this.getDialogModel.phone !== undefined
              ? this.getDialogModel.phone
              : this.getProfile.phone,
          website:
            this.getDialogModel.website !== undefined
              ? this.getDialogModel.website
              : this.getProfile.website,
          uid: this.getUserUID,
        };

        const resp = this.$store.dispatch("model/updateProfile", vars);
        if (resp !== undefined && resp !== null) {
          resp.then(() => {
            this.$q.notify({
              color: "positive",
              message: this.$t("succesfully_saved"),
            });
            this.$store.commit("ui/hideDashboardDialog");
            this.$store.commit("model/setProfile", null);
            this.initProfile();
          });
        }

        // if(this.getDialogModel.cover !== undefined){
        //   this.doUpload({
        //     file: this.getDialogModel.cover,
        //     name: 'profile',
        //     field: 'cover',
        //     id: this.getUserUID
        //   }).then(() => {
        //     this.$store.commit("ui/hideDashboardDialog");
        //     this.$store.commit("model/setProfile", null);
        //   });
        // }

        // if(this.getDialogModel.avatar !== undefined){
        //   this.doUpload({
        //     file: this.getDialogModel.avatar,
        //     name: 'profile',
        //     field: 'avatar',
        //     id: this.getUserUID
        //   }).then(() => {
        //     this.$store.commit("ui/hideDashboardDialog");
        //     this.$store.commit("model/setProfile", null);
        //   });
        // }
      }
    },
  },
  computed: {
    ...mapGetters({
      getProfile: "model/getProfile",
    }),
    getDialogModel() {
      return this.getDialogForm.model;
    },
  },
};
</script>
