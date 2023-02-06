/* 人狼殺害投票集計、騎士、猫又処理はここ */
/* ゲーム終了判定1もここ */

$(function() {
    /* 保存情報取得 */
    var n = localStorage.getItem("pnumber") - '0';
    var turn = localStorage.getItem("turn") - '0';

    /* 決定ボタン */
    $("#voteResultNextBtn").click(function() {
        /* その他変数 */
        localStorage.setItem("turn", turn+1); //日付
        localStorage.setItem("player", 1); //何人目か
        //投票数
        for(var i = 1; i <= n; i++)
            localStorage.setItem(2000+i, 0);

        /* 次の日スタート */
        window.location.href = "./check.html";
        
    });

});
