<template>
    <div class="hello">
      <!-- <div class="header">
      <span>返回</span>
      <span>{{title}}</span>
      
      </div> -->
    <information></information>
    <history></history>
    <opinion></opinion> 
   
    
  </div>
</template>

<script>
import information from '@/components/information'
import history from '@/components/history'
import opinion from '@/components/opinion'
export default {
  name: "Approval",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      title: "",
      blockList:[
        {
          'title':'',
          'columnList':[{
            'title':'',
            'text':'',
            'fileList':''
          }]
        }
      ],
      columnList:[]
    };
  },
  components:{
    information,
    history,
    opinion,
    
  }
 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
.header {
  height: 44.3px;
  text-align: center;
  line-height: 44.3px;
  color: white;
  width: 100%;
  background: linear-gradient(to bottom, #2c2c30 100%, #0f1012 100%);
} */
.hello {
  border:1px solid #E5E5E5;
  font-family: PingFangSC-Regular;
}
</style>
