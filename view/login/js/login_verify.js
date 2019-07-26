(function(window, doc){

    //验证
    var verifyRegCode = {
        Phone: /^0?1[3|4|5|7|8][0-9]\d{8}$/,
        Code: /^\d+$/,
        Email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    };

    var verifyCode = verifyCode || {};
    verifyCode.User = function (val) {
        if(val == "" || val == null){
            alert("填写账号");
            return false;
        } else{
            return true;
        }
    };
    verifyCode.Pass = function (val) {
        if (val == "" || val == null) {
            alert("填写密码");
            return false;
        } else {
            return true;
        }
    };
    verifyCode.Phone = function (val) {
        if (val == "" || val == null) {
            alert("填写手机");
            return false;
        } else {
            if (!verifyRegCode.Phone.test(val)) {
                alert("填写正确的手机!");
                return false;
            } else {
                return true;
            }
        }
    };
    verifyCode.Code = function (val) {
        if (val == "" || val == null) {
            alert("填写验证码");
            return false;
        } else {
            if (!verifyRegCode.Code.test(val)) {
                alert("填写正确的验证码!");
                return false;
            } else {
                return true;
            }
        }
    };
    verifyCode.Email = function (val) {
        if (val == "" || val == null) {
            alert("填写邮箱");
            return false;
        } else {
            if (!verifyRegCode.Email.test(val)) {
                alert("填写正确的邮箱!");
                return false;
            } else {
                return true;
            }
        }
    };
    
    
    //是否显示模态弹框
    function modalIsShow(btn, options){
        var btn = btn,
        data = btn.getAttribute("data-target"),
        modal = doc.getElementById(data),
        options = options;

        if(options.toLowerCase() == "show"){
            modal.style.display = "block"; 
            modal.className = "modal fade in";
        } else 
        if(options.toLowerCase() == "hide"){
            modal.style.display = "none";
            modal.className = "modal fade";
        }         
    }

    //用户账号登录
    var userLoginBtn = doc.getElementById("userLoginBtn");
    userLoginBtn.addEventListener("click", function () {
        var inputUser = doc.getElementById("inputUser")
        verifyCode.User(inputUser.value);
        verifyCode.Pass(inputPass.value);
    })

    //用户手机登录
    var phoneLoginBtn = doc.getElementById("phoneLoginBtn");
    phoneLoginBtn.addEventListener("click", function () {
        verifyCode.Phone(inputUser.value);
        verifyCode.Code(inputPass.value);
    })

    // 短信登录弹框
    var btnSend = doc.getElementById("sendLoginBtn");
    btnSend.addEventListener("click", function(){
        modalIsShow(this, "show");
    })

    var btnWeixin = doc.getElementById("weixinLoginBtn");
    btnWeixin.addEventListener("click", function(){
        alert("这里调用微信API");
    })

    // 模态关闭按钮
    var btnColse = doc.getElementsByClassName("btn_colse")[0];
    btnColse.addEventListener("click", function () {
        modalIsShow(btnSend, "hide");
    })

    // 图形码刷新
    var imgVerify = doc.getElementById("refreshPhoto");
    imgVerify.addEventListener("click", function () {
        this.src = "img/vCode.jpg"
    })

}) (window, document);