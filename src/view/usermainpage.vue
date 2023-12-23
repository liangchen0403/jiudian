<template>
    <div>
        <el-container>
            <el-header><userheader/></el-header>
            <el-main><router-view></router-view></el-main>
        </el-container>
    </div>
</template>

<script>
import userheader from '../components/userheader.vue'
export default {
    name:"usermainpage",
    components: { userheader },
}
</script>

<style>

</style>