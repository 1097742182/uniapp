const state = {
  UserGameDetail: [
    { content: "比赛次数", value: 0 },
    { content: "胜场次数", value: 0 },
    { content: "游戏胜率", value: "0%" },
    { content: "最少步数", value: 0 },
  ],
  RoomDetail: {},
  PkHistoryList: [
    {
      firstUser: "zhonglin",
      firstOpenId: "123123123",
      firstStep: 10,
      firstUseTime: "02:20",
      secondUser: "yanyan",
      secondOpenId: "qweqweqwe",
      secondStep: 5,
      secondUseTime: "01:20",
      roomId: "123123123",
      gameStatus: true,
    },
    {
      firstUser: "zhonglin",
      firstOpenId: "123123123",
      firstStep: 10,
      firstUseTime: "02:20",
      secondUser: "yanyan",
      secondOpenId: "qweqweqwe",
      secondStep: 5,
      secondUseTime: "01:20",
      roomId: "123123123",
      gameStatus: false,
    },
  ],
};

const mutations = {
  SET_UserGameDetail: (state, UserGameDetail) => {
    state.UserGameDetail = UserGameDetail;
  },
  SET_RoomDetail: (state, RoomDetail) => {
    state.RoomDetail = RoomDetail;
  },
  SET_PkHistoryList: (state, PkHistoryList) => {
    state.PkHistoryList = PkHistoryList;
  },
};

const actions = {
  initPkOnlineData({ commit, dispatch }) {
    dispatch("initUserGameDetail");
  },
  initUserGameDetail({ state, commit }) {
    let UserGameDetail = uni.getStorageSync("UserGameDetail");
    if (UserGameDetail) {
      UserGameDetail = JSON.parse(UserGameDetail);
      commit("SET_UserGameDetail", UserGameDetail);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
