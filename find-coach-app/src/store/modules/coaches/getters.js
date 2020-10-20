export default {
  getCoaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.getCoaches;
    const userId = rootGetters.getUserId;
    return coaches.some((coach) => {
      return coach.id === userId;
    });
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimestamp = new Date().getTime();

    return (currentTimestamp - lastFetch) / 1000 > 60;
  },
};
