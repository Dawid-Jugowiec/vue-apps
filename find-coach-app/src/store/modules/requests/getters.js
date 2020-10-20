export default {
  getRequests(state, _1, _2, rootGetters) {
    const coachId = rootGetters.getUserId;
    return state.requests.filter((request) => request.coachId === coachId);
  },
  hasRequests(_1, getters) {
    return getters.getRequests && getters.getRequests.length > 0;
  },
};
