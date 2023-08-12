$(function() {
    var player = localStorage.getItem("player") - '0';
    var playerName = localStorage.getItem(player);
    $("#yourName").text(playerName);

    var n = localStorage.getItem("pnumber") - '0';
    var roles = [];
    var player = localStorage.getItem("player") - '0';
    for(var i = 1; i <= n; i++) roles.push(localStorage.getItem(100+i)-'0');
    //死んでいた場合の処理
    if(roles[player-1] < 0 && player < n)
    {
        localStorage.setItem("player", player+1);
        window.location.href = "./checkVote.html";
    }
    else if(roles[player-1] < 0 && player == n)
    {
        localStorage.setItem("player", 1);
        window.location.href = "./voteResult.html";
    }

    /* 決定ボタン */
    $("#checkNextBtn").click(function() {
        //リロード対策
        localStorage.setItem("killedn", -1);
        localStorage.setItem("killedNeko", -1);
        /* プレイヤー投票へ */
        window.location.href = "./vote.html";
    
    });

});
