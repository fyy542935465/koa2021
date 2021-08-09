<template>
    <div id="about">
        <div>{{detail.title || ''}}</div>
        <div>{{detail.content || ''}}</div>
        <div class="text-rt" >
            <el-button type="primary" @click="edit">去编辑</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            detail:{}
        }
    },
    mounted() {
        this.get()
    },
    methods: {
        get(){
            this.$http.get(this.api.findAbout,{},res => {
                this.detail = res.data || {}
                console.log(res.data)
            })
        },
        edit(){
            this.$router.push('/editor?type=3')
        }
    },
}
</script>