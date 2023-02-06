$(function() {
    var n = localStorage.getItem("pnumber") - '0';
    var names = [];
    var roles = [];
    var player = localStorage.getItem("player") - '0';
    for(var i = 1; i <= n; i++)
    {
        names.push(localStorage.getItem(i));
        roles.push(localStorage.getItem(100+i)-'0')
    }
    for(var i = 1; i <= n; i++)
    {
        if(roles[i-1] > 0 && i != player)
            $("#susAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><div class=\"cp_ipselect cp_sl01\"><select id=\"sus" + i + "\" required><option value=\"0\">疑わしくない</option><option value=\"1\">疑わしい</option></select></div></div>");
        else if(i != player && roles[i-1] == -700)
            $("#susAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">人狼(死亡)</p></div>");
        else if(i != player)
            $("#susAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">人狼ではない(死亡)</p></div>");
        else
            $("#susAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">霊媒師(あなた)</p></div>");
    }

    /* 決定ボタン */
    $("#civNextBtn").click(function() {
        var sum = 0;
        for(var i = 1; i <= n; i++)
        {
            //生きている人のみ
            if(roles[i-1] > 0 && i != player)
            {
                ids = "#sus" + i;
                sum += ($(ids).val() - '0');
            }
        }
        if(sum == 0)
        {
            alert("誰かを疑ってください。")
        }
        else if(player < n) //夜のアクションフェーズ確認
        {
            localStorage.setItem("player", player+1);
            window.location.href = "../check.html";
        }
        else if(player == n)
        {
            localStorage.setItem("player", 1);
            window.location.href = "../morning.html";
        }
        
    });

});
