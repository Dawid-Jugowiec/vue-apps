<template>
  <base-dialog
    v-if="inputIsInvalid"
    title="Invalid Input"
    @close="closeErrorDialogWindow"
  >
    <template #default>
      <p>At least one of the input value is invalid.</p>
      <p>
        Please check all the inputs and make sure you enter a few characters in
        each of input fields.
      </p>
    </template>
    <template #actions>
      <base-button @click="closeErrorDialogWindow">Okay</base-button>
    </template>
  </base-dialog>
  <base-card>
    <form @submit.prevent="submitData">
      <div class="form-control">
        <label for="title">Title</label>
        <input id="title" name="title" type="text" ref="titleInput" />
      </div>
      <div class="form-control">
        <label for="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          ref="descriptionInput"
        />
      </div>
      <div class="form-control">
        <label for="link">Link</label>
        <input id="link" name="link" type="url" ref="linkInput" />
      </div>
      <div>
        <base-button type="submit">Add Resource</base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  inject: ["addResource"],
  data() {
    return {
      inputIsInvalid: false,
    };
  },
  methods: {
    submitData() {
      const submittedTitle = this.$refs.titleInput.value;
      const submittedDescription = this.$refs.descriptionInput.value;
      const submittedLink = this.$refs.linkInput.value;

      if (
        submittedTitle.trim() === "" ||
        submittedDescription.trim() === "" ||
        submittedLink.trim() === ""
      ) {
        this.inputIsInvalid = true;
        return;
      }

      this.addResource(submittedTitle, submittedDescription, submittedLink);
    },
    closeErrorDialogWindow() {
      this.inputIsInvalid = false;
    },
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.form-control {
  margin: 1rem 0;
}
</style>