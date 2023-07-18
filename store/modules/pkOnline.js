import { formatDate } from "@/utils/index.js";

const state = {
  UserGameDetail: [
    { content: "比赛次数", value: 0 },
    { content: "胜场次数", value: 0 },
    { content: "游戏胜率", value: "0%" },
    { content: "最少步数", value: 0 },
  ],
  RoomDetail: {},
  PkHistoryList: [],
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
    uni.setStorageSync("PkHistoryList", PkHistoryList);
  },
};

const actions = {
  initPkOnlineData({ commit, dispatch }) {
    dispatch("initUserGameDetail");
    dispatch("initPkHistoryList");
  },

  // 初始化用户PK记录
  initUserGameDetail({ state, commit }) {
    let UserGameDetail = uni.getStorageSync("UserGameDetail");
    if (UserGameDetail) {
      commit("SET_UserGameDetail", UserGameDetail);
    }
  },

  // 初始化PK历史记录
  initPkHistoryList({ state, commit }) {
    let PkHistoryList = uni.getStorageSync("PkHistoryList");
    console.log(PkHistoryList);
    if (PkHistoryList) {
      commit("SET_PkHistoryList", PkHistoryList);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
