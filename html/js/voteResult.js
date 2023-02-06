/* 人狼殺害投票集計、騎士、猫又処理はここ */
/* ゲーム終了判定1もここ */

$(function() {
    /* 保存情報取得 */
    var n = localStorage.getItem("pnumber") - '0';
    var turn = localStorage.getItem("turn") - '0';
    var rule1000 = localStorage.getItem("1000") - '0';
    var names = [];
    var roles = [];
    var votes = []; //得票数
    var player = localStorage.getItem("player") - '0';
    var killednTemp = localStorage.getItem("killedn") - '0';
    var killedNekoTemp = localStorage.getItem("killedNeko") - '0';
    for(var i = 1; i <= n; i++)
    {
        names.push(localStorage.getItem(i));
        roles.push(localStorage.getItem(100+i)-'0');
        votes.push(localStorage.getItem(2000+i)-'0');
    }

    alert("投票は終了です。\nゲームマスターに端末を渡して下さい。")

    /* 殺害処理 */
    var killedn = 0;
    if(killednTemp == -1)
    {
        //投票数が被った場合、ランダムでひとり選ぶ
        var voten = 0;
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
        localStorage.setItem("killedn", killedn);
    }
    else
        killedn = killednTemp;

    /* 処刑処理1 */
    var killedNeko = -1;
    if(killedn > 0)
    {
        //投票数リセット
        for(var i = 1; i <= n; i++)
            localStorage.setItem(2000+i, 0);
        localStorage.setItem(2000+killedn, 1);
        $("#nameKilled").remove();
        $("#killedOne").before("<h2>" + names[killedn-1] + "</h2>");
        //猫又殺害時処理
        if(roles[killedn-1] == 205 && killedNekoTemp == -1)
        {
            //生存人狼
            var lives = [];
            for(var i = 1; i <= n; i++)
                if(roles[i-1] > 0 && roles[i-1] != 205)
                    lives.push(i);
            killedNeko = Math.floor(Math.random()*1027)%lives.length;
            killedNeko = lives[killedNeko];
            localStorage.setItem("killedNeko", killedNeko);
        }
        else if(killedNekoTemp != -1)
            killedNeko = killedNekoTemp;
        if(killedNeko != -1)
            $("#killedOne").before("<h2>" + names[killedNeko-1] + "</h2>");
    }

    /* 決定ボタン */
    $("#voteResultNextBtn").click(function() {
        /* 処刑処理2 */
        if(roles[killedn-1] > 0)
        {
            roles[killedn-1] -= 1000;
            localStorage.setItem(100+killedn, roles[killedn-1]);
        }
        if(roles[killedNeko-1] > 0)
        {
            roles[killedNeko-1] -= 1000;
            localStorage.setItem(100+killedNeko, roles[killedNeko-1]);
        }

        /* その他変数 */
        localStorage.setItem("player", 1); //1人目から
        localStorage.setItem("killedn", -1);
        localStorage.setItem("killedNeko", -1);
        //投票数リセット
        for(var i = 1; i <= n; i++)
            localStorage.setItem(2000+i, 0);

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
        //てるてる勝利
        if((roles[killedn-1]+1000) == 401)
        {
            localStorage.setItem("win", 401);
            window.location.href = "./result.html";
        }
        //市民チームor妖狐勝利
        else if(wolfn == 0)
        {
            if(foxLive)
                localStorage.setItem("win", 400);
            else
                localStorage.setItem("win", 200);
            window.location.href = "./result.html";
        }
        //人狼チームor妖狐勝利
        else if(wolfn >= (liver - wolfn))
        {
            if(foxLive)
                localStorage.setItem("win", 400);
            else
                localStorage.setItem("win", 300);
            window.location.href = "./result.html";
        }
        else //続く
        {
            /* 処刑後 */
            window.location.href = "./voteAfter.html";
        }
        
    });

});
