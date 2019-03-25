<template>
  <div class="app-container">
    <!-- 数据列表 -->
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px;"></i>
      <span style="margin-top: 5px;">数据列表</span>
      <el-button
        class="btn-add"
        @click="$router.push('/pms/addProductCate')"
        size="mini"
      >
        添加
      </el-button>
    </el-card>
    <!-- 表格数据 -->
    <div class="table-container">
      <el-table
        ref="productCateTable"
        style="width: 100%"
        :data="list"
        v-loading="listLoading"
        border
      >
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="分类名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="级别" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.level | levelFilter }}
          </template>
        </el-table-column>
        <el-table-column label="商品数量" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.productCount }}
          </template>
        </el-table-column>
        <el-table-column label="数量单位" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.productUnit }}
          </template>
        </el-table-column>
        <el-table-column label="导航栏" width="100" align="center">
          <template slot-scope="scope">
            <el-switch 
              @change="handleNavStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.navStatus"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" width="100" align="center">
          <template slot-scope="scope">
            <el-switch 
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.showStatus"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.sort }}
          </template>
        </el-table-column>
        <el-table-column label="设置" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="scope.row.level | disableNextLevel"
              @click="$router.push({ path: '/pms/productCate', query: { parentId: scope.row.id } })"
            >查看下级</el-button>
            <el-button
              size="mini"
              :disabled="scope.row.level | disableNextLevel"
            >转移商品</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {fetchList,deleteProductCate,updateShowStatus,updateNavStatus} from '@/api/productCate'

export default {
  data() {
    return {
      list: [], // 表格数据
      listLoading: true, // 加载框
      total: 0, // 总条数
      parentId: null, // 级别ID
      listQuery: { // 分页数据
        pageNum: 1, // 页码
        pageSize: 5 // 页容量
      }
    }
  },
  name: 'productCate',
  methods: {
    /**
     * 获取表格数据
     */
    getList() {
      this.listLoading = true;
      fetchList(this.parentId, this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      })
    },
    /**
     * 获取级别ID
     */
    resetParentId() {
      if (this.$route.query.parentId) {
        this.parentId = this.$route.query.parentId;
      } else {
        this.parentId = 0;
      }
    },
    /**
     * 切换导航栏
     */
    handleNavStatusChange(index, row) {
      let date = new URLSearchParams();
      let ids = [];
      ids.push(row.id);
      date.append('ids', ids);
      date.append('navStatus', row.navStatus);
      updateNavStatus(date).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功',
          duration: 1000
        })
      })
    },
    /**
     * 切换是否显示
     */
    handleShowStatusChange(index, row) {
      let date = new URLSearchParams();
      let ids = [];
      ids.push(row.id);
      date.append('ids', ids);
      date.append('showStatus', row.showStatus);
      updateShowStatus(date).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功',
          duration: 1000
        })
      })
    }
  },
  created() {
    this.resetParentId();
    this.getList();

  },
  filters: {
    levelFilter(value) {
      if (value === 0) {
        return '一级'
      } else if (value === 1) {
        return '二级';
      }
    },
    disableNextLevel(value) {
      if (value === 0) {
        return false;
      } else {
        return true;
      }
    }
  }
}
</script>

<style>

</style>
