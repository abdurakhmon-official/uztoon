<template>
  <div class="container">
    <form @submit.prevent="saveDetails">
      <div class="row mb-3">
        <div class="col-sm-3">
          <label class="mb-0">First Name</label>
        </div>
        <div class="col-sm-9">
          <input
            type="text"
            class="form-control"
            v-model="editingUser.firstName"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-3">
          <label class="mb-0">Last Name</label>
        </div>
        <div class="col-sm-9">
          <input
            type="text"
            class="form-control"
            v-model="editingUser.lastName"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-3">
          <label class="mb-0">Email</label>
        </div>
        <div class="col-sm-9 text-secondary">
          <input
            type="email"
            class="form-control"
            v-model="editingUser.email"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-3">
          <label class="mb-0">Username</label>
        </div>
        <div class="col-sm-9 text-secondary">
          <input
            type="text"
            class="form-control"
            v-model="editingUser.username"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-3">
          <label class="mb-0">Phone</label>
        </div>
        <div class="col-sm-9 text-secondary">
          <input type="text" class="form-control" v-model="editingUser.phone" />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-3">
          <label class="mb-0">Country</label>
        </div>
        <div class="col-sm-9 text-secondary">
          <input
            type="text"
            class="form-control"
            v-model="editingUser.country"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-3">
          <label class="mb-0">Region</label>
        </div>
        <div class="col-sm-9 text-secondary">
          <input
            type="text"
            class="form-control"
            v-model="editingUser.region"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-3">
          <label class="mb-0">Profile Image</label>
        </div>
        <div class="col-sm-9 text-secondary">
          <base-dropzone
            :allowed-types="['.gif', '.jpg', '.jpeg', '.png', '.svg']"
            @on-removed="profileImage = null"
            @on-selected="(file: any) => profileImage = file"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-9 text-secondary text-right">
          <input
            type="submit"
            class="btn btn-primary px-4"
            value="Save Changes"
            :disabled="loading"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useAuthStore } from "@/store/auth";

export default defineComponent({
  props: {
    userToEdit: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      profileImage: null,
    };
  },
  setup(props) {
    const { userToEdit } = props;

    const { updateMe } = useAuthStore();

    return {
      loading: false,
      v$: useVuelidate(),
      editingUser: userToEdit,
      updateMe,
    };
  },
  methods: {
    async saveDetails() {
      const validation = await this.v$.$validate();
      if (validation) {
        this.loading = true;
        const response = await this.updateMe(
          this.editingUser,
          this.profileImage
        );
      } else {
        this.$toast.error("Please, check all fields!");
      }
      this.loading = false;
    },
  },
  validations: {
    editingUser: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      username: { required },
    },
  },
});
</script>

<style scoped>
label {
  color: #ffffffb2;
}
</style>
