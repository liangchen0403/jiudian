<template>
  <div class="backcolor">
    <div class="pict">
      <img src="../assets/4.jpg" alt="" class="homepict" />
    </div>
    <div class="introduce">
      <div
        class="perno"
        style="font-size: 30px; padding-top: 10px; padding-bottom: 20px"
      >
        平 台 使 用 人 数
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="6">
            <div>
              <el-statistic
                group-separator=","
                :precision="2"
                :value="value2"
                :title="title"
              ></el-statistic>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-statistic title="今日使用人数">
                <template slot="formatter"> 456 </template>
              </el-statistic>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-statistic
                group-separator=","
                :precision="2"
                decimal-separator="."
                :value="value1"
                :title="title1"
              >
                <template slot="prefix">
                  <i class="el-icon-s-flag" style="color: red"></i>
                </template>
                <template slot="suffix">
                  <i class="el-icon-s-flag" style="color: blue"></i>
                </template>
              </el-statistic>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-statistic :value="like ? 521 : 520" title="日收藏数">
                <template slot="suffix">
                  <span @click="like = !like" class="like">
                    <i
                      class="el-icon-star-on"
                      style="color: red"
                      v-show="!!like"
                    ></i>
                    <i class="el-icon-star-off" v-show="!like"></i>
                  </span>
                </template>
              </el-statistic>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="roomshow">
      <h2 class="roomtitle">平 台 优 质 房 间</h2>
      <div class="roompict">
        <div class="rooms-grid">
          <!-- 房间 1 -->
          <div class="room-item">
            <img src="../assets/home2.jpg" alt="豪华间" class="room-image" />
            <span class="room-description"> 豪 华 间 </span>
            <div>
              <el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                style="height: 30px"
                score-template="{value}"
              >
              </el-rate>
            </div>
          </div>

          <!-- 房间 2 -->
          <div class="room-item">
            <img src="../assets/home1.jpg" alt="标准间" class="room-image" />
            <span class="room-description"> 标 准 间 </span>
            <div>
              <el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                style="height: 30px"
                score-template="{value}"
              >
              </el-rate>
            </div>
          </div>

          <!-- 房间 3 -->
          <div class="room-item">
            <img src="../assets/home3.jpg" alt="双人间" class="room-image" />
            <span class="room-description"> 双 人 间 </span>
            <div>
              <el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                style="height: 30px"
                score-template="{value}"
              >
              </el-rate>
            </div>
          </div>

          <!-- 房间 4 -->
          <div class="room-item">
            <img src="../assets/home4.jpg" alt="大床房" class="room-image" />
            <span class="room-description"> 大 床 房 </span>
            <div>
              <el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                style="height: 30px"
                score-template="{value}"
              >
              </el-rate>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="line">更 多 优 质 房 型 欢 迎 您 的 入 住</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      like: true,
      value1: 4154,
      value2: 1314,
      title: "增长人数",
      title1: "年均在线人数",
      value: 4.5,
    };
  },
};
</script>

<style lang="less" scoped>
.backcolor {
  background-color: rgb(198, 198, 198);
  width: 100%;
  height: 100%;
  margin-top: -10px;
}
.homepict {
  width: 100%;
}
.roomtitle {
  font-size: 40px;
  color: rgb(69, 69, 69);
  text-align: center;
}
.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}
.introduce {
  background-color: rgb(255, 249, 224);
  width: 100%;
  height: 150px;
  text-align: center;
}
.room-item {
  text-align: center;
  width: 100%;
}

.room-image {
  width: 100%; /* 图片宽度占满列宽 */
  height: auto; /* 让高度自适应 */
}

.room-description {
  display: block;
  font-size: 30px;
  margin-top: 5px;
  margin-bottom: 5px;
  color: rgb(51, 162, 222);
}
.bottom{
  height: 200px;
  background-color: rgb(82, 82, 82);
  font-size: 40px;
  color: white;
  .line{
    padding-top: 70px;
    padding-left: 30%;
  }
}
</style>