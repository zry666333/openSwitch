<template>
    <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  .el-form-item {
    margin-bottom:0px !important;
     .el-form-item__label {
      padding: 0 0 0px !important;
      font-size: 14px !important;
      color: #42E3E1;
    }
     .el-input{
      margin-left:0px !important;
      .el-input__inner {
        padding:0 6px;
        background: rgba(66,227,225,0.10) !important;
        border: 1px solid #42E3E1;
        border-radius: 4px !important;
        font-size: 14px !important;
        color: #93D4D5 !important;
      }
    }
  }
  .el-table {
    background-color:transparent !important;
    border:none !important;
    &::before {
      height:0px!important;
    }
     .el-table__header-wrapper {
      .has-gutter {
        font-size: 14px;
        color: #42E3E1;
      }
      border-top:1px solid #42E3E1;
      border-bottom:1px solid #42E3E1;
      tr {
        background-color:transparent;
        th {
          background-color:transparent;
          border-bottom:none;
        }
      }
    }
     .el-table__body-wrapper {
      span {
        font-size: 14px;
        color: #93D4D5;
      }
       .el-button span{
           font-size: 16px;
           color: #292E30;
       }
    }
  }
  .el-button {
    background-image: linear-gradient(90deg, #42E3E1 0%, #33D0E5 100%) !important;
    border-radius: 3px;
    width: 96px;
    height: 35px;
    padding: 0 !important;
     span {
      font-size: 16px;
      color: #292E30;
    }
  }
  input:-webkit-autofill , textarea:-webkit-autofill, select:-webkit-autofill {
    -webkit-text-fill-color: #ededed !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;
    background-color:transparent;
    background-image: none;
    transition: background-color 50000s ease-in-out 0s;
  }

  //滚动条的宽度
  ::-webkit-scrollbar {
    width: 12px;
    opacity: 0.23;
    background: rgba(169,219,219,0.57);
    border-radius: 6px;
  }
  //滚动条的滑块
  ::-webkit-scrollbar-thumb {
    background: rgba(66,227,225,0.27);
    border-radius: 6px;
  }

</style>
