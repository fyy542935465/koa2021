<template>
    <div id="about">
        <div>{{content}}</div>
        <div class="text-rt" >
            <el-button type="primary" @click="edit">去编辑</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            content:""
        }
    },
    methods: {
        edit(){
            this.$router.push('/editor?type=3')
        }
    },
}
</script>