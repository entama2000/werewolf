$(function() {
    var turn = localStorage.getItem("turn") - '0';
    var rule1000 = localStorage.getItem("1000") - '0';
    var rule1001 = localStorage.getItem("1001") - '0';
    var player = localStorage.getItem("player") - '0';
    var kaitou = localStorage.getItem("1204") - '0';
    var kaitoued = localStorage.getItem("1205") - '0';
    var playerName = localStorage.getItem(player);
    var playerRole = localStorage.getItem(100+player) - '0';
    $("#yourName").text(playerName);

    /* 決定ボタン */
    $("#checkNextBtn").click(function() {
        //リロード対策
        localStorage.setItem("killedn", -1);
        localStorage.setItem("killedNeko", -1);
        /* 夜のアクションへ */
        if(playerRole < 0)
            window.location.href = "./roles/death.html";
        else if(playerRole == 200) //市民
            window.location.href = "./roles/civ.html";
        else if(playerRole == 300 && rule1000 == 0 && turn == 1) //初夜殺しなし初夜人狼
            window.location.href = "./roles/wolf1.html";
        else if(playerRole == 300) //人狼
            window.location.href = "./roles/wolf2.html";
        else if(playerRole == 201 && rule1001 == 0 && turn == 1) //初夜占いなし初夜占い師
            window.location.href = "./roles/uranai0.html";
        else if(playerRole == 201 && rule1001 == 1 && turn == 1) //初夜占いランダム市民
        {
            localStorage.setItem("uranai", -1);
            window.location.href = "./roles/uranai1.html";
        }
        else if(playerRole == 201) //占い
        {
            localStorage.setItem("uranai", -1);
            window.location.href = "./roles/uranai2.html";
        }
        else if(playerRole == 202) //騎士
        {
            window.location.href = "./roles/kishi.html";
        }
        else if(playerRole == 203) //霊媒師
        {
            window.location.href = "./roles/reibai.html";
        }
        else if(playerRole == 204) //怪盗
        {
            window.location.href = "./roles/kaitou.html";
        }
        else if(playerRole == 205) //猫又
        {
            window.location.href = "./roles/nekomata.html";
        }
        else if(playerRole == 301) //狂人
        {
            window.location.href = "./roles/kyojin.html";
        }
        else if(playerRole == 400) //妖狐
        {
            window.location.href = "./roles/fox.html";
        }
        else if(playerRole == 401) //吊人
        {
            window.location.href = "./roles/teruteru.html";
        }
    
    });

});
