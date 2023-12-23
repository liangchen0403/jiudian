<template>
  <div class="mainpage">
    <div>
      <el-table
        height="73vh"
        :data="tableData"
        style="width: 100%">
        <el-table-column prop="username" label="账号" width="150">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="phone" label="电话号码" width="120">
        </el-table-column>
        <el-table-column prop="email" label="电子邮箱" width="200">
        </el-table-column>
        <el-table-column prop="status" label="账号状态" width="200">
        </el-table-column>
        <el-table-column prop="balance" label="余额" width="120">
        </el-table-column>
        <el-table-column
          prop="miss"
          label="失约次数"
          width="150"
        >
        </el-table-column>
        <el-table-column align="right">
          <!-- eslint-disable-next-line -->
           <template slot="header" slot-scope="scope"> 
            <div class="block">
              <el-input
                placeholder="输入用户名"
                suffix-icon="el-icon-user
"
                v-model="input1"
                style="float:left;width:150px">
              </el-input>
              <el-input
                placeholder="输入姓名"
                suffix-icon="el-icon-user-solid"
                v-model="input2"
                style="float:left;width:150px">
              </el-input>
            <el-button @click="sendToBackend()">提交</el-button>
            </div>
            </template>
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.$index)"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="disableRow(scope.$index)"
            >
              禁用
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="ableRow(scope.$index)"
            >
              启用
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="set">
        <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                      <el-form-item
                        label="姓名"
                        :label-width="formLabelWidth"
                      >
                        <el-input
                          v-model="form.name"
                          autocomplete="off"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="密码" :label-width="formLabelWidth">
                        <el-input
                          v-model="form.password"
                          autocomplete="off"
                        ></el-input>
                      </el-form-item>
                      <el-form-item
                        label="电话"
                        :label-width="formLabelWidth"
                      >
                        <el-input
                          v-model="form.phone"
                          autocomplete="off"
                        ></el-input>
                      </el-form-item>
                      <el-form-item
                        label="邮箱"
                        :label-width="formLabelWidth"
                      >
                        <el-input
                          v-model="form.email"
                          autocomplete="off"
                        ></el-input>
                      </el-form-item>
                      <el-form-item
                        label="账号状态"
                        :label-width="formLabelWidth"
                      >
                        <el-input
                          v-model="form.statu"
                          autocomplete="off"
                        ></el-input>
                      </el-form-item>
                      <el-form-item
                        label="失约次数"
                        :label-width="formLabelWidth"
                      >
                        <el-input
                          v-model="form.miss"
                          autocomplete="off"
                        ></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false"
                        >取 消</el-button
                      >
                      <el-button type="primary" @click="handleConfirm">
                        确 定
                      </el-button>
                    </div>
                  </el-dialog>
      </div>
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
      gid:0,
      indext:0,
      dialogFormVisible: false,
      form: {
        id:0,
        name: "",
        password: "",
        phone: "",
        email: "",
        statu: 1,
        miss:0,
      },
      formLabelWidth: "120px",
      total: 0,
      input1: '',
      input2: '',
      tableData:[
        // username=userData.username,
        // name = userData.name,
        // phone = userData.phone,
        // email = userData.email,

      ],
      
      pageSize: 2,
      currentPage: 1,
      filteredData:[]
    };
  },
  async mounted() {
  this.fetchDataFromServer(this.currentPage, this.pageSize);
},
  methods: {
    handleConfirm(){
      axios.post("http://192.168.1.115:8080/admin/client/update",
      {
        id:this.gid,
        name:this.form.name,
        password:this.form.password,
        phone:this.form.phone,
        email:this.form.email,
        statu:this.form.statu,
        miss:this.form.miss
      },{
    headers: {
      "token": localStorage.getItem('token'),
    },}) .then((response) => {
          // 在这里处理成功的响应
          
          console.log("修改成功：", response.data);
          this.$message({
                message: "修改成功",
                type: "success",
                duration: 1000,
              });
              this.fetchDataFromServer();
          this.dialogFormVisible = false    
          // 这里可以添加成功后的操作，比如提示用户注册成功
        })
        .catch((error) => {
          // 在这里处理错误的响应
          console.error("修改失败：", error);
          // 这里可以添加错误处理，比如提示用户注册失败
        })},
    handleEdit(index){
      this.dialogFormVisible = true,
      this.indext=index;
      this.gid = this.tableData[index].id 
    },
    disableRow(index) {
    // 根据传入的索引更新对应行的状态为"禁用"
    this.tableData[index].status = '禁用';

    // 发送请求更新状态
    axios.post("http://192.168.1.115:8080/admin/client/update", {
      id: this.tableData[index].id,
      statu: 0,
    }, {
      headers: {
        "token": localStorage.getItem('token'),
      },
    }).then((response) => {
      console.log("修改成功：", response.data);

      // 请求成功后再次更新数据
      this.fetchDataFromServer(); // 或者根据需要传递参数
    }).catch((error) => {
      console.error("修改失败：", error);
      // 处理错误
    });
  },

  ableRow(index) {
    // 根据传入的索引更新对应行的状态为"启用"
    this.tableData[index].status = '正常';

    // 发送请求更新状态
    axios.post("http://192.168.1.115:8080/admin/client/update", {
      id: this.tableData[index].id,
      statu: 1,
    }, {
      headers: {
        "token": localStorage.getItem('token'),
      },
    }).then((response) => {
      console.log("修改成功：", response.data);

      // 请求成功后再次更新数据
      this.fetchDataFromServer(); // 或者根据需要传递参数
    }).catch((error) => {
      console.error("修改失败：", error);
      // 处理错误
    });
  },

  fetchDataFromServer(page, pageSize) {
    // ...获取数据的方法，根据需求传入 page 和 pageSize 参数
  },

    handleCurrentChange(page) {
      this.currentPage = page;
      // 调用获取数据的方法，并传递当前页码和每页数据量
      this.fetchDataFromServer(this.currentPage, this.pageSize);
    },
    sendToBackend(){
      axios.get('http://192.168.1.115:8080/admin/client/page',
      {
        params:{
          
          username: this.input1,
          name : this.input2,
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
        response.data.data.records.forEach(record => {
          if(record.status)
          {
            record.status =  '正常'
          }else{
            record.status = '禁用'
          }});
        this.tableData = newData;
      })
    }, 
    async fetchDataFromServer(page,pageSize) {
      try {
        const tokenFromLocalStorage = localStorage.getItem('token');
        // 替换 'your_endpoint_url' 为实际的 API 终点来获取用户数据
        const response = await axios.get(`http://192.168.1.115:8080/admin/client/page`, {
          headers: {
            "token": tokenFromLocalStorage // 假设你的数据中有 tokenFromLocalStorage
          },
          params:{
            page : page,
            pageSize : pageSize,
          },
        });
        response.data.data.records.forEach(record => {
          if(record.status)
          {
            record.status =  '正常'
          }else{
            record.status = '禁用'
          }
          // 输出每个元素对象的内容
        });
        // 处理响应数据
        const userData = response.data.data.records;
        console.log(response.data);
        const usertotal = response.data.data.total;
        this.total = usertotal;
        // 使用从服务器获取的用户数据更新你的组件数据
        this.tableData = userData;

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