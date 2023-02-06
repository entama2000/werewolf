$(function() {
    var n = localStorage.getItem("pnumber") - '0';
    var kaitou = localStorage.getItem("1204") - '0';
    var kaitoued = localStorage.getItem("1205") - '0';
    var names = [];
    var roles = [];
    var player = localStorage.getItem("player") - '0';
    var win = localStorage.getItem("win") - '0';
    for(var i = 1; i <= n; i++)
    {
        names.push(localStorage.getItem(i));
        roles.push(localStorage.getItem(100+i)-'0')
    }

    /* 勝者表示 */
    if(win == 200)
    {
        $("#showWinner").text("市民チーム");
        $("#showWinner").addClass("showCiv");
    }
    else if(win == 300)
    {
        $("#showWinner").text("人狼チーム");
        $("#showWinner").addClass("showWolf");
    }
    else if(win == 400)
    {
        $("#showWinner").text("妖狐");
        $("#showWinner").addClass("showFox");
    }
    else if(win == 401)
    {
        $("#showWinner").text("吊人");
        $("#showWinner").addClass("showTeruteru");
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
    rolesMap.set(401, "吊人");

    /* 配役表示 */
    var civn=0, wolfn=0, othern=0;
    for(var i = 1; i <= n; i++)
    {
        var roleID = roles[i-1];
        var roleID2 = (roles[i-1]+1000)%1000;
        if(roleID2 >= 200 && roleID2 < 300)
        {
            civn++;
            if(roleID < 0 && i != kaitou && i != kaitoued) 
            {
                roleID += 1000;
                $("#roleShowCiv").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">" + rolesMap.get(roleID) + "(死)</p></div>");
            }
            else if(i != kaitou && i != kaitoued)
            {
                $("#roleShowCiv").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">" + rolesMap.get(roleID) + "</p></div>");
            }
            else if(roleID < 0 && i == kaitou) 
            {
                roleID += 1000;
                $("#roleShowCiv").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">怪盗 → " + rolesMap.get(roleID) + "(死)</p></div>");
            }
            else if(i == kaitou)
            {
                $("#roleShowCiv").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">怪盗 → " + rolesMap.get(roleID) + "</p></div>");
            }
            else if(roleID < 0 && i == kaitoued) 
            {
                roleID += 1000;
                $("#roleShowCiv").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">" + rolesMap.get((roles[kaitou-1]+1000)%1000) + " → " + rolesMap.get(roleID) + "(死)</p></div>");
            }
            else if(i == kaitoued)
            {
                $("#roleShowCiv").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">" + rolesMap.get((roles[kaitou-1]+1000)%1000) + " → "  + rolesMap.get(roleID) + "</p></div>");
            }
        }
        else if(roleID2 >= 300 && roleID2 < 400)
        {
            wolfn++;
            if(roleID < 0 && i != kaitou && i != kaitoued) 
            {
                roleID += 1000;
                $("#roleShowWolf").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">" + rolesMap.get(roleID) + "(死)</p></div>");
            }
            else if(i != kaitou && i != kaitoued)
            {
                $("#roleShowWolf").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">" + rolesMap.get(roleID) + "</p></div>");
            }
            else if(roleID < 0 && i == kaitou) 
            {
                roleID += 1000;
                $("#roleShowWolf").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">怪盗 → " + rolesMap.get(roleID) + "(死)</p></div>");
            }
            else if(i == kaitou)
            {
                $("#roleShowWolf").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">怪盗 → " + rolesMap.get(roleID) + "</p></div>");
            }
            else if(roleID < 0 && i == kaitoued) 
            {
                roleID += 1000;
                $("#roleShowWolf").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">" + rolesMap.get((roles[kaitou-1]+1000)%1000) + " → " + rolesMap.get(roleID) + "(死)</p></div>");
            }
            else if(i == kaitoued)
            {
                $("#roleShowWolf").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">" + rolesMap.get((roles[kaitou-1]+1000)%1000) + " → "  + rolesMap.get(roleID) + "</p></div>");
            }
        }
        else if(roleID2 >= 400 && roleID2 < 500)
        {
            othern++;
            if(roleID < 0 && i != kaitou && i != kaitoued) 
            {
                roleID += 1000;
                $("#roleShow3").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">" + rolesMap.get(roleID) + "(死)</p></div>");
            }
            else if(i != kaitou && i != kaitoued)
            {
                $("#roleShow3").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">" + rolesMap.get(roleID) + "</p></div>");
            }
            else if(roleID < 0 && i == kaitou) 
            {
                roleID += 1000;
                $("#roleShow3").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">怪盗 → " + rolesMap.get(roleID) + "(死)</p></div>");
            }
            else if(i == kaitou)
            {
                $("#roleShow3").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">怪盗 → " + rolesMap.get(roleID) + "</p></div>");
            }
            else if(roleID < 0 && i == kaitoued) 
            {
                roleID += 1000;
                $("#roleShow3").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">" + rolesMap.get((roles[kaitou-1]+1000)%1000) + " → " + rolesMap.get(roleID) + "(死)</p></div>");
            }
            else if(i == kaitoued)
            {
                $("#roleShow3").append("<div class=\"roles\"><p id=\"p" + i + "\">" + names[i-1] + "</p><p class=\"deathp\">" + rolesMap.get((roles[kaitou-1]+1000)%1000) + " → "  + rolesMap.get(roleID) + "</p></div>");
            }
        }
    }
    if(civn == 0)
        $("#titleCiv").addClass("display-none");
    if(wolfn == 0)
        $("#titleWolf").addClass("display-none");
    if(othern == 0)
        $("#title3").addClass("display-none");


    $("#deathNextBtn3").click(function() {
        window.location.href = "./pnumber.html";
    });

});
