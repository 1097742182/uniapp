<template>
  <view class="personalCenter">
    <cl-header title="个人中心" :transparent="true" />

    <u-cell-group>
      <u-cell icon="account" title="头像" isLink>
        <view class="imageContent" slot="value" style="position: relative">
          <button
            type="balanced"
            open-type="chooseAvatar"
            @chooseavatar="onChooseavatar"
            class="buttonClass"
          >
            <image :src="avatarUrl" class="refreshIcon"> </image>
          </button>
        </view>
      </u-cell>

      <u-cell icon="order" title="用户名" isLink>
        <input
          type="nickname"
          slot="value"
          style="text-align: right"
          v-model="nickName"
        />
      </u-cell>

      <u-cell
        @click="chooseGender()"
        icon="man"
        title="性别"
        :value="genderValue"
        isLink
      >
      </u-cell>

      <u-cell
        @click="chooseCity()"
        icon="map"
        title="城市"
        :value="cityValue"
        isLink
      >
      </u-cell>
    </u-cell-group>

    <view style="margin: 20px" @click="submitBtnClick()">
      <u-button type="primary" text="提交修改"></u-button>
    </view>

    <u-picker
      ref="uPicker"
      :show="pickerShow"
      :columns="columns"
      :defaultIndex="[0]"
      @cancel="cancel"
      @confirm="confirm"
      @change="change"
    ></u-picker>
  </view>
</template>

<script>
export default {
  data() {
    return {
      avatarUrl: "",
      nickName: "",
      pickerType: "",
      pickerShow: false,
      columns: [],
      genderValue: "",
      genderColumns: [["男", "女"]],
      cityValue: "",
      cityColumns: [["广东"]],
      cityChildColumns: [],
    };
  },
  mounted() {
    this._initUserDetail();
    this._initCityColumns();
  },
  methods: {
    _initUserDetail() {
      this.avatarUrl = this.AvatarUrl ? this.AvatarUrl : this.ErrorAvatarUrl;
      this.nickName = this.NickName || "";
      this.genderValue = this.UserDetail["genderValue"];
      this.cityValue = this.UserDetail["cityValue"];
    },
    _initCityColumns() {
      const allCity = this.$api.user.getCity();
      const firstColumns = Object.keys(allCity);
      this.cityChildColumns = [];
      for (const city of firstColumns) {
        this.cityChildColumns.push(allCity[city]);
      }
      this.cityColumns = [firstColumns, this.cityChildColumns[0]];
    },
    chooseGender() {
      this.pickerType = "gender";
      this.columns = this.genderColumns;
      this.pickerShow = true;
    },
    chooseCity() {
      this.pickerType = "city";
      this.columns = this.cityColumns;
      this.pickerShow = true;
    },
    changeHandler1(e) {
      const {
        columnIndex,
        value,
        values,
        index,
        // 微信小程序无法将picker实例传出来，只能通过ref操作
        picker = this.$refs.uPicker,
      } = e;
      if (columnIndex === 0) {
        picker.setColumnValues(1, this.cityChildColumns[index]);
      }
    },
    change(e) {
      if (this.pickerType === "city") this.changeHandler1(e);
      console.log("change", e);
    },
    confirm(e) {
      console.log(e);
      this[`${this.pickerType}Value`] = e.value.join(" ");
      this.pickerShow = false;
    },
    cancel() {
      this.pickerShow = false;
    },
    submitBtnClick() {
      const nickName = this.nickName;
      const avatarUrl = this.avatarUrl;
      const cityValue = this.cityValue;
      const genderValue = this.genderValue;

      const userDetail = { nickName, avatarUrl, cityValue, genderValue };
      this.$store.dispatch("setUserDetail", userDetail);

      uni.$showMsg("修改用户信息成功");
      uni.navigateBack({ delta: 1 });
    },
    onChooseavatar(e) {
      this.avatarUrl = e.detail.avatarUrl;
      // if (this.avatarUrl) uni.setStorageSync("avatarUrl", this.avatarUrl);
    },
  },
};
</script>

<style lang="scss" scoped>
.personalCenter {
  background-image: linear-gradient(
    to bottom,
    rgb(165, 207, 244) 0%,
    white 100%
  );
  background-size: 100% 200px;
  background-repeat: no-repeat;
}

.refreshIcon {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  position: relative;
}

.buttonClass {
  background: #ffffff00;
  border: none;
  line-height: 1;
  border-radius: 100%;
}
</style>