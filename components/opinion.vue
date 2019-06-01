<template>
    <div class="opinion">
        <div class="content">
            <div class="weui-cells__title">审核意见</div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <textarea class="weui-textarea wishContent" placeholder="请输入文本" rows="3"></textarea>
                        <div class="weui-textarea-counter wordsNum"><span>0</span>/200</div>
                    </div>
                </div>
            </div>
            <div class="weui-cells__title select">选择下一步用户</div>
            <div class="weui-cells weui-cells_checkbox">
                <label class="weui-cell weui-check__label" >
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" name="checkbox1" id="s11" checked="checked">
                        <i class="weui-icon-checked"></i>
                    </div>
                    <div class="weui-cell__bd">
                    <p>{{newUser}}</p>
                </div>
            </label>
                <a href="javascript:void(0);" class="weui-cell weui-cell_link">
                    <router-link to="/newProject">
                        <div class="weui-cell__bd">新增项</div>
                    </router-link>
                </a>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">审阅部门</label>
                    <span class="weui-form-preview__value">{{operationList.aprovalDeptName}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">审阅人</label>
                    <span class="weui-form-preview__value">{{operationList.aprovalName}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">审阅时间</label>
                    <span class="weui-form-preview__value">{{operationList.aprovalTime}}</span>
                </div>
            </div>
        </div>
        <div style = 'height:120px'>
            <button id="operation">操作</button>
        </div>
        
        <div id="operationDown" style="display:none">
            <div class="weui-mask" id="iosMask" style="opacity: 1;"></div>
            <div class="weui-actionsheet weui-actionsheet_toggle" id="iosActionsheet">
                <div class="weui-actionsheet__menu">
                    <div class="weui-actionsheet__cell" id="showIOSDialog1">同意</div>
                    <div class="weui-actionsheet__cell">不同意</div>
                </div>
                <div class="weui-actionsheet__action">
                    <div class="weui-actionsheet__cell iosActionsheetCancel" id="">取消</div>
                </div>
            </div>
        </div>
        <div class="page dialog js_show">
            <div class="page__bd page__bd_spacing"></div>
            <div id="dialogs" style="display:none">
                <div class="js_dialog" id="iosDialog1" style="opacity: 1;">
                    <div class="weui-mask"></div>
                    <div class="weui-dialog">
                        <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示</strong></div>
                        <div class="weui-dialog__bd">是否同意申请</div>
                        <div class="weui-dialog__ft">
                            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default iosActionsheetCancel">取消</a>
                            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary iosActionsheetCancel">确定</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "opinion",
        data() {
            return {
                operationList: {},
                userList: [],
                newUser:[
                    {}
                ]
            };
        },
        watch: {
        // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
            '$route': 'getParams'
        },
        mounted() {
            //GET
            this.$ajax.get("../static/json/operation.json")
                .then(response => {
                    let _data = response.data;
                    if (response.data !== undefined) {
                        this.operationList = _data.attr;
                        console.log(this.operationList)
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
    
            this.$ajax.get("../static/json/user2.json")
                .then(response => {
                    let _data1 = response.data;
                    if (response.data !== undefined) {
                        this.userList = _data1.userList;
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
    
            this.monitor();
            this.popup();
            this.getParams();

           
        },
        methods:{
            //textarea字数监听
            monitor:function(){
                 //字数监听
                var checkStrLengths = function(str, maxLength) {
                    var maxLength = maxLength;
                    var result = 0;
                    if (str && str.length > maxLength) {
                        result = maxLength;
                    } else {
                    result = str.length;
                    }
                    return result;
                }
                //监听输入
                $(".wishContent").on('input propertychange', function() {
                    //获取输入内容
                    var userDesc = $(this).val();
                    //判断字数
                    var len;
                    if (userDesc) {
                        len = checkStrLengths(userDesc, 200);
                    } else {
                        len = 0
                    }
                    //显示字数
                    $(".wordsNum").html(len + '/200');
                });
            },

            //弹出层
            popup:function(){
                //弹出框1
                $(function() {
                    var $iosActionsheet = $('#iosActionsheet');
                    var $iosMask = $('#iosMask');
                    function hideActionSheet() {
                        $iosActionsheet.removeClass('weui-actionsheet_toggle');
                        $iosMask.fadeOut(200);
                    }
                    $iosMask.on('click', hideActionSheet);
                    $('.iosActionsheetCancel').on('click', hideActionSheet);
                    $("#showIOSActionSheet").on("click", function() {
                        $iosActionsheet.addClass('weui-actionsheet_toggle');
                        $iosMask.fadeIn(200);
                    });
                    $("#operation").on('click', function() {
                        $("#operationDown").css('display', 'block');
                        $iosActionsheet.addClass('weui-actionsheet_toggle');
                        $iosMask.fadeIn(200);
                    })
                });

                //弹出框2
                $(function(){
                    var $iosDialog1 = $('#iosDialog1')
                    var showIOSDialog1 =$("#showIOSDialog1")
                        $('#showIOSDialog1').on('click', function(){
                        $("#dialogs").show()
                    });
                    $('#dialogs').on('click', '.weui-dialog__btn', function(){
                        $(this).parents('.js_dialog').fadeOut(200);
                    });
                    $('#showIOSDialog1').on('click', function(){
                        $iosDialog1.fadeIn(200);
                    });
                });
            },
            getParams:function(){
                var newUser=localStorage.getItem('key');
                var newUser = {name:''};
                this.newUser=newUser;
                console.log(this.newUser);
            },
        }
    };
</script>
<style scoped>
    .content {
        background-color: white;
    }
    .select {
        height: 40px;
        line-height: 40px;
        text-align: left;
        padding-left: 20px;
        font-size: 14px;
        color: #888888;
    }
    button {
        opacity: 0.6;
        background: #e64340;
        border: 2px solid rgba(5, 5, 5, 0.08);
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5), inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        color: #ffffff;
        opacity: 60%;
        font-size: 18px;
        line-height: 25px;
        width: 335px;
        height: 47px;
        margin-top: 30px;
    }
    .weui-cells__title{
        text-align: left;
    }
</style>