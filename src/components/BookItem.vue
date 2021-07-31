<template>
  <div class="row">
    <q-card class="book-item" v-if="!isNil(data)" flat>
      <q-img
        :src="getThumbnail"
        :ratio="2 / 3"
        class="book-item-img rounded-img"
        clickable
        v-ripple
        @click="onClickEvent()"
      />
      <q-card-section class="q-pa-sm" v-if="mode === 'simple'">
        <div class="row no-wrap items-center">
          <div class="col ellipsis-2-lines text-weight-light">{{ getTitle }}</div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat v-if="mode === 'detail'" class="q-ml-md col fit">
      <q-card-section class="text-h6 title"> {{getTitle}} </q-card-section>
      <q-card-section> {{getDescription}} </q-card-section>
      <q-card-section >
        <q-btn
          dense
          outline
          class="q-px-sm q-mr-sm"
          icon="la la-pencil"
          :label="$t('edit')"
          @click="onEditEvent()"
        />
        <q-btn
          dense
          outline
          class="q-px-sm q-mr-sm"
          icon="la la-trash"
          :label="$t('delete')"
          @click="onDeleteEvent()"
        />
        <div class="q-btn q-btn--dense q-btn--outline q-btn--rectangle q-mr-sm">
          <q-checkbox color="positive" dense class="q-px-sm" v-model="published" :label="$t(published ? 'published':'private')" @click="published ? onUnpublishEvent() : onPublishEvent()"/>
        </div>
         <q-btn
          dense
          outline
          class="q-px-sm"
          icon="la la-plus"
          :label="$t('add_chapter')"
          @click="onAddChapterEvent()"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "BookItem",
  props: {
    data: {
      type: Object,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: false,
      default: "simple",
    },
    onEdit: {
      type: Function,
      default: () => {
        console.log("edit");
      },
    },
    onDelete: {
      type: Function,
      default: () => {
        console.log("delete");
      },
    },
    onPublish: {
      type: Function,
      default: () => {
        console.log("pulbish");
      },
    },
    onUnpublish: {
      type: Function,
      default: () => {
        console.log("unpublish");
      },
    },
    onAddChapter: {
      type: Function,
      default: () => {
        console.log("add chapter");
      },
    }
  },
  data() {
    return {
      published: true,
    };
  },
  methods: {
    onClickEvent() {
      this.$router.push(this.to);
    },
    onEditEvent() {
      this.onEdit();
    },
    onDeleteEvent() {
      this.onDelete();
    },
    onPublishEvent() {
      this.onPublish();
    },
    onUnpublishEvent() {
      this.onUnpublish();
    },
    onAddChapterEvent() {
      this.onAddChapter();
    }
  },
  computed: {
    getTitle() {
      return this.data.title;
    },
    getDescription() {
      return this.data.description;
    },
    getThumbnail() {
      return this.isNotEmpty(this.data.cover_img)
        ? this.data.cover_img[0].thumbnail_url
        : this.config.defaultImageURL;
    },
    getTo() {
      return this.to;
    },
  },
};
</script>

<style scoped>
.book-item,
.book-item-img {
  width: 130px;
}
.rounded-img {
  border-radius: 4px !important;
}
</style>
