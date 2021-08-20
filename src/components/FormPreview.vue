<template>
  <div>
    <q-card flat bordered>
      <q-card-section class="absolute-right q-pa-sm">
        <q-btn
          class="q-ml-sm"
          color="grey"
          @click="onEditEvent()"
          outline
          dense
          icon="la la-edit"
        ></q-btn>
        <q-btn v-if="enableDelete"
          class="q-ml-sm"
          color="grey"
          @click="onDeleteEvent()"
          outline
          dense
          icon="la la-trash"
        ></q-btn>
      </q-card-section>
      <q-card-section horizontal v-for="(item, idx) in getDataArray" :key="idx" class="">
        <q-card-section style="width: 160px" class="text-weight-light col-1">
          {{ $t(item[0]) }}
        </q-card-section>
        <q-card-section>
          {{ item[1] }}
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "FormPreview",
  props: {
    data: {
      type: Object,
      required: true,
    },
    enableDelete: {
      type: Boolean,
      default: false
    },
    onEdit: {
      type: Function,
      default: (item) => {
        console.log("onEdit tiggered")
      }
    },
    onDelete: {
      type: Function,
    }
  },
  setup() {
    return {};
  },
  methods: {
    onEditEvent() {
      this.onEdit(this.data);
    },
    onDeleteEvent() {
      this.$q.dialog({
        title: this.$t("delete_confirm"),
        message: this.$t("delete_confirm_msg"),
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          this.onDelete(this.data);
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
  },
  mounted() {
    const test = this.data;
    console.log(Object.assign({}, test));
  },
  computed: {
    getDataArray() {
      return this.data !== undefined && this.data !== null ? Object.entries(this.data) : [];
    },
  },
};
</script>
