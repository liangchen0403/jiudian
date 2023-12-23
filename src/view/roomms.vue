<template>
  <div class="mainpage">
    <div>
      <el-table
        height="73vh"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="roomimg"
          label="房间"
          width="200"
          style="height: 250px"
        >
          <template slot-scope="scope">
            <img
              :src="scope.row.picture1"
              alt="roomimg1"
              style="width: 150px; height: 150px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="rid" label="房间号" width="100">
        </el-table-column>
        <el-table-column prop="floor" label="楼层" width="100">
        </el-table-column>
        <el-table-column prop="type" label="房型" width="100">
        </el-table-column>
        <el-table-column prop="status" label="房间状态" width="100">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="100">
        </el-table-column>
        <el-table-column prop="time1" label="可预定起始时间," width="150">
        </el-table-column>
        <el-table-column prop="time2" label="可预定截止时间" width="150">
        </el-table-column>
        <el-table-column align="right">
          <!-- eslint-disable-next-line -->
          <template slot="header" slot-scope="scope"> 
            <div class="block">
              <el-cascader
                v-model="value"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
                @change="handleChange"
                style="width:20%;float:left;"
              ></el-cascader>
              <el-input
                placeholder="请输入起始时间"
                suffix-icon="el-icon-date"
                v-model="input1"
                style="float:left;width:150px">
              </el-input>
              <el-input
                placeholder="请输入截止时间"
                suffix-icon="el-icon-date"
                v-model="input2"
                style="float:left;width:150px">
              </el-input>
              <el-button @click="sendToBackend()">提交</el-button>
            </div>
          </template>
          <template slot-scope="scope">
            <el-button type="text" size="small"  @click="handleClick(scope)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        background
        layout="total , prev, pager, next"
        :total="this.total"
        :page-size="this.pageSize"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      total: 0,
      input1:'',
      input2:'',
      tableData: [],
      search: "",
      pageSize: 3,
      currentPage: 1,
      filteredData: [],
      value: [],
      options: [
        {
          value: "1",
          label: "一楼",
          children: [
            {
              value: "标准间",
              label: "标准间",
            },
            {
              value: "大床房",
              label: "大床房",
            },
            {
              value: "双人间",
              label: "双人间",
            },
            {
              value: "豪华间",
              label: "豪华间",
            },
          ],
        },
        {
          value: "2",
          label: "二楼",
          children: [
            {
              value: "标准间",
              label: "标准间",
            },
            {
              value: "大床房",
              label: "大床房",
            },
            {
              value: "双人间",
              label: "双人间",
            },
            {
              value: "豪华间",
              label: "豪华间",
            },
          ],
        },
        {
          value: "3",
          label: "三楼",
          children: [
            {
              value: "标准间",
              label: "标准间",
            },
            {
              value: "大床房",
              label: "大床房",
            },
            {
              value: "双人间",
              label: "双人间",
            },
            {
              value: "豪华间",
              label: "豪华间",
            },
          ],
        },
        {
          value: "4",
          label: "四楼",
          children: [
            {
              value: "标准间",
              label: "标准间",
            },
            {
              value: "大床房",
              label: "大床房",
            },
            {
              value: "双人间",
              label: "双人间",
            },
            {
              value: "豪华间",
              label: "豪华间",
            },
          ],
        },
      ],
    };
  },
  async mounted() {
  this.fetchDataFromServer(this.currentPage, this.pageSize);
},
  methods: {
    handleCurrentChange(page) {
      this.currentPage = page;
      // 调用获取数据的方法，并传递当前页码和每页数据量
      this.fetchDataFromServer(this.currentPage, this.pageSize);
    },
    sendToBackend(){
      axios.get('http://192.168.1.115:8080/client/room/page',
      {
        params:{
          time1 : this.input1,
          time2 : this.input2,
          floor: this.selectedStage, // 发送用户选择的楼层
          type : this.selectedRoomStyle,
          page : this.currentPage,
          pageSize :this.pageSize,
        },
        headers:{
          "token":localStorage.getItem('token'),
        }
      },)
      .then((response)=>{
        console.log("提交成功：",response.data);
        this.$message({
          message:"提交成功",
          type:'success',
          duration: 1000,
        });
        const newData = response.data.data.records;
        this.tableData = newData;
      })
    },
    handleClick(scope) {
      const row = scope.row; // 获取当前行的数据对象
      const roomNumber = row.rid; // 获取当前行的房间号
      this.$router.push({ name: 'RoomDetails', params:
      { 
        rid: roomNumber,
        floor:row.floor,
        type:row.type,
        picture1:row.picture1,
        picture2:row.picture2,
        picture3:row.picture3,
        price:row.price, 
        } }); // 跳转到特定动态路由，并传递房间号作为路由参数rid
    },
    // 
    handleChange(value) {
      this.selectedStage = value[0]; // 楼层
      this.selectedRoomStyle = value[1]; // 房间类型
    },
    deleteRow(index, rows) {
      rows.splice(index, 1); // 删除数据
      this.filteredData = this.tableData.slice(); // 更新 filteredData
    },
    async fetchDataFromServer(page,pageSize) {
      try {
        const tokenFromLocalStorage = localStorage.getItem('token');
        // 替换 'your_endpoint_url' 为实际的 API 终点来获取用户数据
        const response = await axios.get(`http://192.168.1.115:8080/client/room/page`, {
          headers: {
            "token": tokenFromLocalStorage // 假设你的数据中有 tokenFromLocalStorage
          },
          params:{
            page : page,
            pageSize : pageSize,
          },
        });

        // 处理响应数据
        const userData = response.data.data.records;
        const usertotal = response.data.data.total;
        this.total = usertotal;
        // 使用从服务器获取的用户数据更新你的组件数据
        this.tableData = userData;
        // this.tableData.roomimg = userData.data.picture;
        // this.tableData.rid = userData.data.rid;
        // this.tableData.floor = userData.data.floor;
        // this.tableData.status = userData.data.status;
        // this.tableData.price = userData.data.price;
        // this.tableData.time1 = userData.data.time1;
        // this.tableData.time2 = userData.data.time2;
        // 可以在获取数据后添加额外的处理或操作

        // 示例：显示成功消息
        this.$message({
          type: 'success',
          message: '数据获取成功！',
        });
      } catch (error) {
        // 处理错误
        console.error('获取数据出错：', error);

        // 示例：显示错误消息
        this.$message.error('获取数据失败，请重试。');
      }
    },
  },
};
</script>

<style>
</style>