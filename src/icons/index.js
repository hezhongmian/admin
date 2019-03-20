import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg组件

// 全局注册组件
Vue.component('svg-icon', SvgIcon)

// 搞不懂这些步骤有什么用? 有了这些svg图片才有效

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
