export default {
  async contactCoach(context, payload) {
    const newRequest = {
      email: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      'https://find-coach-app.firebaseio.com/requests/' + payload.id + '.json',
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to send list of requests!'
      );
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.coachId = payload.id;

    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const userId = context.rootGetters.getUserId;

    const response = await fetch(
      'https://find-coach-app.firebaseio.com/requests/' + userId + '.json'
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch list of requests!'
      );
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: userId,
        email: responseData[key].email,
        message: responseData[key].message,
      };
      requests.push(request);
    }

    context.commit('setRequests', requests);
  },
};
