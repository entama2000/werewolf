$(function() {
    var n = localStorage.getItem("pnumber") - '0';
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
    for(var i = 1; i <= n; i++)
    {
        if(roles[i-1] == 300 && i != player)
            $("#susAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">人狼</p></div>");
        else if(roles[i-1] == -700 && i != player)
            $("#susAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">人狼(死亡)</p></div>");
        else if(roles[i-1] > 0 && i != player)
            $("#susAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><div class=\"cp_ipselect cp_sl01\"><select id=\"sus" + i + "\" required><option value=\"0\">殺さなくて良い</option><option value=\"1\">なんとなく殺す(1票)</option><option value=\"2\">殺した方が良い(2票)</option><option value=\"3\">殺すべき(3票)</option></select></div></div>");
        else if(i != player)
            $("#susAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">死亡</p></div>");
        else
            $("#susAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">あなた</p></div>");
    }

    /* 決定ボタン */
    $("#civNextBtn").click(function() {
        var sum = 0;
        for(var i = 1; i <= n; i++)
        {
            //生きている人のみ
            if(roles[i-1] > 0 && roles[i-1] != 300)
            {
                ids = "#sus" + i;
                sum += ($(ids).val() - '0');
            }
        }
        if(sum == 0)
        {
            alert("殺す人を決めて下さい。")
        }
        else if(sum > 3)
        {
            alert("投票数が多すぎます。")
        }
        else if(player < n) //夜のアクションフェーズ確認
        {
            //votes更新
            for(var i = 1; i <= n; i++)
                if(roles[i-1] > 0 && roles[i-1] != 300)
                {
                    ids = "#sus" + i;
                    votes[i-1] += $(ids).val() - '0';
                }
            //投票保存
            for(var i = 1; i <= n; i++)
                localStorage.setItem(2000+i, votes[i-1]);
            //ページ推移
            localStorage.setItem("player", player+1);
            window.location.href = "../check.html";
        }
        else if(player == n)
        {
            //votes更新
            for(var i = 1; i <= n; i++)
                if(roles[i-1] > 0 && roles[i-1] != 300)
                {
                    ids = "#sus" + i;
                    votes[i-1] += $(ids).val() - '0';
                }
            //投票保存
            for(var i = 1; i <= n; i++)
                localStorage.setItem(2000+i, votes[i-1]);
            //ページ推移
            localStorage.setItem("player", 1);
            window.location.href = "../morning.html";
        }
        
    });

});
