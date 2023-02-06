$(function() {
    var n = localStorage.getItem("pnumber") - '0';
    var uranai = localStorage.getItem("uranai") - '0';
    var names = [];
    var roles = [];
    var player = localStorage.getItem("player") - '0';
    for(var i = 1; i <= n; i++)
    {
        names.push(localStorage.getItem(i));
        roles.push(localStorage.getItem(100+i)-'0')
    }

    //占い初回
    if(uranai == -1)
    {

        for(var i = 1; i <= n; i++)
        {
            if(roles[i-1] > 0 && i != player)
                $("#uranaiAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><div class=\"cp_ipselect cp_sl01\"><select id=\"uranai" + i + "\" required><option value=\"0\">占わない</option><option value=\"1\">占う</option></select></div></div>");
            else if(i != player)
                $("#uranaiAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">死亡</p></div>");
            else
                $("#uranaiAdd").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">あなた</p></div>");
        }

        /* 占うボタン */
        $("#uranaiBtn").click(function() {
            localStorage.setItem("uranai", -1);
            var sum = 0;
            var id = -1;
            for(var i = 1; i <= n; i++)
            {
                //生きている人、自分以外のみ
                if(roles[i-1] > 0 && i != player)
                {
                    ids = "#uranai" + i;
                    sum += ($(ids).val() - '0');
                    if($(ids).val() - '0')
                        id = i;
                }
            }
            if(sum != 1)
            {
                alert("占う人を1人だけ選んで下さい。")
            }
            else
            {
                localStorage.setItem("uranai", id)
                $("#uranaiAdd").remove();
                $("#uranaiDesc").remove();
                $("#uranaiBtn").remove();
                //占い結果
                $("#uranaiRes").before("<p class=\"desc\">今夜の占い結果</p>");
                if(roles[id-1] != 300)
                    $("#uranaiRes").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[id-1] + "</p><p class=\"deathp\">人狼ではない</p></div>");
                else
                    $("#uranaiRes").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[id-1] + "</p><p class=\"deathp\">人狼</p></div>");
                //決定ボタン追加
                $("#uranaiRes").append("<p id=\"civNextBtn\" class=\"button019\" style=\"margin-top: 45px;\">完了</p>");
            }
            
        });

    }
    else //リロード後
    {
        var id = uranai;
        localStorage.setItem("uranai", id)
        $("#uranaiAdd").remove();
        $("#uranaiDesc").remove();
        $("#uranaiBtn").remove();
        //占い結果
        $("#uranaiRes").before("<p class=\"desc\">今夜の占い結果</p>");
        if(roles[id-1] != 300)
            $("#uranaiRes").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[id-1] + "</p><p class=\"deathp\">人狼ではない</p></div>");
        else
            $("#uranaiRes").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[id-1] + "</p><p class=\"deathp\">人狼</p></div>");
        //決定ボタン追加
        $("#uranaiRes").append("<p id=\"civNextBtn\" class=\"button019\" style=\"margin-top: 45px;\">完了</p>");
    }

    /* 決定ボタン */
    $("#uranaiRes").on("click", "#civNextBtn", function() {
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
