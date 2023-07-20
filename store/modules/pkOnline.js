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

  // 当游戏结束时，将数据保存到UserGameDetail中
  setRoomDetailActions({ state, commit }, roomDetail) {
    const gameCount = state.UserGameDetail.filter((item) => item.content === "比赛次数")[0];
    const winCount = state.UserGameDetail.filter((item) => item.content === "胜场次数")[0];
    const winPercent = state.UserGameDetail.filter((item) => item.content === "游戏胜率")[0];
    const miniStep = state.UserGameDetail.filter((item) => item.content === "最少步数")[0];

    // 游戏次数+1
    gameCount.value = gameCount.value + 1;

    console.log(roomDetail);

    // 如果游戏胜利了
    if (roomDetail.gameStatus === "success") {
      // 则胜利次数+1
      winCount.value = winCount.value + 1;

      // 如果最少步数为0， 则直接复制为游戏步数
      if (miniStep.value == 0) miniStep.value = roomDetail.firstStep;
      // 如果最少步数 大与 游戏步数，则最少部署等于游戏步数
      else if (miniStep.value > roomDetail.firstStep) miniStep.value = roomDetail.firstStep;
    }

    // 并且重新计算百分比
    winPercent.value = ((winCount.value / gameCount.value) * 100).toFixed(2) + "%";

    commit("SET_UserGameDetail", state.UserGameDetail);
  },

  reloadPkHistoryList({ state, commit }) {
    for (let item of state.PkHistoryList) {
      if (item.gameStatus === "loading") {
        checkHistoryItemGameStatus(item);
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
