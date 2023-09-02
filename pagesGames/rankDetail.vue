<template>
  <view style="padding: 10px 20px">
    <cl-header title="排名详情" :transparent="false" />
    <UserCountCard> </UserCountCard>
    <view class="content">
      <view v-for="(item, index) in rankDetail" :key="index" class="userItem">
        <view style="width: 30px; position: absolute; left: 30px">{{ index + 1 }}</view>
        <view class="userDetail">
          <view>{{ item.nickname }}</view>
          <view>{{ item.UserCount }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import UserCountCard from "@/pagesGames/components/gameMenu/UserCountCard.vue";
export default {
  data() {
    return {
      rankDetail: [],
    };
  },
  components: {
    UserCountCard,
  },
  mounted() {
    this._initRankDetail();
  },
  methods: {
    async _initRankDetail() {
      const data = await this.$api.user.getTop20Rank();
      this.rankDetail = data;
      console.log(rankDetailRes);
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  height: 100%;
  margin-top: 10px;
  overflow: auto;
}

.userItem {
  position: relative;
  border: 1px solid #eee;
  margin: 10px;
  padding: 5px 70px;
  padding-right: 50px;
  display: flex;
  border-radius: 10px;

  .userDetail {
    flex: 1;
    display: flex;
    justify-content: space-between;
  }
}
</style>
