import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ["Token"];

// 保存变量到本地存储中
const saveLifeData = function (key, value) {
  // 判断变量名是否在需要存储的数组中
  if (saveStateKeys.indexOf(key) != -1) {
    // 获取本地存储的lifeData对象，将变量添加到对象中
    let tmp = uni.getStorageSync("lifeData");
    // 第一次打开APP，不存在lifeData变量，故放一个{}空对象
    tmp = tmp ? tmp : {};
    tmp[key] = value;
    // 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
    uni.setStorageSync("lifeData", tmp);
  }
};

const store = new Vuex.Store({
  state: {
    ErrorAvatarUrl:
      "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
    Token: "hello world",
    OpenId: "", // 用户openid
    NickName: "", // 用户名称
    AvatarUrl: "", // 用户头像
    UserDetail: {}, // 用户补充信息(city, gender)
    UserCount: -1, // 用户总分
    LevelStep: -1, // 当前用户的关卡

    GameBeginTitle: "关卡",
    CurrentIndex: 0, // 当前选中输入框
    NumberList: ["", "", "", ""], // 输入框的值
    NumberCount: 4, // 输入数字的总数
    HistoryNumberList: [], // 历史数据
    HistoryNumberCount: 10, // 历史数据次数
    ButtonCount: 10, // 按钮的数量，默认为10
    LevelCount: -1, // 关卡分数
    SecondHistory: false, // 是否开启第二次历史数据
    CurrentLevelNumberResult: [], // 当前关卡的答案
    CurrentLevelNumberResultShow: false, // 是否显示答案

    musicPlayer: null, // 展示音乐的
  },
  getters: {},
  mutations: {
    $uStore(state, payload) {
      // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
      let nameArr = payload.name.split(".");
      let saveKey = "";
      let len = nameArr.length;
      if (nameArr.length >= 2) {
        let obj = state[nameArr[0]];
        for (let i = 1; i < len - 1; i++) {
          obj = obj[nameArr[i]];
        }
        obj[nameArr[len - 1]] = payload.value;
        saveKey = nameArr[0];
      } else {
        // 单层级变量，在state就是一个普通变量的情况
        state[payload.name] = payload.value;
        saveKey = payload.name;
      }
      // 保存变量到本地，见顶部函数定义
      saveLifeData(saveKey, state[saveKey]);
    },
    SET_GameBeginTitle(state, GameBeginTitle) {
      state.GameBeginTitle = GameBeginTitle;
    },
    SET_OpenId(state, OpenId) {
      state.OpenId = OpenId;
    },
    SET_NickName(state, NickName) {
      state.NickName = NickName;
    },
    SET_AvatarUrl(state, AvatarUrl) {
      state.AvatarUrl = AvatarUrl;
    },
    SET_UserDetail(state, UserDetail) {
      state.UserDetail = UserDetail;
    },
    SET_UserCount(state, UserCount) {
      state.UserCount = UserCount;
    },
    SET_CurrentIndex(state, CurrentIndex) {
      state.CurrentIndex = CurrentIndex;
    },
    SET_NumberList(state, NumberList) {
      state.NumberList = NumberList;
    },
    SET_NumberCount(state, NumberCount) {
      state.NumberCount = NumberCount;
    },
    SET_HistoryNumberList(state, HistoryNumberList) {
      state.HistoryNumberList = HistoryNumberList;
    },
    SET_HistoryNumberCount(state, HistoryNumberCount) {
      state.HistoryNumberCount = HistoryNumberCount;
    },
    SET_ButtonCount(state, ButtonCount) {
      state.ButtonCount = ButtonCount;
    },
    SET_LevelCount(state, LevelCount) {
      state.LevelCount = LevelCount;
    },
    SET_LevelStep(state, LevelStep) {
      state.LevelStep = LevelStep;
    },
    SET_SecondHistory(state, SecondHistory) {
      state.SecondHistory = SecondHistory;
    },
    SET_CurrentLevelNumberResult(state, CurrentLevelNumberResult) {
      state.CurrentLevelNumberResult = CurrentLevelNumberResult;
    },
    SET_CurrentLevelNumberResultShow(state, CurrentLevelNumberResultShow) {
      state.CurrentLevelNumberResultShow = CurrentLevelNumberResultShow;
    },

    setMusicPlayer: (state, musicPlayer) => {
      state.musicPlayer = musicPlayer;
    },
  },
  actions: {
    // 初始化用户状态
    initUserStatus({ state, commit }) {
      // 初始化NickName
      if (!state.NickName) {
        let nickName = uni.getStorageSync("nickName");
        commit("SET_NickName", nickName);
      }

      // 初始化AvatarUrl
      if (!state.AvatarUrl) {
        let avatarUrl = uni.getStorageSync("avatarUrl");
        commit("SET_AvatarUrl", avatarUrl);
      }

      // 初始化UserStep
      if (state.LevelStep === -1) {
        let levelStep = uni.getStorageSync("LevelStep");
        levelStep = levelStep ? levelStep : 1;
        commit("SET_LevelStep", levelStep);
      }

      // 初始化UserDetail
      if (Object.keys(state.UserDetail).length === 0) {
        let genderValue = uni.getStorageSync("genderValue");
        let cityValue = uni.getStorageSync("cityValue");
        commit("SET_UserDetail", { genderValue, cityValue });
      }

      // 初始化UserCount
      let userCount = state.UserCount;
      if (!userCount || userCount === -1) {
        const storageUserCount = uni.getStorageSync("UserCount"); // 从缓存里面获取分数
        userCount = storageUserCount ? storageUserCount : 100; // 如果缓存里面的分数为空，则默认为100

        if (!storageUserCount) uni.setStorageSync("UserCount", userCount);
        commit("SET_UserCount", userCount);
      }
    },
    updateUserInfoByInterfaceData({ state, commit, dispatch }, userInfo) {
      const openId = userInfo["openId"];
      const nickname = userInfo["nickname"];
      // const avatarUrl = userInfo["avatarUrl"];
      const cityValue = userInfo["cityValue"];
      const genderValue = userInfo["genderValue"];
      const UserCount = userInfo["UserCount"];
      const LevelStep = userInfo["LevelStep"];

      // 存到Vuex中
      if (openId) commit("SET_OpenId", openId);
      if (nickname) commit("SET_NickName", nickname);
      // if (avatarUrl) commit("SET_AvatarUrl", avatarUrl);
      if (UserCount) commit("SET_UserCount", UserCount);
      if (LevelStep) commit("SET_LevelStep", LevelStep);
      if (genderValue || cityValue) commit("SET_UserDetail", { genderValue, cityValue });

      // 存到storeage中
      if (openId) uni.setStorageSync("openId", openId);
      if (nickname) uni.setStorageSync("nickName", nickname);
      // if (avatarUrl) uni.setStorageSync("avatarUrl", avatarUrl);
      if (cityValue) uni.setStorageSync("cityValue", cityValue);
      if (genderValue) uni.setStorageSync("genderValue", genderValue);
      if (UserCount) uni.setStorageSync("UserCount", UserCount);
      if (LevelStep) uni.setStorageSync("LevelStep", LevelStep);

      console.log(state);
    },
    _setDefaultLevelValue({ commit }) {
      commit("SET_SecondHistory", false);
      commit("SET_CurrentLevelNumberResult", []);
      commit("SET_CurrentLevelNumberResultShow", false);
    },
    setLevelOne({ commit, dispatch }) {
      dispatch("_setDefaultLevelValue");
      commit("SET_NumberCount", 2);
      commit("SET_HistoryNumberCount", 4);
      commit("SET_ButtonCount", 3);
      commit("SET_LevelCount", 100);
      setTimeout(() => commit("SET_GameBeginTitle", "第一关"), 0);
    },
    setLevelTwo({ commit, dispatch }) {
      dispatch("_setDefaultLevelValue");
      commit("SET_NumberCount", 3);
      commit("SET_HistoryNumberCount", 5);
      commit("SET_ButtonCount", 5);
      commit("SET_LevelCount", 300);
      setTimeout(() => commit("SET_GameBeginTitle", "第二关"), 0);
    },
    setLevelThree({ commit, dispatch }) {
      dispatch("_setDefaultLevelValue");
      commit("SET_NumberCount", 4);
      commit("SET_HistoryNumberCount", 7);
      commit("SET_ButtonCount", 6);
      commit("SET_LevelCount", 600);
      setTimeout(() => commit("SET_GameBeginTitle", "第三关"), 0);
    },
    setLevelFour({ commit, dispatch }) {
      dispatch("_setDefaultLevelValue");
      commit("SET_NumberCount", 4);
      commit("SET_HistoryNumberCount", 10);
      commit("SET_ButtonCount", 10);
      commit("SET_LevelCount", 1000);
      setTimeout(() => commit("SET_GameBeginTitle", "第四关"), 0);
    },
    setLevelFive({ commit, dispatch }) {
      dispatch("_setDefaultLevelValue");
      commit("SET_NumberCount", 5);
      commit("SET_HistoryNumberCount", 10);
      commit("SET_ButtonCount", 10);
      commit("SET_LevelCount", 1500);
      setTimeout(() => commit("SET_GameBeginTitle", "第五关"), 0);
    },
    // 更新用户积分(旧)
    ADD_UserCount({ state, commit }, LevelCount) {
      let userCount = parseInt(state.UserCount);
      userCount = userCount + parseInt(LevelCount);

      if (userCount) commit("SET_UserCount", userCount);
      if (userCount) uni.setStorageSync("UserCount", userCount);
    },
    // 更新用户积分
    UPDATE_UserCount({ commit }, UserCount) {
      if (UserCount) commit("SET_UserCount", UserCount);
      if (UserCount) uni.setStorageSync("UserCount", UserCount);
    },

    setLevelStep({ state, commit }) {
      let levelStep = parseInt(state.LevelStep);
      let currentLevelStep = parseInt(state.LevelStep);

      if (state.GameBeginTitle === "第一关" && currentLevelStep === 1) levelStep = 2;
      if (state.GameBeginTitle === "第二关" && currentLevelStep === 2) levelStep = 3;
      if (state.GameBeginTitle === "第三关" && currentLevelStep === 3) levelStep = 4;
      if (state.GameBeginTitle === "第四关" && currentLevelStep === 4) levelStep = 5;

      commit("SET_LevelStep", levelStep);
      uni.setStorageSync("LevelStep", levelStep);
    },
    setUserDetail({ commit }, userDetail) {
      const { nickName, avatarUrl, cityValue, genderValue } = userDetail;
      commit("SET_UserDetail", { cityValue, genderValue });
      commit("SET_NickName", nickName);
      commit("SET_AvatarUrl", avatarUrl);

      uni.setStorageSync("cityValue", cityValue);
      uni.setStorageSync("genderValue", genderValue);
      uni.setStorageSync("nickName", nickName);
      uni.setStorageSync("avatarUrl", avatarUrl);
    },

    createMusicPlayer({ commit }) {
      const musicPlayer = uni.createInnerAudioContext();
      musicPlayer.autoplay = true;
      musicPlayer.loop = true;
      musicPlayer.src = "https://assets.mixkit.co/active_storage/sfx/1000/1000-preview.mp3";
      commit("setMusicPlayer", musicPlayer);
    },
  },
  modules: {},
});

// 从缓存中取得相同的key进行覆盖操作
let lifeData = uni.getStorageSync("lifeData") || {};
for (let key in lifeData) {
  if (store.state.hasOwnProperty(key)) {
    store.commit("$uStore", {
      name: key,
      value: lifeData[key],
    });
  }
}

export default store;
