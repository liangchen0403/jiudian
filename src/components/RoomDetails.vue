<template>
  <div class="roomd">
    <h2 class="header">房间详情</h2>
    <hr />
    <div v-if="roomData">
      <div class="showpict">
        <el-carousel :interval="4000" type="card" height="350px">
          <el-carousel-item v-for="item in roomData.picture" :key="item">
            <img
              :src="item"
              alt="Room Image"
              style="width: 100%; height: 350px"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="showdeta">
        <el-row :gutter="20">
          <el-col :span="4"
            ><div class="grid-content bg-purple">
              <h3>基本信息</h3>
              <p>房间号: {{ roomData.rid }}</p>
              <p>房间类型：{{ roomData.roomstyle }}</p>
              <p>楼层: {{ roomData.stage }}</p>
            </div></el-col
          >
          <el-col :span="5"
            ><div class="grid-content bg-purple">
              <h3>洗浴用品</h3>
              <div style="margin-left: -10px">
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >牙刷</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >沐浴露</i
                >
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >牙膏</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >洗发水</i
                >
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >香皂</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >护发素</i
                >
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >梳子</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >剃须刀</i
                >
              </div>
            </div></el-col
          >
          <el-col :span="5"
            ><div class="grid-content bg-purple">
              <h3>卫浴设施</h3>
              <div style="margin-left: -10px">
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >浴室</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >卫生间</i
                >
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >拖鞋</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >吹风机</i
                >
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >毛巾</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >24H热水</i
                >
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >浴巾</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >淋浴</i
                >
              </div>
            </div></el-col
          >
          <el-col :span="4"
            ><div class="grid-content bg-purple">
              <h3>客房设施</h3>
              <div style="margin-left: -10px">
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >空调</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >电动窗帘</i
                >
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >鸭绒被</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >毛毯</i
                >
              </div>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <h3>媒体科技</h3>
              <div style="margin-left: -10px">
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >电视机</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >智能门锁</i
                >
                <i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >电影服务</i
                ><i
                  class="el-icon-circle-check"
                  style="margin-left: 10px; margin-bottom: 16px"
                  >智能客控</i
                >
              </div>
            </div></el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4"
            ><div class="grid-content bg-purple">
              <div class="pri">价格：{{ this.roomData.price }}/晚</div>
            </div></el-col
          >
          <el-col :span="2"
            ><div class="grid-content bg-purple">
              <div style="margin-top: 35px">
                <el-button type="success" @click="ordersuccess()"
                  >立即预定</el-button
                >
              </div>
            </div></el-col
          >
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              <div style="margin-top: 35px;">
                <el-button type="warning" @click="openPaymentDialog"
                  >立即支付</el-button
                >
              </div>
            </div></el-col
          >
        </el-row>
        <div class="pay">
          <el-dialog title="支付" :visible.sync="paymentDialogVisible">
  <!-- 这里放置支付对话框的内容 -->
  <!-- 例如：一张图片和确认、取消按钮 -->
  <div style="font-size:20px">1.扫码支付</div>
  <img src="https://th.bing.com/th/id/R.7bd291405e0dc08ee541224b4d0f855c?rik=wN%2fRUCKfFHYDDg&riu=http%3a%2f%2fwww.xuanlixgt.com%2fuploads%2fallimg%2f2017%2f1-1G23015310W55.jpg&ehk=Ir%2b3H%2fwc04vMGrzRJXrMVGITng%2fyU1WCrwTjWiJHsFk%3d&risl=&pid=ImgRaw&r=0" alt="支付图片" style="width: 200px; height: auto;" />
  <div style="font-size:20px">2.余额支付</div>
  <el-button type="primary">余额支付</el-button>
  <div slot="footer" class="dialog-footer">
    <el-button @click="paymentDialogVisible = false">取消</el-button>
    <el-button type="primary" @click="payForIt">确认支付</el-button>
  </div>
</el-dialog>
       <!--  </div>
          <div class="order1">
          <el-dialog title="请选择时间" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="入住时间" :label-width="formLabelWidth">
                <div class="block">
                  <span class="demonstration"></span>
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="离开时间" :label-width="formLabelWidth">
                <div class="block">
                  <span class="demonstration"></span>
                  <el-date-picker
                    v-model="value2"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="ordersuccess">确 定</el-button>
            </div>
          </el-dialog> -->
        </div>
      </div>

      <!-- 其他房间信息 -->
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["rid"], // 从路由参数接收房间ID
  mounted() {
    const {rid,floor,type,time1,time2,picture1,picture2,picture3,price} = this.$route.params;
      // 更新组件数据
      this.roomData.rid = rid;
      this.roomData.floor = floor;
      this.roomData.type = type;
      this.roomData.time1 = time1;
      this.roomData.time2 = time2;
      this.roomData.price = price;
      this.roomData.picture = [
        picture1,
        picture2,
        picture3,
      ]
    // 根据 this.roomId 去获取对应房间的详细信息
    
    // 这里可以使用 this.$route.params.roomId 获取路由参数
    
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      value1: "",
      value2: "",
      dialogFormVisible: false,
      paymentDialogVisible: false,
      roomData: {
        rid:'',
        floor:'',
        type:'',
        time1:'',
        time2:'',
        type:'',
        picture:[
          "https://th.bing.com/th/id/R.7bd291405e0dc08ee541224b4d0f855c?rik=wN%2fRUCKfFHYDDg&riu=http%3a%2f%2fwww.xuanlixgt.com%2fuploads%2fallimg%2f2017%2f1-1G23015310W55.jpg&ehk=Ir%2b3H%2fwc04vMGrzRJXrMVGITng%2fyU1WCrwTjWiJHsFk%3d&risl=&pid=ImgRaw&r=0",
          "https://th.bing.com/th/id/R.7bd291405e0dc08ee541224b4d0f855c?rik=wN%2fRUCKfFHYDDg&riu=http%3a%2f%2fwww.xuanlixgt.com%2fuploads%2fallimg%2f2017%2f1-1G23015310W55.jpg&ehk=Ir%2b3H%2fwc04vMGrzRJXrMVGITng%2fyU1WCrwTjWiJHsFk%3d&risl=&pid=ImgRaw&r=0",
          "https://th.bing.com/th/id/R.7bd291405e0dc08ee541224b4d0f855c?rik=wN%2fRUCKfFHYDDg&riu=http%3a%2f%2fwww.xuanlixgt.com%2fuploads%2fallimg%2f2017%2f1-1G23015310W55.jpg&ehk=Ir%2b3H%2fwc04vMGrzRJXrMVGITng%2fyU1WCrwTjWiJHsFk%3d&risl=&pid=ImgRaw&r=0",
        ],
        price:'999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999$'
      },
    };
  },
  methods: {
    async fetchDataFromServer(){
      axios.post(
  "http://192.168.1.115:8080/client/room/book",
  {
    cid: localStorage.getItem('id'),
    rid: this.rid,
    type: this.roomData.roomstyle,
  },
  {
    headers: {
      "token": localStorage.getItem('token'),
    },}
        )
        .then((response) => {
          // 在这里处理成功的响应
          console.log("预定成功：", response.data);
          // 这里可以添加成功后的操作，比如提示用户注册成功
        })
        .catch((error) => {
          // 在这里处理错误的响应
          console.error("预定失败：", error);
          // 这里可以添加错误处理，比如提示用户注册失败
        });
    },
    ordersuccess() {
      this.fetchDataFromServer(),
      this.$message({
        message: "预定成功，请返回上一页页面进行支付",
        type: "success",
        duration: 1000,
      });
    },
     openPaymentDialog() {
    this.paymentDialogVisible = true;
  },
  payForIt() {
    // 处理支付逻辑
    // 可以在这里添加支付成功的提示
    this.$message({
      message: "支付成功",
      type: "success",
      duration: 1000,
    });
    // 关闭支付对话框
    this.paymentDialogVisible = false;
  },
  },
  created() {
    // 在这里可以根据路由参数 roomNumber 发送请求获取对应的房间信息
    // 省略请求过程，假设数据直接赋值给 roomData
    this.roomData = {
      rid: this.rid,
      stage: 1,
      roomstyle: "大床房",
      price: "200￥",
      roomimg: [
        "https://th.bing.com/th/id/R.7bd291405e0dc08ee541224b4d0f855c?rik=wN%2fRUCKfFHYDDg&riu=http%3a%2f%2fwww.xuanlixgt.com%2fuploads%2fallimg%2f2017%2f1-1G23015310W55.jpg&ehk=Ir%2b3H%2fwc04vMGrzRJXrMVGITng%2fyU1WCrwTjWiJHsFk%3d&risl=&pid=ImgRaw&r=0",
        "https://th.bing.com/th/id/R.7bd291405e0dc08ee541224b4d0f855c?rik=wN%2fRUCKfFHYDDg&riu=http%3a%2f%2fwww.xuanlixgt.com%2fuploads%2fallimg%2f2017%2f1-1G23015310W55.jpg&ehk=Ir%2b3H%2fwc04vMGrzRJXrMVGITng%2fyU1WCrwTjWiJHsFk%3d&risl=&pid=ImgRaw&r=0",
        "https://th.bing.com/th/id/R.7bd291405e0dc08ee541224b4d0f855c?rik=wN%2fRUCKfFHYDDg&riu=http%3a%2f%2fwww.xuanlixgt.com%2fuploads%2fallimg%2f2017%2f1-1G23015310W55.jpg&ehk=Ir%2b3H%2fwc04vMGrzRJXrMVGITng%2fyU1WCrwTjWiJHsFk%3d&risl=&pid=ImgRaw&r=0",
      ],
      // 其他静态信息
    };
  },
};
</script>
<style>
.roomd {
  width: 80%;
  margin: auto;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.pri {
  margin-top: 40px;
  color: red;
  font-size: 20px;
}
</style>