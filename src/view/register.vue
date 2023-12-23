<template>
  <div id="background">
    <div class="register">
      <h1 class="welcome">欢迎注册</h1>
      <!-- 调用element-UI表单组件，创建注册界面 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input
            type="account"
            v-model="ruleForm.account"
            placeholder="请输入账号"
            autocomplete="off"
            :onkeypress="validateAccount"
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
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            placeholder="请再次输入密码"
            autocomplete="new-password"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            type="name"
            v-model="ruleForm.name"
            placeholder="请输入姓名"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input
            type="gender"
            v-model="ruleForm.gender"
            placeholder="请输入性别"
            autocomplete="off"
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
        <el-form-item>
          <el-button type="primary" @click="submitForm()">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <span id="changelogin"
        >已有账号？
        <router-link class="routerlinkstyle" to="/"> 登录</router-link>
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from '@/router';
export default {
  data() {
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
    var validateaccount = (_rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else if (!regex.test(value)) {
        callback(new Error("账号必须是8位数以上,且只能包含字母、数字和'.'"));
      } else {
        callback();
      }
    };
    var validatePass = (_rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!regex.test(value)) {
        callback(new Error("密码必须是8位数以上,且只能包含字母、数字和'.'"));
      } else {
        callback();
      }
    };
    var validatePass2 = (_rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        account: "",
        pass: "",
        checkPass: "",
        name: "",
        phonenum: "",
        email: "",
        gender: "",
      },
      rules: {
        account: [{ validator: validateaccount, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ validator: validatename, trigger: "blur" }],
        phonenum: [{ validator: validatephonenum, trigger: "blur" }],
        email: [{ validator: validateemail, trigger: "blur" }],
        gender: [{ validator: validategender, trigger: "blur" }],
      },
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm() {
        if(this.ruleForm.account.slice(0,1) !== "C"){
         this.$message({
                message: "账户名称不合法,账号请以C开头",
                type: "error",
                duration: 1000,
              });
              return;
        }
      axios
        .post("http://192.168.1.115:8080/client/register", {
          username: this.ruleForm.account,
          password: this.ruleForm.pass,
          name: this.ruleForm.name,
          phone: this.ruleForm.phonenum,
          email: this.ruleForm.email,
          gender: this.ruleForm.gender,
        })
        .then((response) => {
          // 在这里处理成功的响应
          if(response.data.msg === "客户注册成功")
          {
            console.log("注册成功：", response.data);
            this.$message({
                message: "注册成功",
                type: "success",
                duration: 1000,
              });
            router.push('/');
          }else{
            this.$message({
                message: "该账号已存在",
                type: "success",
                duration: 1000,
              });
          }
          
        })
        .catch((error) => {
          // 在这里处理错误的响应
          console.error("注册失败：", error);
          this.$message({
                message: "注册失败，请检查网络连接",
                type: "success",
                duration: 1000,
              });
          // 这里可以添加错误处理，比如提示用户注册失败
        });
    },
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
.register {
  position: relative;
  margin-top: 150px;
  background-color: white;
  border: 1px solid;
  border-radius: 20px;
  box-shadow: 0, 0, 1, blue;
  height: 640px;
  width: 38%;
  margin-left: 31.5%;
}
:deep(.el-input) {
  .el-input__inner {
    width: 100%;
    border: 1px solid rgb(175, 175, 175);
  }
}
.el-input {
  width: 80%;
}
.el-button--primary {
  width: 39%;
}
.el-button {
  width: 39%;
}
#changelogin {
  margin-left: 40%;
  font-size: 14px;
}
</style>