$(function() {
    var n = localStorage.getItem("pnumber") - '0';
    var kishi = localStorage.getItem("1202") - '0';
    var rule1002 = localStorage.getItem("1002") - '0';
    var names = [];
    var roles = [];
    var player = localStorage.getItem("player") - '0';
    for(var i = 1; i <= n; i++)
    {
        names.push(localStorage.getItem(i));
        roles.push(localStorage.getItem(100+i)-'0')
    }

    //騎士初回
    if(kishi == -1 || rule1002 != 0)
    {

        for(var i = 1; i <= n; i++)
        {
            if(roles[i-1] > 0 && i != player)
                $("#kishiAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><div class=\"cp_ipselect cp_sl01\"><select id=\"kishi" + i + "\" required><option value=\"0\">守らない</option><option value=\"1\">守る</option></select></div></div>");
            else if(i != player)
                $("#kishiAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">死亡</p></div>");
            else
                $("#kishiAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">あなた</p></div>");
        }

    }
    else if(rule1002 == 0) //連続ガードなし
    {
        for(var i = 1; i <= n; i++)
        {
            if(roles[i-1] > 0 && i != player && i != kishi)
                $("#kishiAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><div class=\"cp_ipselect cp_sl01\"><select id=\"kishi" + i + "\" required><option value=\"0\">守らない</option><option value=\"1\">守る</option></select></div></div>");
            else if(i != player && i != kishi)
                $("#kishiAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">死亡</p></div>");
            else if(i == player)
                $("#kishiAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">あなた</p></div>");
            else if(i == kishi)
                $("#kishiAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">連続ガード禁止</p></div>");
        }
    }

    /* 決定ボタン */
    $("#civNextBtn").click(function() {
        var sum = 0;
        var id = -1;
        for(var i = 1; i <= n; i++)
        {
            //生きている人のみ
            if(roles[i-1] > 0 && i != player && i != kishi)
            {
                ids = "#kishi" + i;
                sum += ($(ids).val() - '0');
                if($(ids).val() - '0')
                    id = i;
            }
        }
        if(sum != 1)
        {
            alert("守る人を1人だけ選んでください。")
        }
        else if(player < n) //夜のアクションフェーズ確認
        {
            //騎士守り人
            localStorage.setItem(1202, id);
            //ページ推移
            localStorage.setItem("player", player+1);
            window.location.href = "../check.html";
        }
        else if(player == n)
        {
            //騎士守り人
            localStorage.setItem(1202, id);
            //ページ推移
            localStorage.setItem("player", 1);
            window.location.href = "../morning.html";
        }
        
    });

});
