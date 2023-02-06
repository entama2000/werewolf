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
    for(var i = 1; i <= n; i++)
    {
        names.push(localStorage.getItem(i));
        roles.push(localStorage.getItem(100+i)-'0');
        votes.push(localStorage.getItem(2000+i)-'0');
    }
    //死んでいた場合の処理
    if(roles[player-1] < 0 && player < n)
    {
        localStorage.setItem("player", player+1);
        window.location.href = "./vote.html";
    }
    else if(roles[player-1] < 0 && player == n)
    {
        localStorage.setItem("player", 1);
        window.location.href = "./voteResult.html";
    }
    else //生きている人
    {
        alert(names[player-1] + "の投票です。")
    }

    $("#yourName").text(names[player-1]);
    for(var i = 1; i <= n; i++)
    {
        if(roles[i-1] > 0 && player != i)
            $("#voteAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><div class=\"cp_ipselect cp_sl01\"><select id=\"vote" + i + "\" required><option value=\"0\">投票しない</option><option value=\"1\">投票する</option></select></div></div>");
        else if(player != i)
            $("#voteAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">死亡</p></div>");
    }
    
    $("#voteNextBtn").click(function() {
        var sum = 0;
        for(var i = 1; i <= n; i++)
        {
            //生きている人のみ
            if(roles[i-1] > 0 && player != i)
            {
                ids = "#vote" + i;
                sum += ($(ids).val() - '0');
            }
        }
        if(sum == 0)
        {
            alert("処刑する人を決めて下さい。")
        }
        else if(sum > 1)
        {
            alert("投票数が多すぎます。")
        }
        else if(player < n) //夜のアクションフェーズ確認
        {
            //votes更新
            for(var i = 1; i <= n; i++)
                if(roles[i-1] > 0 && player != i)
                {
                    ids = "#vote" + i;
                    votes[i-1] += $(ids).val() - '0';
                }
            //投票保存
            for(var i = 1; i <= n; i++)
                localStorage.setItem(2000+i, votes[i-1]);
            //ページ推移
            localStorage.setItem("player", player+1);
            window.location.href = "./vote.html";
        }
        else if(player == n)
        {
            //votes更新
            for(var i = 1; i <= n; i++)
                if(roles[i-1] > 0 && player != i)
                {
                    ids = "#vote" + i;
                    votes[i-1] += $(ids).val() - '0';
                }
            //投票保存
            for(var i = 1; i <= n; i++)
                localStorage.setItem(2000+i, votes[i-1]);
            //リロード対策
            localStorage.setItem("killedn", -1);
            localStorage.setItem("killedNeko", -1);
            //ページ推移
            localStorage.setItem("player", 1);
            window.location.href = "./voteResult.html";
        }
        
    });

});
