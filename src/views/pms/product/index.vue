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
            <el-select v-model="listQuery.branId" placeholder="请选择品牌" clearable>
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
      listQuery: {
        // 表单
        keyword: "", // 商品名称
        productSn: "", // 商品货号
        branId: "", // 商品品牌
        publishStatus: "", // 上架状态
        verifyStatus: "",  // 审核状态
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
      ]
    };
  },
  methods: {
    /**
     * 搜索
     */
    handleSearchList() {},
    /**
     * 重置
     */
    handleResetSearch() {},
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
    }
  },
  created() {
    this.getProductCateList();
    this.getBrandList();
  }
};
</script>

<style>

</style>
