<template>
  <div class="history">
    <p>审批历史</p>
    <table  border="0" cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th>节点名称</th>
                <th>结果</th>
                <th>意见</th>
            </tr>
        </thead>
        <tbody v-for="arrItem in opinionList">
            <tr>
                <td>
                    <div>{{arrItem.taskName}}</div>
                    <div>{{arrItem.completeDeptCname}}</div>
                </td>
                <td>
                    <div>{{arrItem.approvalResult}}</div>
                    <div>{{arrItem.completerFullname}}</div>
                </td>
                <td>
                    <div>{{arrItem.opinion}}</div>
                    <div>{{arrItem.endTime}}</div>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'history',
  data () {
    return {
      opinionList:[]
    }
  },
   mounted() {
    //GET
    this.$ajax({
      method: "get",
      url: "../static/json/opinion.json" //<---本地地址
    })
      .then(response => {
        let _data = response.data;
        if (response.data !== undefined) {
          this.opinionList = _data.opinionList;
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}
</script>
<style scoped>
.history{
   width: 100%;
    margin: 0 auto;
    background-color: white;
    font-family: PingFangSC-Regular;
}
p{
    text-align: left;
    margin-left: 22px;
    height: 35px;
    line-height: 48px;
    font-size: 15px;
    color: #4A4A4A;
}

table {
    width: 100%;
    font-size: 14px;
}
table thead tr {
    line-height: 40px;
}
thead tr th{
    border-top: 0.5px solid #E5E5E5;
    border-bottom: 0.5px solid #E5E5E5;
    padding-left: 8px;
}
thead tr th:nth-child(1){
    /* width: 60%; */
    text-align: left;
    padding-left: 17px;
}

tbody tr{
height: 48px;
}
tbody tr td {
     padding-left: 15px;
      border-bottom: 0.5px solid#E5E5E5;
       padding-top: 10px;
    padding-bottom: 10px;
}
tbody tr td div:nth-child(1){
    font-size: 16px;
    color: #000000;
}
tbody tr td div:nth-child(2){
    font-size: 14px;
    color: #888888;
}
tbody tr td:nth-child(1){
    text-align: left;
}

</style>