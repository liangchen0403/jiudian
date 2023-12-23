<template>
  <div class="header">
    <div class="topline">
      <div class="logo">
        <router-link class="routerlinkstyle" to="/front/home"
          ><img src="../assets/logo.png" alt="logo" width="175px"
        /></router-link>
      </div>
      <div class="nav">
        <div class="topleft">
          <ul>
            <li>
              <router-link
                class="routerlinkstyle"
                active-class="active"
                to="/front/home"
                >首页</router-link
              >
            </li>
            <li>
              <router-link
                class="routerlinkstyle"
                active-class="active"
                to="/front/roomms"
                >房间信息</router-link
              >
            </li>
            <li>
              <router-link
                class="routerlinkstyle"
                active-class="active"
                to="/front/order"
                >我的订单</router-link
              >
            </li>
            <li>
              <router-link
                class="routerlinkstyle"
                active-class="active"
                to="/front/center"
                >个人中心</router-link
              >
            </li>
            <li>
              <router-link
                class="routerlinkstyle"
                active-class="active"
                to="/front/account"
                >我的账单</router-link
              >
            </li>
          </ul>
        </div>
        <div class="user">
          <el-avatar> user </el-avatar>
          <el-dropdown>
          <span class="el-dropdown-link">
            user<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><router-link class="exitstyle" active-class="off" to='/front/center'>个人中心</router-link></el-dropdown-item>
            <el-dropdown-item><router-link class="exitstyle" active-class="off" to='/front/order'>我的订单</router-link></el-dropdown-item>
            <el-dropdown-item><router-link class="exitstyle" active-class="off" to='/front/account'>我的账单</router-link></el-dropdown-item>
            <el-dropdown-item><router-link class="exitstyle" active-class="off" @click="clearToken" to="/">退出</router-link></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "userheader",
  methods: {
  clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    // Redirect the user to the login page or perform any other action needed after logout
    this.$router.push('/');
  }
}

};
</script>

<style lang="less" scoped>
.line {
  width: 100%;
  margin-left: 10px;
}
.active {
  color: #f2f2f2;
  background-color: rgb(112, 112, 112);
}
ul li {
  list-style: none;
  margin-bottom: 10px;
}
.topline {
  width: 1600px;
  height: 70px;
  margin: 0 auto;
  border-bottom: 1px solid #f2f2f2;
  float: left;
}
.user {
  float: left;
  margin-left: 500px;
  position: relative;
  display: block;
}
.el-avatar {
  height: 55px;
  width: 55px;
  line-height: 55px;
  margin-top: 2px;
}
.header .topline .logo {
  float: left;
  padding: 0 20px;
  margin-top: -20px;
}
.header .topline .nav {
  float: left;
}
.header .topline .nav .topleft {
  float: left;
  height: 90px;
}
.header .topline .nav .topleft li {
  height: 78px;
  line-height: 78px;
  text-align: center;
  float: left;
  padding: 0 20px;
  margin-left: 0px;
  margin-top: -24px;
  width: 100px;
  border: 1px solid #ffffff;
}
.header .topline .nav .topleft li:hover {
  color: #f2f2f2;
  background-color: rgb(112, 112, 112);
}
.routerlinkstyle {
  font-size: 18px;
  font-family: "微软雅黑";
  display: inline-block;
  height: 90px;
  position: relative;
  width: 140px;
  height: 78px;
  margin-left: -20px;
}
.el-dropdown-link{
  margin-bottom: 20px;
  margin-left: 10px;
  float: left;
  // width: 100px;
}
.el-dropdown-menu{
  width: 200px;
  height: 170px;
}
.exitstyle{
  text-decoration: none;
  color: #6e6e74;
  width: 200px;
  display: inline-block;
  margin-left: -20px;
  text-align: center;
}
.exitstyle:hover{
  color: white;
  background-color: #6e6e74;
}
</style>