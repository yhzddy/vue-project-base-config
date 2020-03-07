import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex) //安装

/*

state 存储数据，数据的仓库

getters获取数据并做数据计算 类似计算属性

mutations方法内可直接修改state数据源，相当于setter方法 只能处理同步函数

Aciton提交的是mutation,而不是直接变更状态
Action可以包含任何异步操作
*/


export default Vuex.Store({
    state: {//state状态管理 通过store.state.name拿到
        name: 'wang xiaoming'
    },
    getters: {//vuex的计算属性 通过 store.getters.lastName
        lastName: state => state.split(' ')[0]
    },
    mutations: {//mutations改变state的状态(store.commit('set_name','li')提交修改)
        set_name(state, val) {
            state.name = val
        }
    },
    action: { //actions提交mutations  store.dispatch('change_name')
        change_name(context) {
            return new Promise((reslove, reject) => {
                setTimeout(() => {
                    context.commit('set_name', 'li')
                    reslove(true)
                }, 1000)
            })
        },
        async get_name({commit}){
            const data = await getLastName()
            commit('set_name',data)
        }
    },
    modules: {//子模块
    }
})


/*
      this.$store.state.name
      this.$store.getters.lastName
      this.$store.commit('set_name',li)
      this.$store.dispatch('change_name')
上述在组件中调用  太过繁琐
所以vue提供了mapState,mapGetters,mapActions,mapMutations 简化步骤

在vue组件里
import { mapState } from 'vuex'

computed:{
    ...mapState({
        name: 'name', // 第一种写法 字符串
        name: (state) => state.name, // 第二种写法 函数
        map
}

methods:{
    ...mapActions({
        changName:change_name
    })
}


*/