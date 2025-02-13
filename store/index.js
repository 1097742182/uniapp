import Vue from "vue";
import PkOnline from "./modules/pkOnline";
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
    HardLevelStep: -1, // 困难关卡的等级

    GameBeginTitle: "关卡",
    CurrentLevelType: "normal",
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
    RightButtonNumber: null, // 展示正确的数字
    ErrorButtonNumber: null, // 展示错误的数字

    PKLevelStatus: false, // 是否为PK关卡

    MusicPlayer: null, // 展示音乐的
    MusicPlayStatus: false, // 是否正在播放音乐
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
    SET_HardLevelStep(state, HardLevelStep) {
      state.HardLevelStep = HardLevelStep;
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
    SET_RightButtonNumber: (state, RightButtonNumber) => {
      state.RightButtonNumber = RightButtonNumber;
    },
    SET_ErrorButtonNumber: (state, ErrorButtonNumber) => {
      state.ErrorButtonNumber = ErrorButtonNumber;
    },

    SET_PKLevelStatus: (state, PKLevelStatus) => {
      state.PKLevelStatus = PKLevelStatus;
    },

    setMusicPlayer: (state, MusicPlayer) => {
      state.MusicPlayer = MusicPlayer;
    },
    setMusicPlayStatus: (state, MusicPlayStatus) => {
      state.MusicPlayStatus = MusicPlayStatus;
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
        levelStep = levelStep || 1;
        commit("SET_LevelStep", levelStep);
      }

      // 初始化UserStep
      if (state.HardLevelStep === -1) {
        let HardLevelStep = uni.getStorageSync("HardLevelStep");
        HardLevelStep = HardLevelStep || 1;
        commit("SET_HardLevelStep", HardLevelStep);
      }

      // 初始化HardLevelStep
      if (state.HardLevelStep === -1) {
        let hardLevelStep = uni.getStorageSync("HardLevelStep");
        hardLevelStep = hardLevelStep || 1;
        commit("SET_HardLevelStep", hardLevelStep);
        console.log(state.HardLevelStep);
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
    // 根据接口返回的信息，更新用户数据
    updateUserInfoByInterfaceData({ state, commit, dispatch }, userInfo) {
      const {
        openId,
        nickname,
        avatarUrl,
        cityValue,
        genderValue,
        UserCount,
        LevelStep,
        HardLevelStep,
        UserGameDetail,
        PkHistoryList,
      } = userInfo;

      // 存到Vuex中
      if (openId) commit("SET_OpenId", openId);
      if (nickname) commit("SET_NickName", nickname);
      // if (avatarUrl) commit("SET_AvatarUrl", avatarUrl);
      if (UserCount) commit("SET_UserCount", UserCount);
      if (LevelStep) commit("SET_LevelStep", LevelStep);
      if (HardLevelStep) commit("SET_HardLevelStep", HardLevelStep);
      if (genderValue || cityValue) commit("SET_UserDetail", { genderValue, cityValue });

      // 存到storeage中
      if (openId) uni.setStorageSync("openId", openId);
      if (nickname) uni.setStorageSync("nickName", nickname);
      // if (avatarUrl) uni.setStorageSync("avatarUrl", avatarUrl);
      if (cityValue) uni.setStorageSync("cityValue", cityValue);
      if (genderValue) uni.setStorageSync("genderValue", genderValue);
      if (UserCount) uni.setStorageSync("UserCount", UserCount);
      if (LevelStep) uni.setStorageSync("LevelStep", LevelStep);
      if (HardLevelStep) uni.setStorageSync("HardLevelStep", HardLevelStep);
      if (UserGameDetail) uni.setStorageSync("UserGameDetail", JSON.parse(UserGameDetail));
      if (PkHistoryList) uni.setStorageSync("PkHistoryList", JSON.parse(PkHistoryList));

      console.log(state);
    },
    _setDefaultLevelValue({ commit }) {
      commit("SET_SecondHistory", false);
      commit("SET_PKLevelStatus", false);
      commit("SET_CurrentIndex", 0);
      commit("SET_CurrentLevelNumberResult", []);
      commit("SET_CurrentLevelNumberResultShow", false);
      commit("SET_RightButtonNumber", null);
      commit("SET_ErrorButtonNumber", null);
    },
    setLevelOne({ state, commit, dispatch }) {
      dispatch("_setDefaultLevelValue");
      commit("SET_NumberCount", 2);
      commit("SET_HistoryNumberCount", 4);
      commit("SET_ButtonCount", 3);
      commit("SET_LevelCount", 100);
      setTimeout(() => commit("SET_GameBeginTitle", "第一关"), 0);
      if (state.CurrentLevelType == "hard") commit("SET_LevelCount", state.LevelCount * 2);
    },
    setLevelTwo({ state, commit, dispatch }) {
      dispatch("_setDefaultLevelValue");
      commit("SET_NumberCount", 3);
      commit("SET_HistoryNumberCount", 5);
      commit("SET_ButtonCount", 5);
      commit("SET_LevelCount", 200);
      setTimeout(() => commit("SET_GameBeginTitle", "第二关"), 0);
      if (state.CurrentLevelType == "hard") commit("SET_LevelCount", state.LevelCount * 2);
    },
    setLevelThree({ state, commit, dispatch }) {
      dispatch("_setDefaultLevelValue");
      commit("SET_NumberCount", 3);
      commit("SET_HistoryNumberCount", 6);
      commit("SET_ButtonCount", 8);
      commit("SET_LevelCount", 300);
      setTimeout(() => commit("SET_GameBeginTitle", "第三关"), 0);
      if (state.CurrentLevelType == "hard") commit("SET_LevelCount", state.LevelCount * 2);
    },
    setLevelFour({ state, commit, dispatch }) {
      dispatch("_setDefaultLevelValue");
      commit("SET_NumberCount", 4);
      commit("SET_HistoryNumberCount", 7);
      commit("SET_ButtonCount", 6);
      commit("SET_LevelCount", 400);
      setTimeout(() => commit("SET_GameBeginTitle", "第四关"), 0);
      if (state.CurrentLevelType == "hard") commit("SET_LevelCount", state.LevelCount * 2);
    },
    setLevelFive({ state, commit, dispatch }) {
      dispatch("_setDefaultLevelValue");
      commit("SET_NumberCount", 4);
      commit("SET_HistoryNumberCount", 8);
      commit("SET_ButtonCount", 8);
      commit("SET_LevelCount", 500);
      setTimeout(() => commit("SET_GameBeginTitle", "第五关"), 0);
      if (state.CurrentLevelType == "hard") commit("SET_LevelCount", state.LevelCount * 2);
    },
    setLevelSix({ state, commit, dispatch }) {
      dispatch("_setDefaultLevelValue");
      commit("SET_NumberCount", 4);
      commit("SET_HistoryNumberCount", 10);
      commit("SET_ButtonCount", 10);
      commit("SET_LevelCount", 600);
      setTimeout(() => commit("SET_GameBeginTitle", "第六关"), 0);
      if (state.CurrentLevelType == "hard") commit("SET_LevelCount", state.LevelCount * 2);
    },
    setLevelSeven({ state, commit, dispatch }) {
      dispatch("_setDefaultLevelValue");
      commit("SET_NumberCount", 5);
      commit("SET_HistoryNumberCount", 9);
      commit("SET_ButtonCount", 8);
      commit("SET_LevelCount", 800);
      setTimeout(() => commit("SET_GameBeginTitle", "第七关"), 0);
      if (state.CurrentLevelType == "hard") commit("SET_LevelCount", state.LevelCount * 2);
    },
    setLevelEight({ state, commit, dispatch }) {
      dispatch("_setDefaultLevelValue");
      commit("SET_NumberCount", 5);
      commit("SET_HistoryNumberCount", 10);
      commit("SET_ButtonCount", 10);
      commit("SET_LevelCount", 1000);
      setTimeout(() => commit("SET_GameBeginTitle", "第八关"), 0);
      if (state.CurrentLevelType == "hard") commit("SET_LevelCount", state.LevelCount * 2);
    },
    setLevelNine({ state, commit, dispatch }) {
      dispatch("_setDefaultLevelValue");
      commit("SET_NumberCount", 6);
      commit("SET_HistoryNumberCount", 12);
      commit("SET_ButtonCount", 10);
      commit("SET_LevelCount", 1500);
      setTimeout(() => commit("SET_GameBeginTitle", "第九关"), 0);
      if (state.CurrentLevelType == "hard") commit("SET_LevelCount", state.LevelCount * 2);
    },
    setPKLevel({ state, commit, dispatch }) {
      dispatch("_setDefaultLevelValue");
      commit("SET_PKLevelStatus", true); // 标记为PK状态，可用于标记其他功能，例如开启计时
      commit("SET_NumberCount", 4);
      commit("SET_HistoryNumberCount", 10);
      commit("SET_ButtonCount", 10);
      commit("SET_LevelCount", 1000);
      setTimeout(() => commit("SET_GameBeginTitle", "线上PK"), 0);
    },

    // 更新用户积分
    UPDATE_UserCount({ commit }, UserCount) {
      if (UserCount) commit("SET_UserCount", UserCount);
      if (UserCount) uni.setStorageSync("UserCount", UserCount);
    },

    setLevelStep({ state, commit }) {
      if (state.CurrentLevelType === "normal") {
        let levelStep = parseInt(state.LevelStep);
        let currentLevelStep = parseInt(state.LevelStep);

        if (state.GameBeginTitle === "第一关" && currentLevelStep === 1) levelStep = 2;
        if (state.GameBeginTitle === "第二关" && currentLevelStep === 2) levelStep = 3;
        if (state.GameBeginTitle === "第三关" && currentLevelStep === 3) levelStep = 4;
        if (state.GameBeginTitle === "第四关" && currentLevelStep === 4) levelStep = 5;
        if (state.GameBeginTitle === "第五关" && currentLevelStep === 5) levelStep = 6;
        if (state.GameBeginTitle === "第六关" && currentLevelStep === 6) levelStep = 7;
        if (state.GameBeginTitle === "第七关" && currentLevelStep === 7) levelStep = 8;
        if (state.GameBeginTitle === "第八关" && currentLevelStep === 8) levelStep = 9;

        commit("SET_LevelStep", levelStep);
        uni.setStorageSync("LevelStep", levelStep);
      } else if (state.CurrentLevelType === "hard") {
        let levelStep = parseInt(state.HardLevelStep);
        let currentLevelStep = parseInt(state.HardLevelStep);

        if (state.GameBeginTitle === "第一关" && currentLevelStep === 1) levelStep = 2;
        if (state.GameBeginTitle === "第二关" && currentLevelStep === 2) levelStep = 3;
        if (state.GameBeginTitle === "第三关" && currentLevelStep === 3) levelStep = 4;
        if (state.GameBeginTitle === "第四关" && currentLevelStep === 4) levelStep = 5;
        if (state.GameBeginTitle === "第五关" && currentLevelStep === 5) levelStep = 6;
        if (state.GameBeginTitle === "第六关" && currentLevelStep === 6) levelStep = 7;
        if (state.GameBeginTitle === "第七关" && currentLevelStep === 7) levelStep = 8;
        if (state.GameBeginTitle === "第八关" && currentLevelStep === 8) levelStep = 9;

        commit("SET_HardLevelStep", levelStep);
        uni.setStorageSync("HardLevelStep", levelStep);
      }

      // 更新用户信息到数据库
      const data = { openId: state.OpenId, nickname: state.NickName };
      if (state.LevelStep && state.LevelStep != -1) data["LevelStep"] = state.LevelStep;
      if (state.HardLevelStep && state.HardLevelStep != -1) data["HardLevelStep"] = state.HardLevelStep;
      uni.$http.post("/number/update_data", data);
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
      const MusicPlayer = uni.createInnerAudioContext();
      MusicPlayer.autoplay = true;
      MusicPlayer.loop = true;
      MusicPlayer.volume = 0.5;
      MusicPlayer.src = "https://www.xinyongji.com:9898/media/MP3/gameMusic.MP3";
      commit("setMusicPlayStatus", true);

      // 监听音乐播放事件，更新状态码
      MusicPlayer.onPlay(() => {
        commit("setMusicPlayStatus", true);
        console.log("音乐开始");
      });

      // 监听音乐暂停事件，更新状态码
      MusicPlayer.onPause(() => {
        commit("setMusicPlayStatus", false);
        console.log("音乐暂停");
      });

      commit("setMusicPlayer", MusicPlayer);
    },
  },
  modules: {
    PkOnline,
  },
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
