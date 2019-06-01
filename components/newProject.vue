<template>
    <div class="new">
        <div class="page__bd">
            <div class="weui-search-bar" id="searchBar">
                <form class="weui-search-bar__form">
                    <div class="weui-search-bar__box">
                        <i class="weui-icon-search"></i>
                        <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="搜索" required="">
                        <a href="javascript:" class="weui-icon-clear" id="searchClear"></a>
                    </div>
                    <label class="weui-search-bar__label" id="searchText" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
                        <i class="weui-icon-search"></i>
                        <span>搜索</span>
                    </label>
                </form>
                <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
            </div>
            <div  class="weui-cells searchbar-result" id="searchResult" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1); display: none;">
                <div class="weui-cells weui-cells_checkbox">
                <label class="weui-cell weui-check__label" v-bind:spell="item.userName" v-for='(item,index) in userList'>
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" name="checkbox1" id="s11" >
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                        <p>{{item.userName}}</p>
                    </div>
                </label>
            </div>
            </div>
        </div>
        <div style="height:300px">
            <a  @click='goToSDetails' href="javascript:;" class="weui-btn weui-btn_primary" style="margin-top:30px">确认</a>
        </div>
       
    </div>
</template>
<script>
export default {
  name: "hi",
  data() {
    return {
      userList: []
    };
  },
  mounted() {
        this.$ajax({
            method: "get",
            url: "../static/json/user1.json" //<---本地地址
        })
        .then(response => {
            let _data1 = response.data;
            if (response.data !== undefined) {
                this.userList = _data1.userList;
            }
        })
        .catch(function(err) {
            console.log(err);
        });

        this.searchInput();
      
   
    },
    methods:{
        goToSDetails:function (id) {
            var check =  $("input:checked");
            var newJson = new Array();
             var newObject = {};
             check.each(function(){
                var arr = [];
                arr = $(this).parent().next().find('p')
                     var arry1 =[];
                    for ( var i = 0; i <arr.length; i++){
                         arry1 =  arr[i].innerText;
                         newJson.push(arry1);
                         
                     newObject.name = newJson[i]
                    }  
                })
            console.log(newObject);
           
            
            localStorage.setItem('key',newObject);
                this.$router.push({
                    path:'./',   
                })
            },
 //搜索框
       searchInput: function() { 
            var $searchBar = $("#searchBar"),
                $searchResult = $("#searchResult"),
                $searchText = $("#searchText"),
                $searchInput = $("#searchInput"),
                $searchClear = $("#searchClear"),
                $searchCancel = $("#searchCancel");
            function hideSearchResult() {
                $searchResult.hide();
                $searchInput.val("");
            }
            function cancelSearch() {
                hideSearchResult();
                $searchBar.removeClass("weui-search-bar_focusing");
                $searchText.show();
            }
            function searchName() {
                var searchUserName = $("#searchInput").val();
                if (searchUserName == "") {
                    $("#searchResult").show();
                    $(".weui-check__label").show();
                } else {
                    $(".weui-check__label").each(function() {
                        var spell = $(this).attr("spell");
                        if (spell.indexOf(searchUserName) != -1) {
                              $("#searchResult").show();
                            $(this).show();
                        } else {
                            $(this).hide();
                        }
                    });
                }
            }
            $("#searchInput").bind("input propertychange", function() {
                searchName();
            });
            $searchText.on("click", function() {
                $searchBar.addClass("weui-search-bar_focusing");
                $searchInput.focus();
            });
            $searchClear.on("click", function() {
                hideSearchResult();
                $searchInput.focus();
            });
            $searchCancel.on("click", function() {
                cancelSearch();
                $searchInput.blur();
            });
        }
    }
};
</script>
<style scoped>
.weui-btn_primary {
  background-color: red;
  width: 90%;
  margin: 0 auto;
}
</style>


        