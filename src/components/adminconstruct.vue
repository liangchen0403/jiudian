<template>
  <div>
    <el-container style="height: 900px; border: 1px solid #eee">
      <el-aside width="180px" style="background-color: rgb(238, 241, 246)">
        <div class="logo">
          <img src="../assets/adminlogo.png" alt="adminlogo" width="180px" />
        </div>
        <el-menu 
        router>
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>通知</template
            >
            <el-menu-item-group>
              <el-menu-item index="/admin/adminknow">管理员须知</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-s-finance"></i>酒店业务管理</template
            >
            <el-menu-item-group>
              <el-menu-item index="/admin/adminorder">订单管理</el-menu-item>
              <el-menu-item index="/admin/adminaccount">公司账单</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-s-home"></i>客房管理</template>
            <el-menu-item-group>
              <el-menu-item index="/admin/adminroom">客房信息管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-s-custom"></i>用户管理</template>
            <el-menu-item-group>
              <el-menu-item index="/admin/adminuser">客户信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 20px; height: 115.2px">
          <div style="float:left;font-size:60px;color:#2C83E1;"> 酒 店 管 理 系 统</div>
          <div class="shownow" style="float:left;">
            
          </div>
          <el-avatar style="width: 80px; height: 80px; margin-top: 15px">
            <img src="../assets/1.jpg" alt="" />
          </el-avatar>
          <el-dropdown>
  <i class="el-icon-setting" style="margin-right: 10px"></i>
  <el-dropdown-menu slot="dropdown" style="width: 150px">
    <router-link to="/admin/admincenter" class="adminlinkstyle">
      <el-dropdown-item>个人中心</el-dropdown-item>
    </router-link>
    <router-link to="/admin/adminregist" class="adminlinkstyle">
      <el-dropdown-item>新增管理员</el-dropdown-item>
    </router-link>
    <router-link to="/" class="adminlinkstyle">
      <el-dropdown-item>退出登录</el-dropdown-item>
    </router-link>
  </el-dropdown-menu>
</el-dropdown>
          <span></span>
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.el-aside {
  color: #333;
  .el-menu-item {
    min-width: 180px;
  }
}
.el-header {
  display: inline-block;
  border-bottom: 4.2px solid #eef1f6;
}
.adminlinkstyle{
    text-decoration: none;
    color: inherit;
    display: inline-block;
    width: 100%;
}
</style>