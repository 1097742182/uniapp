import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['Token'];

// 保存变量到本地存储中
const saveLifeData = function(key, value) {
    // 判断变量名是否在需要存储的数组中
    if (saveStateKeys.indexOf(key) != -1) {
        // 获取本地存储的lifeData对象，将变量添加到对象中
        let tmp = uni.getStorageSync('lifeData');
        // 第一次打开APP，不存在lifeData变量，故放一个{}空对象
        tmp = tmp ? tmp : {};
        tmp[key] = value;
        // 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
        uni.setStorageSync('lifeData', tmp);
    }
}

const store = new Vuex.Store({
    state: {
        GameBeginTitle: "关卡",
        Token: 'hello world',
        UserName: "微信用户", // 用户名称
        UserCount: 100, // 用户总分

        CurrentIndex: 0, // 当前选中输入框
        NumberList: ["", "", "", ""], // 输入框的值
        NumberCount: 4, // 输入数字的总数
        HistoryNumberList: [], // 历史数据
        HistoryNumberCount: 10, // 历史数据次数
        ButtonCount: 10, // 按钮的数量，默认为10
    },
    getters: {

    },
    mutations: {
        $uStore(state, payload) {
            // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
            let nameArr = payload.name.split('.');
            let saveKey = '';
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
            saveLifeData(saveKey, state[saveKey])
        },
        SET_GameBeginTitle(state, GameBeginTitle) {
            state.GameBeginTitle = GameBeginTitle
        },
        SET_UserName(state, UserName) {
            state.UserName = UserName
        },
        SET_UserCount(state, UserCount) {
            state.UserCount = UserCount
        },
        SET_CurrentIndex(state, CurrentIndex) {
            state.CurrentIndex = CurrentIndex
        },
        SET_NumberList(state, NumberList) {
            state.NumberList = NumberList
        },
        SET_NumberCount(state, NumberCount) {
            state.NumberCount = NumberCount
        },
        SET_HistoryNumberList(state, HistoryNumberList) {
            state.HistoryNumberList = HistoryNumberList
        },
        SET_HistoryNumberCount(state, HistoryNumberCount) {
            state.HistoryNumberCount = HistoryNumberCount
        },
        SET_ButtonCount(state, ButtonCount) {
            state.ButtonCount = ButtonCount
        },
    },
    actions: {
        setLevelOne({ commit }) {
            commit("SET_NumberCount", 2);
            commit("SET_HistoryNumberCount", 4);
            commit("SET_ButtonCount", 3);
            commit("SET_GameBeginTitle", "第一关");
        },
        setLevelTwo({ commit }) {
            commit("SET_NumberCount", 3);
            commit("SET_HistoryNumberCount", 5);
            commit("SET_ButtonCount", 5);
            commit("SET_GameBeginTitle", "第二关");
        },
        setLevelThree({ commit }) {
            commit("SET_NumberCount", 4);
            commit("SET_HistoryNumberCount", 7);
            commit("SET_ButtonCount", 6);
            commit("SET_GameBeginTitle", "第三关");
        },
        setLevelFour({ commit }) {
            commit("SET_NumberCount", 4);
            commit("SET_HistoryNumberCount", 10);
            commit("SET_ButtonCount", 10);
            commit("SET_GameBeginTitle", "第四关");
        }
    },
    modules: {

    },
})

// 从缓存中取得相同的key进行覆盖操作
let lifeData = uni.getStorageSync('lifeData') || {};
for (let key in lifeData) {
    if (store.state.hasOwnProperty(key)) {
        store.commit('$uStore', {
            name: key,
            value: lifeData[key]
        })
    }
}

export default store;