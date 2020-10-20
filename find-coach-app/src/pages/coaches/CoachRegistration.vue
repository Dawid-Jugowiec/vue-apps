<template>
  <section>
    <base-card>
        <coach-form @save-data = "saveData"></coach-form>
    </base-card>
  </section>

 
</template>
<script>
import CoachForm from '../../components/coaches/CoachForm';
export default {
  components: {
    CoachForm
  },
  methods: {
    saveData(savedData) {
      this.$store.dispatch('coach/registerCoach', savedData);
      this.$router.replace('/coaches');
    }
  }
}
</script>