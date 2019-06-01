<template>
<div class="page__bd">
        <div class="weui-form-preview " v-for="arrItem in resARR">
            <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">{{arrItem.title}}</label>
                    <em class="weui-form-preview__value">&nbsp;</em>
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item" v-for="itemList in arrItem.columnList">
                    <label class="weui-form-preview__label">{{itemList.title}}</label>
                    <span class="weui-form-preview__value">{{itemList.text}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "information",
  data() {
    return {
      title: "",
      resARR: []
    };
  },
  mounted() {
    //GET
    this.$ajax({
      method: "get",
      url: "../static/json/getInfo.json" //<---本地地址
    })
      .then(response => {
        let _data = response.data;
        if (response.data !== undefined) {
          this.resARR = _data.blockList;
         console.log(this.resARR )
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>
<style scoped>
</style>