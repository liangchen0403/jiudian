<template>
  <div id="background">
    <div class="login">
      <h1 class="welcome">WELCOME TO HOTEL</h1>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="account" name="username">
          <el-input
            type="account"
            v-model="ruleForm.account"
            placeholder="请输入账号"
            autocomplete="new-password"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            placeholder="请输入密码"
            autocomplete="new-password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <span id="changeregister"
        >还没有账号？
        <router-link class="routerlinkstyle" to="/user_register"> 注册</router-link>
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from '@/router';
export default {
  data() {
    var validateaccount = (_rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (_rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        account: "",
        pass: "",
      },
      rules: {
        account: [{ validator: validateaccount, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    login() {
      axios
        .post("http://192.168.1.115:8080/user/login", {
          username: this.ruleForm.account,
          password: this.ruleForm.pass,
        })
        .then((response) => {
          // 在这里处理成功的响应
          console.log("登录成功：", response.data);
          localStorage.setItem('token',response.data.data.token);
          localStorage.setItem('id',response.data.data.id);
          if (response.data.msg ==='客户账号登录成功') {
              this.$message({
                message: "登录成功",
                type: "success",
                duration: 1000,
              });
            router.push({path:'/front/home'})
          } else if(response.data.msg==='管理员账号登录成功')
          {this.$message({
                message: "登录成功",
                type: "success",
                duration: 1000,
              }); 
            router.push({path:'/admin'})}
          else{
            this.$message({
              message: "登录失败，用户名或密码错误",
              type: "error",
              duration: 1000,
            });
          }
          // 这里可以添加成功后的操作，比如提示用户注册成功
        })
        .catch((error) => {
          // 在这里处理错误的响应
          console.error("登录失败：", error);
          // 这里可以添加错误处理，比如提示用户注册失败
        });
    },
  //   async login() {
  //       try {
  //     //   const response = await axios.post('http://127.0.0.1:4523/m1/3770509-0-default/login', {
  //     //       username: this.ruleForm.account,
  //     //       password: this.ruleForm.pass
  //     //   });
  //       //处理登录成功的逻辑
  //       // console.log('登录成功', response.data);
  //       // if(this.ruleForm.user===''||this.ruleForm.pass==='')
  //       // {
  //         router.push({path:'/front/home'})
  //       // }
  //       //this.pushhead();
  //       // 显示成功提示
  //       this.$message({
  //         message: "登录成功",
  //         type: "success",
  //         duration: 1000,
  //       });

  //     } catch (error) {
  //       // // 处理登录失败的逻辑
  //       // console.error('登录失败', error);
  //       // // 显示错误提示
  //       this.$message({
  //         message: "登录失败，用户名或密码错误",
  //         type: "error",
  //         duration: 1000,
  //       });
  //     }
  //   },
  },
};
</script>

<style lang="less" scoped>
#background {
  height: 100%;
  width: 100%;
  margin-top: -8px;
  margin-left: -8px;
  padding: 0;
  background: url("../assets/R-C.jpg");
  position: absolute;
}
.welcome {
  text-align: center;
}
.login {
  position: relative;
  margin-top: 250px;
  background-color: white;
  border: 1px solid;
  border-radius: 20px;
  box-shadow: 0, 0, 1, blue;
  height: 320px;
  width: 40%;
  margin-left: 31.5%;
}
:deep(.el-input) {
  .el-input__inner {
    width: 100%;
    border: 1px solid rgb(175, 175, 175);
  }
}
.el-input{
  width: 80%;
}
.el-button--primary {
  width: 39%;
}
.el-button {
  width: 39%;
}
#changeregister {
  margin-left: 40%;
  font-size: 14px;
}
</style>