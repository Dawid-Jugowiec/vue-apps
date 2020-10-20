<template>
<div>
  <base-dialog :show="!!error" title="An error occured" @close="handleError">
    {{ error }}
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequests">
        <request-item v-for="request in acquiredRequests" :key="request.id" :email = request.email :message="request.message"></request-item>
      </ul>
      <h3 v-else>You have not reveived any requests yet!.</h3>
    </base-card>
  </section>
</div>

</template>

<script>
import RequestItem from '../../components/requests/RequestItem';
export default {
  components: {
    RequestItem
  },
  data() {
    return {
      isLoading: false,
      error: null
    }
  },
  computed: {
    acquiredRequests() {
      return this.$store.getters['req/getRequests'];
    },
    hasRequests() {
       return this.$store.getters['req/hasRequests'];
    }
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('req/fetchRequests');
      } catch(error) {
        this.error = error.message || "Problems with loading request list";
      }
     
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  },
  created() {
    this.loadRequests();
  }
}

</script>

<style scoped>
  header {
    text-align: center;
  }

  ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
  }

  h3 {
    text-align: center;
  }
</style>