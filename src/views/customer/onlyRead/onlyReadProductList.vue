<template>
  <div class="header-container">
    <div class="module-title">
      <h1>货品清单</h1>
    </div>

     <el-row class="content-container">
        <el-col :span="9">
          <el-form
            :model="formData"
            ref="formData"
            label-width="100px"
            label-position="left"
          >
            <el-form-item label="客户信息:"    prop="customer_info">
              <el-autocomplete
                style="width:100%"
                v-model="formData.customer_info"
                :fetch-suggestions="querySearch"
                clearable
                id="formSearch"
                placeholder="请输入客户编号或公司名称，为空时查询所有"
              ></el-autocomplete>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col style="margin-left:10px;" :span="2">
          <el-button type="primary" @click="formSearch">查询</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="info" @click="resetForm('formData')">重置</el-button>
        </el-col>
        <el-col :span="2">
          <xlsxbutton :dataSource="queryResData" sheetName="月度清单"
            >导出Excel</xlsxbutton
          >
        </el-col>
      </el-row>
    <div >
      <el-row>
        <el-col class="customer-table" :span="24">
          <el-table
            :height="tableHeight"
            v-loading="loading"
            element-loading-text="加载中..."
            element-loading-custom-class="loading_color"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.5)"
            @selection-change="handleSelectionChange"
            :row-style="showRow"
            border
            stripe
            :data="computedQueryResData"
            ref="multipleTable"
          >
            <el-table-column
              align="center"
              label="公司名称"
              prop="company_name"
            ></el-table-column>
            <el-table-column
              align="center"
              label="货品名称"
              prop="product_name"
            ></el-table-column>
            <el-table-column
              align="center"
              label="货品SKU"
              prop="product_sku"
            ></el-table-column>
            <el-table-column
              align="center"
              label="入仓数量"
              prop="storage_count"
            ></el-table-column>
            <el-table-column
              align="center"
              label="剩余数量"
              prop="leave_count"
            ></el-table-column>
            <el-table-column
              align="center"
              label="仓储天数"
              prop="save_days"
            ></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row type="flex" class="padding_tb">
        <el-col :span="24">
          <el-pagination
            class="page-pagination"
            :background="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryPage.currentPage"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="queryPage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryResData.length"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { utcToCst } from "@/utils/utcToCst";
import { getNowFormatDate } from "@/utils/getCurrentTime";
export default {
  data() {
    return {
      customer_id:"",
      tableHeight: window.innerHeight * 0.65,
      times: 0, // 监听计数
      timer: null,
      loading: false, // 加载标识，默认为false,当调用接口时赋值为true
      today_date: "", // 今天的日期
      pickerOption: {
        disabledDate: (time) => {
          return time.getTime() > Date.now(); /*今天及之前，注意数字不一样*/
        },
      },
      isDel: true, // 删除禁用
      productReqUrl: "", // 货品信息请求地址
      productReqData: {}, // 货品信息提交数据
      locateReqUrl: "/api/query/getLocateCustomerId", // 模糊查询地址
      locateReqData: {}, // 模糊查询客户信息
      nameTipsArray: [], // 提醒下拉框
      formData: {
        // 查询列表
        customer_info: "", // 客户信息,
      },
      queryResData: [], // 查询结果列表
      customer_info_list: [], // 模糊查询列表
      louqueForm: {
        customer_id: "客户编号",
        come_time: "入库时间",
        product_name: "货品名称",
        product_sku: "货品SKU",
        storage_count: "初始数量",
        save_days: "仓储天数",
        out_count: "出库数量",
        status: "状态",
      },
      rules: {
        customer_info: [
          {
            message: "请输入客户信息",
            required: true,
            trigger: ["blur", "change"],
          },
        ],
      },
      queryPage: {
        // 分页器
        pageSize: 10,
        currentPage: 1,
      },
      multipleSelection: [], // 勾选列表
      solidSelection: [], // 防渲染后勾选消失的列表
    };
  },
  methods: {
    handleSizeChange(val) {
      this.queryPage.pageSize = val;
    },
    handleCurrentChange(val) {
      this.queryPage.currentPage = val;
    },
    // 设置表格行样式
    showRow({ row, rowIndwx }) {
      let styleJson = {
        "background-color": "#E4F9E5",
        "font-weight": "400",
        "font-size": "15px",
        color: "#000000",
      };

      return styleJson; // 返回对象
    },
    // 监听勾选
    handleSelectionChange(val) {
      if (val.length == 0) {
        this.isDel = true;
      } else {
        this.isDel = false;
      }
      this.multipleSelection = val;
    },
    // 重置
    resetForm(formName) {
      let form = this.$refs[formName];
      form.resetFields();
    },
   // 查询
    formSearch() {
      this.loading = true;
      this.$http({
        method: "post",
        url: "/api/query/getSingleProductLocateByName",
        data: {
          customer_info: this.formData.customer_info,
          customer_id:this.customer_id,
        },
      })
        .then((res) => {
          this.loading = false;
          this.queryResData = [];
          if (res.data.length != 0) {
            this.queryResData = [];
            for (let item of res.data) {
              let come = Date.parse(new Date(item.come_time));
              let today = Date.parse(new Date(this.today_date));
              var day = parseInt((today - come) / (1000 * 60 * 60 * 24)); //核心：时间戳相减，然后除以天数
              item.save_days = (isNaN(day)||day<0 )? 0 :day;
              item.come_time = utcToCst(item.come_time)
                .slice(0, 10)
                .replace(/上|下|中|午|晚|早|凌|晨/g, "");

              item.leave_count =
                Number(item.storage_count) - Number(item.out_count);
              item.count = "";
              this.queryResData.push(item);
            }
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },

    // 查询
    refreshFormSearch() {
      this.loading = true;
      this.$http({
        method: "post",
        url: "api/query/getProductLocateByName",
        data: {
          customer_info: sessionStorage.getItem("userName"),
        },
      })
        .then((res) => {
          this.loading = false;
          this.queryResData = [];
          if (res.data.length != 0) {
            for (let item of res.data) {
              let come = Date.parse(new Date(item.come_time));
              let today = Date.parse(new Date(this.today_date));
              var day = parseInt((today - come) / (1000 * 60 * 60 * 24)); //核心：时间戳相减，然后除以天数
              item.save_days = (isNaN(day)||day<0 )? 0 :day;
              item.come_time = utcToCst(item.come_time)
                .slice(0, 10)
                .replace(/上|下|中|午|晚|早|凌|晨/g, "");

              item.leave_count =
                Number(item.storage_count) - Number(item.out_count);
            }
            this.queryResData = res.data;
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    // 搜索框模糊查询
    querySearch(queruString, cb) {
      if (this.formData.customer_info != "") {
        var nameTipsArray = this.nameTipsArray;
        cb(nameTipsArray);
      } else {
        cb([
          {
            value: "",
          },
        ]);
      }
    },
    // 监听输入框，有变动就触发防抖函数
    getData() {
      this.$http({
        method: "post",
        url: "api/query/getSingleProductLocate",
        data: {
          customer_info: this.formData.customer_info,
          customer_id: this.customer_id,
        },
      })
        .then((res) => {
          this.customer_info_list = res.data;
          if (this.formData.customer_info != "") {
            this.nameTipsArray = [];
            let avoidSameArr = [];
            // 遍历模糊查询返回的列表,获取包含输入框关键字的字段,添加到历史列表中
            // 并且,当历史列表已存在相同字段,则跳过此遍历阶段
            for (let item of this.customer_info_list) {
              let flag = 0; // 用于标记是否需要跳过


              // 遍历每个item对象
              for (let prop in item) {
                if (
                  String(item[prop]).indexOf(this.formData.customer_info) != -1
                ) {
                  // 对防重数组遍历,若存在与历史列表对象中完全匹配的属性,则跳过此遍历
                  for (let val of avoidSameArr) {
                    
                    if (val == item[prop]) {
                      flag = 1;
                      break;
                    }
                  }
                  if (flag == 0) {
                    this.nameTipsArray.push({
                      value: String(item[prop]),
                    });
                    avoidSameArr.push(String(item[prop]));
                  } else {
                    continue;
                  }
                }
              }
            }
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
    // 防抖函数
    debounce(fn, wait) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        fn();
      }, wait);
    },
    // 删除提交
    deleteSubmit() {
      this.$confirm("确定删除客户信息?")
        .then(() => {
          this.solidSelection = this.multipleSelection;
          while (this.solidSelection.length != 0) {
            this.deleteProduct();
            this.solidSelection.shift();
          }
          this.$message.success("删除客户信息成功!");
        })
        .catch((err) => {
          this.$message.warning("取消删除");
        });
    },
    // 删除货物信息
    deleteProduct() {
      this.$http({
        method: "post",
        url: "api/delete/deleteProduct",
        data: {
          customer_id: this.solidSelection[0].customer_id,
          product_code: this.solidSelection[0].product_code,
        },
      })
        .then((res) => {
          this.refreshFormSearch();
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
  },
  watch: {
    formData: {
      handler: function(nV, oV) {
        // 对输入框的值做判断，为数字则请求id，为汉字则请求公司名称
        if (/[0-9a-z]/i.test(this.formData.customer_info)) {
          this.locateReqUrl = "/api/query/getLocateCustomerId";
          this.locateReqData = {
            customer_id: nV.customer_info,
          };
        } else {
          this.locateReqUrl = "api/query/getLocateCompanyName";
          this.locateReqData = {
            company_name: nV.customer_info,
          };
        }
        this.debounce(this.getData, 1000);
      },
      deep: true,
    },
  },
  computed: {
    computedQueryResData() {
      let size = this.queryPage.pageSize;
      let current = this.queryPage.currentPage;
      return this.queryResData.slice(size * (current - 1), size * current);
    },
    totalLeaveCount() {
      let sum = 0;
      for (let item of this.queryResData) {
        sum += item.leave_count;
      }
      return sum;
    },
  },
  mounted() {
    var today = new Date();
    today.setTime(today.getTime());
    var today_date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    this.today_date = today_date;

    this.refreshFormSearch();
  },
     created() {
    this.customer_id = sessionStorage.getItem("userName");
    this.level = sessionStorage.getItem("userLevel");
  },
};
</script>

<style lang="less" scoped></style>
