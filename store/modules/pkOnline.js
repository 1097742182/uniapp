import { formatDate, checkHistoryItemGameStatus } from "@/utils/index.js";

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
    uni.setStorageSync("UserGameDetail", UserGameDetail);
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

  checkUserGameDetailActions({ state, commit }) {
    const PkHistoryList = state.PkHistoryList;

    let gameCount = PkHistoryList.length;
    let winCount = 0;
    let miniStep = 0;
    for (let item of PkHistoryList) {
      if (item.gameStatus === "success") winCount += 1;
      if (miniStep == 0) miniStep = item.firstStep;
      else if (miniStep > item.firstStep) miniStep = item.firstStep;
    }

    let winPercent = ((winCount / gameCount) * 100).toFixed(2) + "%";

    const UserGameDetail = [
      { content: "比赛次数", value: gameCount },
      { content: "胜场次数", value: winCount },
      { content: "游戏胜率", value: winPercent },
      { content: "最少步数", value: miniStep },
    ];
    commit("SET_UserGameDetail", UserGameDetail);
  },

  reloadPkHistoryList({ state, commit, dispatch }) {
    for (let item of state.PkHistoryList) {
      if (item.gameStatus === "loading") checkHistoryItemGameStatus(item);
    }

    setTimeout(() => {
      commit("SET_PkHistoryList", state.PkHistoryList);
      setTimeout(() => dispatch("checkUserGameDetailActions"), 100); // 重新计算用户的PK记录
    }, 1000);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
