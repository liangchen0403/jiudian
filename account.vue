<template>
  <div>
    <div class="tabel">
        <div class="llog">
            <div>账户余额：{{this.balance}} ￥</div>
            <el-table
                :data="tableData"
                style="width: 100%"
                v-loading="loadingData">
                <el-table-column
                    prop="log"
                    label="个人资金流水"
                    width="1000">
                </el-table-column>
            </el-table>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default { 
    data() {
            return {
                tableData: [],
                loadingData: false,
                balance:0
            }
        },
   methods: {
        //实现查询
         async fetchData() {
            // 发送带有 token 的请求
            const response = await axios.get(`http://117.50.163.249:3456/client/account/${Number(localStorage.getItem('id'))}`, {
                params: {
                    id:localStorage.getItem('id'),
                },
                headers: {
                    'token': localStorage.getItem('token'),
                },
            });
            this.tableData = response.data.data.log.split("?").map(item =>({log:item}));
            this.balance = response.data.data.balance;
        },
   },
    mounted: async function() {
        // 组件挂载时发送请求获取初始数据
        await this.fetchData();
    },
       
}
</script>

<style lang="less" scoped>


.tabel{
    margin-top: 5px;
    padding: 15px 10px;
    background-color: #fff;
    .cell{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-break: break-all;
        line-height: 23px;
        padding-left: 10px;
        padding-right: 10px;
    }
    
}
.block{
    margin-top: 5px;
    margin-left: 30%;
    padding-top: 15px;
    background-color: #fff;
}
</style>