<template>
  <div class="app-container">
    <!-- 筛选搜索 -->
    <el-card class="filter-container" shadow="never">
      <!-- 头部以及按钮 -->
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right;"
          @click="handleSearchList()"
          type="primary"
          size="small"
        >查询结果</el-button>
        <el-button
          style="float: right; margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >重置</el-button>
      </div>
      <!-- 表单内容 -->
      <div style="margin-top: 15px;">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索: ">
            <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品货号: ">
            <el-input style="width: 203px" v-model="listQuery.productSn" placeholder="商品货号"></el-input>
          </el-form-item>
          <el-form-item label="商品分类: ">
            <el-cascader 
              clearable
              v-model="selectProductCateValue"
              :options="productCateOptions"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="商品品牌: ">
            <el-select v-model="listQuery.brandId" placeholder="请选择品牌" clearable>
              <el-option
                v-for="item in brandOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上架状态: ">
            <el-select v-model="listQuery.publishStatus" placeholder="全部" clearable>
              <el-option
                v-for="item in publishStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态: ">
            <el-select v-model="listQuery.verifyStatus" placeholder="全部" clearable>
              <el-option
                v-for="item in verifyStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 数据列表 -->
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddProduct()"
        size="mini"
      >添加</el-button>
    </el-card>
    <!-- 商品表格 -->
    <div class="table-container">
      <!-- selection-change: 当选择项发生变化时会触发该事件	 -->
      <el-table
        ref="productTable"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic" height="80">
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
            <p>品牌: {{ scope.row.brandName }}</p>
          </template>
        </el-table-column>
        <el-table-column label="价格/货号" width="120" align="center">
          <template slot-scope="scope">
            <p>价格: ¥{{ scope.row.price }}</p>
            <p>货号: {{ scope.row.productSn }}</p>
          </template>
        </el-table-column>
        <el-table-column label="标签" width="140" align="center">
          <template slot-scope="scope">
            <p>上架:
              <el-switch
                @change="handlePublishStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.publishStatus"
              ></el-switch>
            </p>
            <p>新品:
              <el-switch
                @change="handleNewStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.newStatus"
              ></el-switch>
            </p>
            <p>推荐:
              <el-switch
                @change="handleRecommendStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.recommandStatus"
              ></el-switch>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.sort }}
          </template>
        </el-table-column>
        <el-table-column label="SKU库存" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="handleShowSkuEditDialog(scope.$index, scope.row)" circle></el-button>
          </template>
        </el-table-column>
        <el-table-column label="销量" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.sale }}
          </template>
        </el-table-column>
        <el-table-column label="审核状态" width="100" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.verifyStatus | verifyStatusFilter }}</p>
            <p>
              <el-button
                type="text"
              >审核详情</el-button>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p>
              <el-button size="mini">查看</el-button>
              <el-button size="mini" @click="$router.push({ path: '/pms/updateProduct', query: { id: row.id } })">编辑</el-button>
            </p>
            <p>
              <el-button size="mini">日志</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 批量删除 -->
    <div class="batch-operate-container">
      <el-select size="small" v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        style="margin-left: 20px;"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small"
      >确定</el-button>
    </div>
    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5, 10, 15]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 库存编辑弹框 -->
    <el-dialog
      title="编辑货品信息"
      :visible.sync="editSkuInfo.dialogVisible"
      width="40%"
    >
      <span>商品货号: </span>
      <span>{{ editSkuInfo.productSn }}</span>
      <el-input 
        placeholder="按sku编号搜索"
        v-model="editSkuInfo.keyword"
        size="small"
        style="width: 50%; margin-left: 20px;"
      >
        <el-button slot="append" icon="el-icon-search" @click="handleSearchEditSku"></el-button>
      </el-input>
      <!-- 库存表格 -->
      <el-table
        style="width: 100%; margin-top: 20px"
        :data="editSkuInfo.stockList"
        border
      >
        <el-table-column label="SKU编号" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.skuCode"></el-input>
          </template>
        </el-table-column>
        <el-table-column v-for="(item, index) in editSkuInfo.productAttr" :key="index" :label="item.name" align="center">
          <template slot-scope="scope">
            {{ getProductSkuSp(scope.row, index) }}
          </template>
        </el-table-column>
        <el-table-column label="销量价格" width="80" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="商品库存" width="80" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stock"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="库存预警值" width="100" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.lowStock"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSkuInfo.dialogVisible = false">取消</el-button>
        <el-button @click="handleEditSkuConfirm" type="primary">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  updateDeleteStatus,
  updateNewStatus,
  updateRecommendStatus,
  updatePublishStatus
} from "@/api/product";
import {
  fetchList as fetchSkuStockList,
  update as updateSkuStockList
} from "@/api/skuStock";
import { fetchList as fetchProductAttrList } from "@/api/productAttr";
import { fetchList as fetchBrandList } from "@/api/brand";
import { fetchListWithChildren } from "@/api/productCate";

export default {
  name: "product",
  data() {
    return {
      listQuery: {  // 表单
        keyword: "", // 商品名称
        productSn: "", // 商品货号
        brandId: "", // 商品品牌
        publishStatus: "", // 上架状态
        verifyStatus: "",  // 审核状态
        pageNum: 1, // 起始条数
        pageSize: 5, // 页总数
        productCategoryId: null, // 货品分类
      },
      selectProductCateValue: [], // 商品分类
      productCateOptions: [], // 商品分类选项
      brandOptions: [], // 商品品牌选项
      publishStatusOptions: [  // 上架状态选项
        { value: 1, label: '上架' },
        { value: 0, label: '下架' },
      ],
      verifyStatusOptions: [    // 审核状态选项
        { value: 1, label: '审核通过' },
        { value: 0, label: '未通过' },
      ],
      list: [], // 商品表格数据
      listLoading: true, // 加载
      total: 0, // 总条数
      operateType: null, // 批量操作
      operates: [ // 批量操作选项
        { label: '商品上架', value: 'publishOn' },
        { label: '商品下架', value: 'publishOff' },
        { label: '设为推荐', value: 'recommendOn' },
        { label: '取消推荐', value: 'recommendOff' },
        { label: '设为新品', value: 'newOn' },
        { label: '取消新品', value: 'newOff' },
        { label: '转移到分类', value: 'transferCategory' },
        { label: '移入回收站', value: 'recycle' },
      ], 
      multipleSelection: [], // 选中表格数据
      editSkuInfo: { // 库存弹框数据
        dialogVisible: false, // 控制显示
        productSn: '', // 商品货号
        keyword: null, // 搜索关键字
        stockList: [], // 库存表格数据
        productAttr: [], // 库存其他数据
        productId: '', // 商品ID
      }
    };
  },
  watch: {
    selectProductCateValue(value) {
      if (value !== null && value.length === 2) {
        this.listQuery.productCategoryId = value[1];
      } else {
        this.listQuery.productCategoryId = null;
      }
    }
  },
  filters: {
    verifyStatusFilter(value) {
      if (value === 1) {
        return '审核通过';
      } else {
        return '未审核';
      }
    }
  },
  methods: {
    /**
     * 搜索
     */
    handleSearchList() {
      // 此时筛选数据已经变化了的, 直接再次请求即可
      // 还是要对数据变化有着深刻的理解
      this.listQuery.pageNum = 1;
      this.getList();
    },
    /**
     * 重置
     */
    handleResetSearch() {
      // 数据重置
      this.selectProductCateValue = [];
      this.listQuery = {
        keyword: "", // 商品名称
        productSn: "", // 商品货号
        brandId: "", // 商品品牌
        publishStatus: "", // 上架状态
        verifyStatus: "",  // 审核状态
        pageNum: 1, // 起始条数
        pageSize: 5, // 页总数
        productCategoryId: null, // 货品分类
      }
      this.getList();
    },
    /**
     * 获取商品分类选项
     */
    getProductCateList() {
      fetchListWithChildren().then(response => {
        let list = response.data;
        this.productCateOptions = [];
        for(let item of list) {
          let children = [];
          if (item.children !== null && item.children.length > 0) {
            for(let items of item.children) {
              children.push({ label: items.name, value: items.id });
            }
          }
          this.productCateOptions.push({ label: item.name, value: item.id, children: children });
        }
      })
    },
    /**
     * 获取商品品牌选项
     */
    getBrandList() {
      fetchBrandList({ pageNum: 1, pageSize: 100 }).then(response => {
        this.brandOptions = [];
        let brandList = response.data.list;
        for(let item of brandList) {
          this.brandOptions.push({ label: item.name, value: item.id })
        }
      })
    },
    /**
     * 跳转至添加商品页面
     */
    handleAddProduct() {
      this.$router.push({ path: '/pms/addProduct' })
    },
    /**
     * 表格选项发生变化
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 获取表格数据
     */
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      })
    },
    /**
     * 商品上架切换
     */
    handlePublishStatusChange(idnex, row) {
      let ids = [];
      ids.push(row.id);
      // 这个是兼容批量操作的
      this.updatePublishStatus(row.publishStatus, ids);
    },
    /**
     * 处理商品上架
     */
    updatePublishStatus(publishStatus, ids) {
      // 这个是用来处理连接查询字符串的
      let params = new URLSearchParams();
      params.append('ids', ids);
      params.append('publishStatus', publishStatus);
      updatePublishStatus(params).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        })
      })
    },
    /**
     * 新品切换
     */
    handleNewStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      // 这个是兼容批量操作的
      this.updateNewStatus(row.newStatus, ids);
    },
    /**
     * 处理商品新品
     */
    updateNewStatus(newStatus, ids) {
      let params = new URLSearchParams();
      params.append('ids', ids);
      params.append('newStatus', newStatus);
      updatePublishStatus(params).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        })
      })
    },
    /**
     * 推荐切换
     */
    handleRecommendStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      // 这个是兼容批量操作的
      this.updateRecommendStatus(row.recommandStatus, ids);
    },
    /**
     * 处理商品推荐
     */
    updateRecommendStatus(recommandStatus, ids) {
      let params = new URLSearchParams();
      params.append('ids', ids);
      params.append('recommandStatus', recommandStatus);
      updatePublishStatus(params).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        })
      })
    },
    /**
     * 编辑库存
     */
    handleShowSkuEditDialog(index, row) {
      this.editSkuInfo.dialogVisible = true;
      this.editSkuInfo.productSn = row.productSn;
      this.editSkuInfo.keyword = null;
      this.editSkuInfo.stockList = [];
      this.editSkuInfo.productAttr = [];
      this.editSkuInfo.productId = row.id;
      // 获取表格数据
      fetchSkuStockList(row.id, { keyword: this.editSkuInfo.keyword }).then(response => {
        this.editSkuInfo.stockList = response.data;
      })
      // 获取表格列显示数据
      fetchProductAttrList(row.productAttributeCategoryId, { type: 0 }).then(response => {
        this.editSkuInfo.productAttr = response.data.list;
      })
    },
    /**
     * 删除
     */
    handleDelete(index, row) {
      this.$confirm('是否要进行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids =[];
        ids.push(row.id);
        this.updateDeleteStatus(1, ids);
      })
    },
    /**
     * 处理删除
     */
    updateDeleteStatus(deleteStatus, ids) {
      let params = new URLSearchParams();
      params.append('ids', ids);
      params.append('deleteStatus', deleteStatus);
      updateDeleteStatus(params).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        })
      })
      this.getList();
    },
    /**
     * 批量处理按钮
     */
    handleBatchOperate() {
      if (this.operateType === null) {
        this.$message({
          message: '请选择操作类型',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      if (!this.multipleSelection.length) {
         this.$message({
          message: '请选择要操作的商品',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      this.$confirm('是否要进行该批量操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waraning'
      }).then(() => {
        let ids = [];
        for (let item of this.multipleSelection) {
          ids.push(item.id);
        }
        switch (this.operateType) {
          case this.operates[0].value:
            this.updatePublishStatus(1, ids);
            break;
          case this.operates[1].value:
            this.updatePublishStatus(0, ids);
            break;
          case this.operates[2].value:
            this.updateRecommendStatus(1, ids);
            break;
          case this.operates[3].value:
            this.updateRecommendStatus(0, ids);
            break;
          case this.operates[4].value:
            this.updateNewStatus(1, ids);
            break;
          case this.operates[5].value:
            this.updateNewStatus(0, ids);
            break;
          case this.operates[6].value:
            // 转移到分类未做
            break;
          case this.operates[7].value:
            this.updateDeleteStatus(1, ids);
            break;
        }
        this.getList();
      })
    },
    /**
     * 页数目
     */
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    /**
     * 页码
     */
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    /**
     * 搜索sku库存
     */
    handleSearchEditSku() {
      fetchSkuStockList(this.editSkuInfo.productId, { keyword: this.editSkuInfo.keyword }).then(response => {
        this.editSkuInfo.stockList = response.data;
      })
    },
    /**
     * 处理库存表格列数据
     */
    getProductSkuSp(row, index) {
      if (index === 0) {
        return row.sp1;
      } else if (index === 1) {
        return row.sp2;
      } else {
        return row.sp3;
      }
    },
    /**
     * 确定修改库存
     */
    handleEditSkuConfirm() {
      if (!this.editSkuInfo.stockList.length) {
        this.$message({
          message: '暂无sku信息',
          type: 'warning',
          duration: 1000
        })
        return
      }
      this.$confirm('是否要进行修改', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateSkuStockList(this.editSkuInfo.productId, this.editSkuInfo.stockList).then(response => {
          this.$message({
            message: '修改成功',
            type:　'success',
            duration: 1000
          });
          this.editSkuInfo.dialogVisible = false;
        })
      })
    }
  },
  created() {
    this.getList();
    this.getProductCateList();
    this.getBrandList();
  }
};
</script>

<style>

</style>
