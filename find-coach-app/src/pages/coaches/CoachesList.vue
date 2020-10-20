<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p> {{error}} </p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">Refresh the list</base-button>
          <base-button v-if="!isCoach && !isLoading" link to="/register">Register as new coach</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCouches">
          <coach-item 
            v-for="coach in filteredCoaches" 
            :key="coach.id"
            :id="coach.id" 
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas">
          </coach-item>
        </ul>
      <h3 v-if="!hasCouches  && !isLoading">The coaches not found!</h3>
      </base-card>
  
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem';
import CoachFilter from '../../components/coaches/CoachFilter';
export default {
  components: {
    CoachItem,
    CoachFilter
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    }
  },
  created() {
    this.loadCoaches();
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coach/getCoaches'];
      return coaches.filter(coach => {
        if(this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        } else if (this.activeFilters.backend && coach.areas.includes('backend'))
        {
          return true;
        } else if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        } else {
          return false;
        }
      })
    },
    hasCouches() {
      return !this.isLoading && this.$store.getters['coach/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coach/isCoach'];
    }
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coach/loadCoaches', {
          forceRefresh: refresh
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong with fetching data';
      }
    
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  }
}
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .controls {
    display: flex;
    justify-content: space-between;
  }
</style>