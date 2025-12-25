/* 人狼殺害投票集計、騎士、猫又処理はここ */
/* ゲーム終了判定1もここ */

$(function() {
    /* 保存情報取得 */
    var n = localStorage.getItem("pnumber") - '0';
    var turn = localStorage.getItem("turn") - '0';
    var rule1000 = localStorage.getItem("1000") - '0';
    var uranai = localStorage.getItem("uranai") - '0';
    var kishi = localStorage.getItem("1202") - '0';
    var kaitou = localStorage.getItem("1204") - '0';
    var kaitoued = localStorage.getItem("1205") - '0';
    var names = [];
    var roles = [];
    var votes = []; //得票数
    var player = localStorage.getItem("player") - '0';
    var killedNeko = localStorage.getItem("killedNeko") - '0';
    for(var i = 1; i <= n; i++)
    {
        names.push(localStorage.getItem(i));
        roles.push(localStorage.getItem(100+i)-'0');
        votes.push(localStorage.getItem(2000+i)-'0');
    }

    // 騎士が生存していないのに、過去の「守り先(1202)」が残っていると
    // 襲撃が不正に無効化されるため、ここでガード判定を無効化する。
    var hasLivingKishi = 0;
    for(var i = 0; i < n; i++)
        if(roles[i] == 202)
            hasLivingKishi = 1;
    if(!hasLivingKishi)
        kishi = -1;

    alert("夜のターンは終了です。\nゲームマスターに端末を渡して下さい。");

    /* 殺害処理 */
    //投票数が被った場合、ランダムでひとり選ぶ
    var voten = 0;
    var killedn = 0;
    var killedns = [];
    for(var i = 1; i <= n; i++)
    {
        if(votes[i-1] > voten)
        {
            voten = votes[i-1];
            killedns = [];
            killedns.push(i);
        }
        else if((voten > 0) && (votes[i-1] == voten))
            killedns.push(i);
    }
    if(voten > 0)
    {
        killedn = Math.floor(Math.random()*1027)%killedns.length;
        killedn = killedns[killedn];
    }

    /* 殺害処理 */
    //妖狐プレイヤー
    var foxn = -1, killCheck = 0;
    for(var i = 1; i <= n; i++)
        if(roles[i-1] == 400)
            foxn = i;
    if(killedn > 0 && killedn != kishi && killedn != foxn)
    {
        killCheck = 1;
        //投票数リセット
        for(var i = 1; i <= n; i++)
            localStorage.setItem(2000+i, 0);
        localStorage.setItem(2000+killedn, 1);
        $("#noKilled").remove();
        $("#killedOne").before("<h2>" + names[killedn-1] + "</h2>");

        //猫又殺害時処理
        if(roles[killedn-1] == 205 && killedNeko == -1)
        {
            //生存人狼
            var wolfs = [];
            for(var i = 1; i <= n; i++)
                if(roles[i-1] == 300)
                    wolfs.push(i);
            killedNeko = Math.floor(Math.random()*1027)%wolfs.length;
            killedNeko = wolfs[killedNeko];
            $("#killedOne").before("<h2>" + names[killedNeko-1] + "</h2>");
            if(roles[killedNeko-1] > 0)
            {
                roles[killedNeko-1] -= 1000;
                localStorage.setItem(100+killedNeko, roles[killedNeko-1]);
                localStorage.setItem("killedNeko", killedNeko);
            }
        }
        else if(killedNeko > 0)
        {
            $("#killedOne").before("<h2>" + names[killedNeko-1] + "</h2>");
            if(roles[killedNeko-1] > 0)
            {
                roles[killedNeko-1] -= 1000;
                localStorage.setItem(100+killedNeko, roles[killedNeko-1]);
            }
        }

        //人狼殺害
        if(roles[killedn-1] > 0)
        {
            roles[killedn-1] -= 1000;
            localStorage.setItem(100+killedn, roles[killedn-1]);
        }
        
    }
    
    if(uranai > 0 && foxn == uranai)
    {
        killCheck = 1;
        killedn = foxn;
        $("#noKilled").remove();
        $("#killedOne").before("<h2>" + names[killedn-1] + "</h2>");
        if(roles[killedn-1] > 0)
        {
            roles[killedn-1] -= 1000;
            localStorage.setItem(100+killedn, roles[killedn-1]);
        }
    }
    if(killCheck)
        $("#killedOne").after("<p class=\"desc\">(死者は今後喋ってはいけません。)</p>");

    /* 勝利判定 */
    //人狼数
    var wolfn = 0;
    for(var i = 0; i < n; i++)
        if(roles[i] == 300)
            wolfn++;
    //生存者数
    var liver = 0;
    for(var i = 0; i < n; i++)
        if(roles[i] > 0)
            liver++;
    //妖狐生存確認
    var foxLive = 0;
    for(var i = 0; i < n; i++)
        if(roles[i] == 400)
            foxLive = 1;
    //市民チームor妖狐勝利
    if(wolfn == 0)
    {
        $("#morningNextBtn").remove();
        setTimeout(function(){
            if(foxLive)
                localStorage.setItem("win", 400);
            else
                localStorage.setItem("win", 200);
            window.location.href = "./result.html";
        }, 3000);
    }
    //人狼チームor妖狐勝利
    if(wolfn >= (liver - wolfn))
    {
        $("#morningNextBtn").remove();
        setTimeout(function(){     
            if(foxLive)
                localStorage.setItem("win", 400);
            else
                localStorage.setItem("win", 300);
            window.location.href = "./result.html";
        }, 3000);
    }

    /* 怪盗処理 */
    if(turn == 1 && kaitou != -1 && kaitoued != -1)
    {
        localStorage.setItem(100+kaitou, roles[kaitoued-1]);
        localStorage.setItem(100+kaitoued, 200);
    }

    /* カウントダウン */
    var count = 180;
    var stopper;
    $("#cd").text(count);
    function countdown(){
        if(count <=0)
        {
            count = 180;
            alert("時間です。");
            $("#cd").text(count);
        }
        else if(stopper == 0){
            setTimeout(countdown, 1000);
            count--;
            $("#cd").text(count);
        }
        else if(stopper == 1){
            return 1;
        }
    }
    $("#cdBtns").on("click", "#cdStartBtn", function() {
        $("#cdStartBtn").remove();
        stopper = 0; //タイマー動かす
        countdown();
        $("#cdBtns").append("<p id=\"cdStopBtn\" class=\"btn-flat-border\">ストップ</p>")
    });
    $("#cdBtns").on("click", "#cdStopBtn", function() {
        $("#cdStopBtn").remove();
        stopper = 1 //タイマー止める
        $("#cdBtns").append("<p id=\"cdStartBtn\" class=\"btn-flat-border\">スタート</p>")
    });
    $("#cdPlusBtn").click(function() {
        count += 60;
        $("#cd").text(count);
    });
    $("#cdResetBtn").click(function() {
        stopper = 1;
        count = 180;
        $("#cdStartBtn").remove();
        $("#cdStopBtn").remove();
        $("#cdBtns").append("<p id=\"cdStartBtn\" class=\"btn-flat-border\">スタート</p>")
        $("#cd").text(count);
    });

    /* 決定ボタン */
    $("#morningNextBtn").click(function() {
        
        /* その他変数 */
        localStorage.setItem("player", 1); //1人目から
        localStorage.setItem("killedn", -1);
        localStorage.setItem("killedNeko", -1);
        //投票数リセット
        for(var i = 1; i <= n; i++)
            localStorage.setItem(2000+i, 0);
        /* 投票スタート */
        window.location.href = "./checkVote.html";
    });

});
