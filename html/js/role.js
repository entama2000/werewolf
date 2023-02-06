$(function() {
    /* プレイ人数 */
    var n = localStorage.getItem("pnumber") - '0';

    /* 役職人数 */
    var nWerewolf = 1;
    var nUranai = 0;
    var nKishi = 0;
    var nReibai = 0;
    var nKyojin = 0;
    var nKaitou = 0;
    var nFox = 0;
    var nNekomata = 0;
    var nTeruteru = 0;

    /* 市民人数計算用関数 */
    function civNum() {
        return n - nWerewolf - nUranai - nKishi - nReibai - nKyojin - nKaitou - nFox - nNekomata - nTeruteru;
    }

    /* 役職人数表記 */
    $("#civ_num").text(civNum() + "人");
    //人狼
    $("#role_werewolf").change(function() {
        nWerewolf = $(this).val();
        if(n - nWerewolf > nWerewolf && civNum() >= 0)
        {
            $("#civ_num").text(civNum() + "人");
        }
        else
        {
            alert("人狼の数が多すぎます。");
            nWerewolf = 1;
            $("#civ_num").text(civNum() + "人");
            $("#role_werewolf").val(0);
        }
    });
    //占い師
    $("#role_uranai").change(function() {
        nUranai = $(this).val();
        if(civNum() >= 0)
        {
            $("#civ_num").text(civNum() + "人");
        }
        else
        {
            alert("役職の数が多すぎます。");
            nUranai = 0;
            $("#civ_num").text(civNum() + "人");
            $("#role_uranai").val(0);
        }
    });
    //騎士
    $("#role_kishi").change(function() {
        nKishi = $(this).val();
        if(civNum() >= 0)
        {
            $("#civ_num").text(civNum() + "人");
        }
        else
        {
            alert("役職の数が多すぎます。");
            nKishi = 0;
            $("#civ_num").text(civNum() + "人");
            $("#role_kishi").val(0);
        }
    });
    //霊媒師
    $("#role_reibai").change(function() {
        nReibai = $(this).val();
        if(civNum() >= 0)
        {
            $("#civ_num").text(civNum() + "人");
        }
        else
        {
            alert("役職の数が多すぎます。");
            nReibai = 0;
            $("#civ_num").text(civNum() + "人");
            $("#role_reibai").val(0);
        }
    });
    //怪盗
    $("#role_kaitou").change(function() {
        nKaitou = $(this).val();
        if(civNum() >= 0)
        {
            $("#civ_num").text(civNum() + "人");
        }
        else
        {
            alert("役職の数が多すぎます。");
            nKaitou = 0;
            $("#civ_num").text(civNum() + "人");
            $("#role_kaitou").val(0);
        }
    });
    //猫又
    $("#role_nekomata").change(function() {
        nNekomata = $(this).val();
        if(civNum() >= 0)
        {
            $("#civ_num").text(civNum() + "人");
        }
        else
        {
            alert("役職の数が多すぎます。");
            nNekomata = 0;
            $("#civ_num").text(civNum() + "人");
            $("#role_nekomata").val(0);
        }
    });
    //狂人
    $("#role_kyojin").change(function() {
        nKyojin = $(this).val();
        if(civNum() >= 0)
        {
            $("#civ_num").text(civNum() + "人");
        }
        else
        {
            alert("役職の数が多すぎます。");
            nKyojin = 0;
            $("#civ_num").text(civNum() + "人");
            $("#role_kyojin").val(0);
        }
    });
    //妖狐
    $("#role_fox").change(function() {
        nFox = $(this).val();
        if(civNum() >= 0)
        {
            $("#civ_num").text(civNum() + "人");
        }
        else
        {
            alert("役職の数が多すぎます。");
            nFox = 0;
            $("#civ_num").text(civNum() + "人");
            $("#role_fox").val(0);
        }
    });
    //吊人
    $("#role_Teruteru").change(function() {
        nTeruteru = $(this).val();
        if(civNum() >= 0)
        {
            $("#civ_num").text(civNum() + "人");
        }
        else
        {
            alert("役職の数が多すぎます。");
            nTeruteru = 0;
            $("#civ_num").text(civNum() + "人");
            $("#role_Teruteru").val(0);
        }
    });


    $("#roleBackBtn").click(function() {
        /* 人数設定に戻る */
        window.location.href = "./pnumber.html";
    });

    /* 決定ボタン */
    $("#roleNextBtn").click(function() {
        /* 役職人数保存 */
        localStorage.setItem(200, civNum()); //市民
        localStorage.setItem(300, nWerewolf); //人狼
        localStorage.setItem(201, nUranai); //占い師
        localStorage.setItem(202, nKishi); //騎士
        localStorage.setItem(203, nReibai); //霊媒師
        localStorage.setItem(204, nKaitou); //怪盗
        localStorage.setItem(205, nNekomata); //猫又
        localStorage.setItem(301, nKyojin); //狂人
        localStorage.setItem(400, nFox); //妖狐
        localStorage.setItem(401, nTeruteru); //吊人

        /* ルール保存 */
        localStorage.setItem(1000, $("#rule_firstdaykill").val()); //初夜殺し
        localStorage.setItem(1001, $("#rule_firstdayuranai").val()); //初夜占い
        localStorage.setItem(1002, $("#rule_guards").val()); //連続ガード
    
        /* 役振り */
        var roles = [];
        for(var i = 0; i < n; i++)
        {
            roles.push(-1);
        }
        /* 市民 */
        for(var i = 0; i < civNum(); i++)
        {
            var a = Math.floor(Math.random()*1027);
            var a2 = a%n;
            while(roles[a2] != -1)
            {
                if(a2+1 >= n)
                {
                    a2 = 0;
                }
                else
                {
                    a2 += 1;
                }
            }
            roles[a2] = 200;
        }
        /* 人狼 */
        for(var i = 0; i < nWerewolf; i++)
        {
            var a = Math.floor(Math.random()*1027);
            var a2 = a%n;
            while(roles[a2] != -1)
            {
                if(a2+1 >= n)
                {
                    a2 = 0;
                }
                else
                {
                    a2 += 1;
                }
            }
            roles[a2] = 300;
        }
        /* 占い師 */
        for(var i = 0; i < nUranai; i++)
        {
            var a = Math.floor(Math.random()*1027);
            var a2 = a%n;
            while(roles[a2] != -1)
            {
                if(a2+1 >= n)
                {
                    a2 = 0;
                }
                else
                {
                    a2 += 1;
                }
            }
            roles[a2] = 201;
        }
        /* 騎士 */
        for(var i = 0; i < nKishi; i++)
        {
            var a = Math.floor(Math.random()*1027);
            var a2 = a%n;
            while(roles[a2] != -1)
            {
                if(a2+1 >= n)
                {
                    a2 = 0;
                }
                else
                {
                    a2 += 1;
                }
            }
            roles[a2] = 202;
        }
        /* 霊媒師 */
        for(var i = 0; i < nReibai; i++)
        {
            var a = Math.floor(Math.random()*1027);
            var a2 = a%n;
            while(roles[a2] != -1)
            {
                if(a2+1 >= n)
                {
                    a2 = 0;
                }
                else
                {
                    a2 += 1;
                }
            }
            roles[a2] = 203;
        }
        /* 怪盗 */
        for(var i = 0; i < nKaitou; i++)
        {
            var a = Math.floor(Math.random()*1027);
            var a2 = a%n;
            while(roles[a2] != -1)
            {
                if(a2+1 >= n)
                {
                    a2 = 0;
                }
                else
                {
                    a2 += 1;
                }
            }
            roles[a2] = 204;
        }
        /* 猫又 */
        for(var i = 0; i < nNekomata; i++)
        {
            var a = Math.floor(Math.random()*1027);
            var a2 = a%n;
            while(roles[a2] != -1)
            {
                if(a2+1 >= n)
                {
                    a2 = 0;
                }
                else
                {
                    a2 += 1;
                }
            }
            roles[a2] = 205;
        }
        /* 狂人 */
        for(var i = 0; i < nKyojin; i++)
        {
            var a = Math.floor(Math.random()*1027);
            var a2 = a%n;
            while(roles[a2] != -1)
            {
                if(a2+1 >= n)
                {
                    a2 = 0;
                }
                else
                {
                    a2 += 1;
                }
            }
            roles[a2] = 301;
        }
        /* 妖狐 */
        for(var i = 0; i < nFox; i++)
        {
            var a = Math.floor(Math.random()*1027);
            var a2 = a%n;
            while(roles[a2] != -1)
            {
                if(a2+1 >= n)
                {
                    a2 = 0;
                }
                else
                {
                    a2 += 1;
                }
            }
            roles[a2] = 400;
        }
        /* 吊人 */
        for(var i = 0; i < nTeruteru; i++)
        {
            var a = Math.floor(Math.random()*1027);
            var a2 = a%n;
            while(roles[a2] != -1)
            {
                if(a2+1 >= n)
                {
                    a2 = 0;
                }
                else
                {
                    a2 += 1;
                }
            }
            roles[a2] = 401;
        }

        //役職保存
        for(var i = 0; i < n; i++)
        {
            localStorage.setItem((100+i+1), roles[i])
        }

        /* その他変数 */
        localStorage.setItem("turn", 1); //日付
        localStorage.setItem("player", 1); //何人目か
        //投票数リセット
        for(var i = 1; i <= n; i++)
            localStorage.setItem(2000+i, 0);

        /* 1日目スタート */
        localStorage.setItem(1202, -1); //騎士守り人
        localStorage.setItem(1204, -1); //怪盗本人
        localStorage.setItem(1205, -1); //怪盗対象
        window.location.href = "./check.html";
    });
});
