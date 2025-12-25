/* プレイヤー名番号 */
/*
pnumber: 人数
1: プレイヤー1
2: プレイヤー2
...
12: プレイヤー12
*/

$(function() {
  /* 名前初期化 */
  var nMax = 12
  var n;
  var names = [];
  for(var i = 0; i < nMax; i++)
  {
    var name = "プレイヤー" + (i+1);
    names.push(name);
  }

  /* プレイ履歴がある場合、ない場合 */
  if(localStorage.getItem("pnumber") != null) {
    n = localStorage.getItem("pnumber") - '0';
    $("#splayers").find("option").eq(n-3).attr("selected", "selected");
    for(var i = 1; i <= n; i++)
    {
      var name = localStorage.getItem(i);
      names[i-1] = name;
    }
    /* 要素追加 */
    $("#addAndRem").before("<h2 id=\"ChangePlayerName\">プレイヤー名変更</h2>");
    for(var i = 1; i <= n; i++)
    {
      var inputValue = (names[i-1] == null) ? "" : names[i-1];
      $("#addAndRem")
        .append($("<input>", { id: "name" + i, type: "text", "class": "textInput" }).val(inputValue))
        .append("<br>");
    }
  }
  else
  {
    n = -1;
  }

  /* 人数の選択 */
  $("#splayers").change(function() {
    /* 追加要素リセット */
    $("#addAndRem").empty();
    $("#ChangePlayerName").remove();

    /* 要素追加 */
    $("#addAndRem").before("<h2 id=\"ChangePlayerName\">プレイヤー名変更</h2>");
    n = $(this).val();
    for(var i = 1; i <= n; i++)
    {
      var inputValue = (names[i-1] == null) ? "" : names[i-1];
      $("#addAndRem")
        .append($("<input>", { id: "name" + i, type: "text", "class": "textInput" }).val(inputValue))
        .append("<br>");
    }
  });

  /* 決定ボタン */
  $("#pnumberNextBtn").click(function() {
    if(n != -1)
    {
      localStorage.setItem("pnumber", n);
      for(var i = 1; i <= n; i++)
      {
        var ids = "#name" + i;
        var value = $(ids).val();
        localStorage.setItem(i, value);
      }
      window.location.href = "./role.html";
    }
    else
    {
      alert("人数を選んでね！")
    }
   
  });

});
