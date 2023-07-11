const state = {
  RoomDetail: {},
};

const mutations = {
  SET_RoomDetail: (state, RoomDetail) => {
    state.RoomDetail = RoomDetail;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
