<template>
  <div class="login-page">
    <div class="login-container">
      <div class="left-part"></div>
      <div class="right-part login-form login-form_opcity">
        <div class="login-form_box">
          <div class="login-welcome_string">欢迎登录</div>
          <div class="login-welcome_underline"></div>
          <el-form :model="loginForm" :ref="loginForm" :rules="rules">
            <el-row class="loginForm-input">
              <el-col :span="24" :offset="0">
                <el-form-item prop="user">
                  <el-input
                    prefix-icon="el-icon-user"
                    class="login-input_user"
                    v-model="loginForm.user"
                    placeholder="请输入用户名"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" :offset="0">
                <el-form-item prop="password">
                  <el-input
                    type="password"
                    prefix-icon="el-icon-lock"
                    @keyup.enter.native="login"
                    class="login-input_pwd"
                    v-model="loginForm.password"
                    placeholder="请输入密码"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row class="transform-row" style="text-align: right">
            <el-col class="check-label">
              <el-radio v-model="checkFlag" label="管理员">管理员</el-radio>
              <el-radio v-model="checkFlag" label="客户">客户</el-radio>
            </el-col>
          </el-row>
          <el-button class="login-button" @click="login">登录</el-button>
        </div>
      </div>
    </div>

    <a class="beian" href="https://beian.miit.gov.cn" target="_blank" >闽ICP备2021010384号-1</a>
  </div>
</template>

<script >
import { encryptPwd, decryptPwd } from "@/utils/operatePwd.js";

export default {
  data() {
    return {
      checkFlag: "管理员", // 登录时检测的标识，根据标识切换 检测账号是否存在 的接口-----manager/cutomer
      url: "", // 监听url，根据身份而变化接口
      loginForm: {
        user: "",
        password: "",
      },
      rules: {
        user: [{ required: true, message: "请输入姓名！", trigger: "change" }],
        password: [
          { required: true, message: "请输入密码！", trigger: "change" },
        ],
      },
    };
  },

  methods: {
    showTip() {
      var str = "查看详情";
      return str;
    },
    login() {
      if (this.loginForm.user == "" && this.loginForm.password == "") {
        this.$message.warning("请输入账户以及密码!");
        return;
      }
      if (this.loginForm.user == "") {
        this.$message.warning("请输入账户!");
        return;
      }
      if (this.loginForm.password == "") {
        this.$message.warning("请输入密码!");
        return;
      }

      if (this.checkFlag == "管理员") {
        this.url = "/api/query/loginInUser";
      } else {
        this.url = "/api/query/loginInCustomer";
      }

      this.$http({
        method: "post",
        url: this.url,
        data: {
          username: this.loginForm.user,
        },
      })
        .then((res) => {
          /**
           * 对返回来的数据做校验,如果是管理员就解密
           * 如果是客户就直接校验
           */
          const returnData = res.data[0];
          // returnData.pw
          if (this.checkFlag == "管理员") {
            let localPwd = this.loginForm.password;
            let noLockPwd = decryptPwd(returnData.password);
           
            if (localPwd != noLockPwd) {
              this.$message.error("用户名或密码有误，请重新输入！");
              return;
            }
          }

          if (this.checkFlag == "客户") {
            let localPwd = this.loginForm.password;
            let serverPwd = returnData.auto_pwd;
            if (localPwd != serverPwd) {
              this.$message.error("用户名或密码有误，请重新输入！");
              return;
            }
          }

          if (res.data.length == 0) {
            this.$message.error("用户名或密码有误，请重新输入！");
            return;
          }
          this.$message.success("登录成功!");
          setTimeout(() => {
            /**
             * 在会话存储里，存储用户名和
             *
             */
            if (this.checkFlag == "管理员") {
              sessionStorage.setItem("userName", res.data[0].username);
              sessionStorage.setItem("userId", res.data[0].id);
              sessionStorage.setItem("userLevel", res.data[0].level);
            } else {
              sessionStorage.setItem("userName", res.data[0].customer_id);
              sessionStorage.setItem("userId", "-");
              sessionStorage.setItem("userLevel", "客户");
            }

            // this.$store.dispatch("setUser", [res.data[0].username, res.data[0].id, res.data[0].level]);
            this.$router.push("/home");
          }, 200);
        })
        .catch((err) => {
          this.$message.error("用户名不存在或密码有误，请重新输入！");
        });
    },
  },
  mounted() {},
  created() {
    sessionStorage.clear();
  },
};
</script>

<style lang="less" scoped>
.login-page {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url("../assets/erp_background_blur.png") no-repeat;
  background-size: cover;

  .login-container {
    z-index: 999;
    margin: auto;
    transform: translateY(5vh);
    display: flex;
    width: 85vw;
    height: 90vh;
   
    .left-part {
      z-index: 1;
      width: 55vw;
      background: url("../assets/erp_background.png") no-repeat;
      background-position: center;
      background-size: 100%;
    }
    .right-part {
      z-index: 999;
      width: 30vw;
    }
    .login-form {
      border-radius: 1%;
      background: linear-gradient(
        to bottom right,
        rgba(240, 242, 250, 0.88) 40%,
        #6f92c8 70%
      );
      padding: 0 40px 0;
      float: right;
      .login-form_box {
        position: relative;
        top: 55%;
        left: 0;
        right: 0;
        bottom: 0;
        transform: translateY(-80%);
        .login-welcome_string {
          font-size: 40px;
          font-weight: 400;
          color: #143475;
          line-height: 37px;
          letter-spacing: 2px;
          text-align: center;
        }
        .login-welcome_underline {
          margin: 14px auto auto;
          display: block;
          width: 160px;
          height: 3px;
          background: #0b59a9;
        }
        /deep/ .loginForm-input {
          margin-top: 57px;
          height: 50px;
          border-radius: 5%;
        }
        /deep/ .el-input__inner {
          height: 50px;
          font-size: 20px !important;
          border-radius: 1%;
          border: 0;

          padding-bottom: 5px;
          padding-left: 3.875rem !important;

          box-shadow: 0px 2px 0px 0px #dfe3eb !important;
        }

        /deep/ .el-input {
          width: 330px;
          font-size: 1.5rem !important;
        }

        .login-input_pwd {
          margin-top: 42px;
        }
        .login-button {
          transform: translateY(104px);

          font-size: 22px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 30px;

          width: 330px;
          height: 58px;
          background-color:#162651;

          &:hover{
             background-color:#2e4a99;
          }
        }
      }
      /deep/ .el-form-item__error {
        font-size: 20px;
      }
      .register-link {
        color: rgb(240, 53, 20);
        font-weight: normal;
        font-size: 15px;
        transform: translate(0px, 8px);
      }
      .register-link:hover {
        color: rgb(253, 205, 205);
      }
    }
  }
  .check-label {
    /deep/ .el-radio__input.is-checked + .el-radio__label {
      color: rgb(12, 59, 52);
      font-weight: bold;
    }
  }
  .transform-row {
    transform: translateY(30px);
  }
  /deep/ .el-form-item__label {
    font-size: 23px !important;
  }
  .beian {
    position: fixed;
    color: rgb(17, 16, 16);
    font-size: 14px;
    bottom: 2%;
    left: 1%;
  }
}
</style>
