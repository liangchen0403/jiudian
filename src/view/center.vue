<template>
  <div class="backcenter">
    <div class="blocks">
      <h2 class="mytext">我 的 信 息</h2>
      <div class="formsum">
        <div class="fistform">
          <div class="fform">
            <!-- 头像更新 -->
            <div class="myavatar" @click="triggerFileInput">
              <el-avatar
                :size="150"
                :src="ruleForm.avatarUrl"
              >
                <img
                  src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                />
              </el-avatar>
              <input
                ref="fileInput"
                type="file"
                class="el-upload"
                @change="handleFileChange"
              />
            </div>
            <!-- 表单1 -->
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="姓名" prop="name" class="name">
                <el-input
                  type="name"
                  v-model="ruleForm.name"
                  placeholder="请输入姓名"
                  autocomplete="off"
                  style="max-width: 350px"
                ></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="gender" class="gender">
                <el-input
                  type="gender"
                  v-model="ruleForm.gender"
                  placeholder="请输入性别"
                  autocomplete="off"
                  style="max-width: 350px"
                ></el-input>
              </el-form-item>
              <el-form-item label="账号" prop="account" class="account">
                <el-input
                  type="account"
                  v-model="ruleForm.account"
                  placeholder="请输入账号"
                  autocomplete="off"
                  style="max-width: 350px"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <!-- 表单2 -->
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="密码" prop="password" class="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              placeholder="请输入密码"
              autocomplete="off"
              style="max-width: 350px"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phonenum">
            <el-input
              type="phonenum"
              v-model="ruleForm.phonenum"
              placeholder="请输入电话号码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input
              type="email"
              v-model="ruleForm.email"
              placeholder="请输入电子邮箱"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="账户余额">
            <el-input
              v-model="ruleForm.accountmoney"
              autocomplete="off"
              size="small"
              :disabled="true"
              style="max-width: 150px; height: 40px"
            ></el-input>
            <el-button type="success" @click="dialogFormVisible = true" size="small" style="width:10%;margin-left:10px;">充值</el-button>

            <el-dialog title="充值" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="充值金额" :label-width="formLabelWidth">
                  <el-input v-model="form.money" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="扫码充值" :label-width="formLabelWidth">
                  <img src="https://th.bing.com/th/id/R.7bd291405e0dc08ee541224b4d0f855c?rik=wN%2fRUCKfFHYDDg&riu=http%3a%2f%2fwww.xuanlixgt.com%2fuploads%2fallimg%2f2017%2f1-1G23015310W55.jpg&ehk=Ir%2b3H%2fwc04vMGrzRJXrMVGITng%2fyU1WCrwTjWiJHsFk%3d&risl=&pid=ImgRaw&r=0" alt="支付图片" style="width:40%; height: auto;margin-top:20px" />
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendmoney()">确 定</el-button>
              </div>
            </el-dialog>

          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sendmydata()" class="savemas"
              >保存</el-button
            >
            <el-button @click="resetForm('ruleForm')" class="reseta"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    //初始化正则，判断输入
    const regex = /^[a-zA-Z0-9.]{8,}$/;
    const genderRegex = /^(男|女)$/;
    const numberRegex = /^\d{11}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var validatename = (_rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入姓名"));
      } else {
        callback();
      }
    };
    var validatephonenum = (_rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入电话号码"));
      } else if (!numberRegex.test(value)) {
        callback(new Error("输入号码格式错误"));
      } else {
        callback();
      }
    };
    var validateemail = (_rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入电子邮箱"));
      } else if (!emailRegex.test(value)) {
        callback(new Error("输入邮箱格式错误"));
      } else {
        callback();
      }
    };
    var validategender = (_rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入性别"));
      } else if (!genderRegex.test(value)) {
        callback(new Error("输入性别有误"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
        form: {
          
          money:'',
        },
        formLabelWidth: '120px',
      ruleForm: {
        account: "",
        name: "",
        phonenum: "",
        email: "",
        gender: "",
        accountmoney: '',
        password: "",
        avatarUrl: "", // 头像URL
      },
      rules: {
        name: [{ validator: validatename, trigger: "blur" }],
        phonenum: [{ validator: validatephonenum, trigger: "blur" }],
        email: [{ validator: validateemail, trigger: "blur" }],
        gender: [{ validator: validategender, trigger: "blur" }],
      },
    };
  },
  methods: {
    sendmoney() {
      axios.post(
   `http://192.168.1.115:8080/client/recharge/${Number(localStorage.getItem('id'))}/${Number(this.form.money)}`,
  {
    id: Number(localStorage.getItem('id')),
    money: Number(this.form.money),
  },
  {
    headers: {
      "token": localStorage.getItem('token'),
    },}
        )
        .then((response) => {
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
    //头像更新函数
    triggerFileInput() {
      // 触发文件选择操作
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      // 监听文件选择事件，处理选择的文件
      const file = event.target.files[0];
      if (file) {
        this.readFile(file);
        const formData = new FormData();
        formData.append('file', file);
        axios.post(
          `http://192.168.1.115:8080/client/common/upload/id=${Number(localStorage.getItem('id'))}`,
             {
          formData,
        },
        {
    headers: {
      "token": localStorage.getItem('token'),
    },}
          
        ).then((response)=>{
          console.log('文件上传成功:',response.data);
        }).catch((error)=>{
          console.error('文件上传失败',error);
        })
      }
    },
    readFile(file) {
      // 使用FileReader读取文件并显示在<el-avatar>中
      const reader = new FileReader();
      reader.onload = (event) => {
        this.ruleForm.avatarUrl = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    open({ showCloseBtn = false } = {}) {
      const imagePath = require("../assets/3.webp");
      // 使用 this.$alert 显示图片的自定义 HTML 模板
      this.$alert(`<div>充值金额：<input></div><img src="${imagePath}" style="max-width: 100%;">`, {
        dangerouslyUseHTMLString: true,
        showClose: showCloseBtn, // 是否显示右上角关闭按钮
        onClose: async () => {
          // 用户关闭弹窗时发送GET请求获取账户余额
          try {
            const response = await this.$axios.get(
              "https://your-api-endpoint.com/getAccountBalance"
            );
            // 更新accountmoney的值
            if (this.accountmoney !== response.data.balance) {
              this.accountmoney = response.data.balance;
              this.$message({
                message: "充值成功",
                type: "success",
                duration: 1000,
              });
            } else {
              this.$message({
                message: "充值失败",
                type: "error",
                duration: 1000,
              });
            }
          } catch (error) {
            console.error("获取账户余额失败", error);
          }
        },
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //调用axios向服务器传递数据
    sendmydata() {
      axios.post(
  "http://192.168.1.115:8080/client/update",
  {
    id: localStorage.getItem('id'),
    username: this.ruleForm.username,
    name: this.ruleForm.name,
    phone: this.ruleForm.phonenum,
    password : this.ruleForm.password,
    email: this.ruleForm.email,
    gender: this.ruleForm.gender,
    avatar: this.ruleForm.avatarUrl,
  },
  {
    headers: {
      "token": localStorage.getItem('token'),
    },}
        )
        .then((response) => {
          // 在这里处理成功的响应
          console.log("修改成功：", response.data);
          this.$message({
                message: "修改成功",
                type: "success",
                duration: 1000,
              });
          // 这里可以添加成功后的操作，比如提示用户注册成功
        })
        .catch((error) => {
          // 在这里处理错误的响应
          console.error("修改失败：", error);
          // 这里可以添加错误处理，比如提示用户注册失败
        });
    },
     async fetchDataFromServer() {
      try {
        const idFromLocalStorage = localStorage.getItem('id'); // 假设你将用户 ID 存储在 localStorage 中
        const tokenFromLocalStorage = localStorage.getItem('token');
        // 替换 'your_endpoint_url' 为实际的 API 终点来获取用户数据
        const response = await axios.get(`http://192.168.1.115:8080/client/information`, {
          headers: {
            "token": tokenFromLocalStorage // 假设你的数据中有 tokenFromLocalStorage
          },
          params:{
            "id" : idFromLocalStorage,
          },
        });

        // 处理响应数据
        const userData = response.data;

        // 使用从服务器获取的用户数据更新你的组件数据
        this.ruleForm.name = userData.data.name;
        this.ruleForm.phonenum = userData.data.phone;
        this.ruleForm.account = userData.data.username;
        this.ruleForm.password = userData.data.password;
        this.ruleForm.email = userData.data.email;
        this.ruleForm.gender = userData.data.gender;
        this.ruleForm.accountmoney = userData.data.balance;
        // this.ruleForm.avatarUrl = userData.data.avatar;

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
  mounted() {
    // 在组件挂载或需要时调用获取数据的函数
    this.fetchDataFromServer();
  },
};
</script>

<style lang="less" scoped>
:deep(.el-input) {
  .el-input__inner {
    width: 100%;
    border: 1px solid rgb(175, 175, 175);
    text-align: center;
    margin-top: 10px;
  }
}
:deep(.el-form-item) {
  .el-form-item__label {
    font-size: 20px;
    margin-top: 10px;
    color: #6e6e74;
  }
}
.el-button--primary {
  width: 30%;
}
.el-button {
  width: 45%;
  margin-top: 10px;
}
.blocks {
  position: relative;
  margin: -10px auto;
  border: 1px solid;
  border-radius: 20px;
  box-shadow: 0, 0, 1, #6e6e74;
  height: 100%;
  width: 95vw;
  .formsum {
    margin: 0 auto;
    width: 50%;
  }
}
.mytext {
  margin-top: 40px;
  text-align: center;
  margin-bottom: 40px;
  font-size: 35px;
  color: #6e6e74;
}
.savemas {
  background-color: rgb(175, 175, 175);
}
.reseta:hover {
  background-color: rgb(175, 175, 175);
  color: white;
}
.myavatar {
  width: 150px;
  height: 150px;
  display: inline-block;
  position: absolute;
  left: 35vw;
  top: 0px;
}
.el-upload {
  display: none;
  width: 150px;
  height: 150px;
}
.fform {
  position: relative;
  .el-form-item {
    width: 60%;
  }
}
</style>
