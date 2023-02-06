$(function() {
    var n = localStorage.getItem("pnumber") - '0';
    var rule1002 = localStorage.getItem("1002") - '0';
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

    //怪盗初回
    if(kaitou == -1 && kaitoued == -1)
    {
        for(var i = 1; i <= n; i++)
        {
            if(roles[i-1] > 0 && i != player)
                $("#kaitouAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><div class=\"cp_ipselect cp_sl01\"><select id=\"kaitou" + i + "\" required><option value=\"0\">奪わない</option><option value=\"1\">奪う</option></select></div></div>");
            else if(i != player)
                $("#kaitouAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">死亡</p></div>");
            else
                $("#kaitouAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">あなた</p></div>");
        }

        /* 奪うボタン */
        $("#kaitouBtn").click(function() {
            var sum = 0;
            var id = -1;
            for(var i = 1; i <= n; i++)
            {
                //生きている人のみ
                if(roles[i-1] > 0 && i != player)
                {
                    ids = "#kaitou" + i;
                    sum += ($(ids).val() - '0');
                    if($(ids).val() - '0')
                        id = i;
                }
            }
            if(sum != 1)
            {
                alert("奪う人を1人だけ選んでください。")
            }
            else
            {
                //要素変更
                $("#kaitouBtn").remove();
                $("#kaitouDesc").remove();
                $("#kaitouAdd").remove();
                //怪盗データ
                localStorage.setItem(1204, player); //怪盗本人
                localStorage.setItem(1205, id); //怪盗対象
                //怪盗結果
                var roleID = roles[id-1];
                $("#kaitouRes").before("<p class=\"desc\">奪った結果</p>");
                $("#kaitouRes").append("<div class=\"roles\"><p id=\"p" + id + "\">" + names[id-1] + "から</p><p class=\"deathp\">" + rolesMap.get(roleID) + "</p><p>　を奪った。</p></div>");
                //決定ボタン追加
                $("#kaitouRes").append("<p id=\"civNextBtn\" class=\"button019\" style=\"margin-top: 45px;\">完了</p>")
            }
            
        });
    }
    else
    {
        id = kaitoued;
        //要素変更
        $("#kaitouBtn").remove();
        $("#kaitouDesc").remove();
        $("#kaitouAdd").remove();
        //怪盗データ
        localStorage.setItem(1204, player); //怪盗本人
        localStorage.setItem(1205, id); //怪盗対象
        //怪盗結果
        var roleID = roles[id-1];
        $("#kaitouRes").before("<p class=\"desc\">奪った結果</p>");
        $("#kaitouRes").append("<div class=\"roles\"><p id=\"p" + id + "\">" + names[id-1] + "から</p><p class=\"deathp\">" + rolesMap.get(roleID) + "</p><p>　を奪った。</p></div>");
        //決定ボタン追加
        $("#kaitouRes").append("<p id=\"civNextBtn\" class=\"button019\" style=\"margin-top: 45px;\">完了</p>")
    }

    /* 決定ボタン */
    $("#kaitouRes").on("click", "#civNextBtn", function() {
        localStorage.setItem("uranai", -1)
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
