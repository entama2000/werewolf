$(function() {
    var n = localStorage.getItem("pnumber") - '0';
    var kaitou = localStorage.getItem("1204") - '0';
    var kaitoued = localStorage.getItem("1205") - '0';
    var names = [];
    var roles = [];
    var player = localStorage.getItem("player") - '0';
    for(var i = 1; i <= n; i++)
    {
        names.push(localStorage.getItem(i));
        roles.push(localStorage.getItem(100+i)-'0')
    }

    /* 役職マップ */
    const rolesMap = new Map();
    rolesMap.set(200, "市民");
    rolesMap.set(201, "占い師");   
    rolesMap.set(202, "騎士");
    rolesMap.set(203, "霊媒師");
    rolesMap.set(204, "怪盗");
    rolesMap.set(205, "猫又");
    rolesMap.set(300, "人狼");
    rolesMap.set(301, "狂人");
    rolesMap.set(400, "妖狐");
    rolesMap.set(401, "てるてる");

    /* 決定ボタン */
    $("#deathNextBtn1").click(function() {
        if(player < n) //夜のアクションフェーズ確認
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

    $("#deathNextBtn2").click(function() {
        /* 配役表示 */
        $("#deathNextBtn1").remove();
        $("#deathNextBtn2").remove();
        $("#roleShow").before("<h2>配役</h2><p class=\"desc\">今回のゲームは以下のような配役です。</p>");
        for(var i = 1; i <= n; i++)
        {
            var roleID = roles[i-1];
            if(roleID < 0 && i != kaitou && i != kaitoued) 
            {
                roleID += 1000;
                $("#roleShow").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">" + rolesMap.get(roleID) + "(死)</p></div>");
            }
            else if(i != kaitou && i != kaitoued)
            {
                $("#roleShow").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">" + rolesMap.get(roleID) + "</p></div>");
            }
            else if(roleID < 0 && i == kaitou) 
            {
                roleID += 1000;
                $("#roleShow").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">怪盗 → " + rolesMap.get(roleID) + "(死)</p></div>");
            }
            else if(i == kaitou)
            {
                $("#roleShow").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">怪盗 → " + rolesMap.get(roleID) + "</p></div>");
            }
            else if(roleID < 0 && i == kaitoued) 
            {
                roleID += 1000;
                $("#roleShow").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">" + rolesMap.get((roles[kaitou-1]+1000)%1000) + " → " + rolesMap.get(roleID) + "(死)</p></div>");
            }
            else if(i == kaitoued)
            {
                $("#roleShow").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">" + rolesMap.get((roles[kaitou-1]+1000)%1000) + " → "  + rolesMap.get(roleID) + "</p></div>");
            }
        }
        $("#roleShow").append("<p id=\"deathNextBtn3\" class=\"button019\" style=\"margin-top: 45px;\">完了</p>");
    
    });

    $("#roleShow").on("click", "#deathNextBtn3", function() {
        if(player < n) //夜のアクションフェーズ確認
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
