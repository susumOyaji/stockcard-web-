/**
 * フォームの追加
 */
function add_form_element() {
  
    // フォーム内の要素の数
    var formarea = document.querySelector('#form');
    var num = 0;
    if (formarea !== null) {
      num = formarea.childElementCount;
    }
    num++;
    
    // ラベルの作成
    var label = create_label(num);
    
    // 入力欄の作成
    var text_form = create_text_from(num);
    
    // 削除ボタンの作成
    var del_btn = create_delete_btn(num);
    
    // ラベル・入力欄・削除ボタンをdiv要素に追加
    var form_area = document.createElement('div');
    form_area.setAttribute('id', 'form_area_' + num);
    form_area.appendChild(label);
    form_area.appendChild(text_form);
    form_area.appendChild(del_btn);
    
    // フォームに要素を追加
    var form = document.getElementById('form');
    form.appendChild(form_area);
    
    // 削除ボタンの有効無効
    set_delete_btn_disabled();
    
    // 追加ボタンの有効無効
    set_add_btn_disabled();
};
  

/**
 * ラベル
 */
function create_label(num) {
    var label = document.createElement('label');
    var label_txt = document.createTextNode('No' + num);
    label.appendChild(label_txt);
    return label;
}
  

/**
 * 入力欄
 */
function create_text_from(num) {
    var text_form = document.createElement('input');
    text_form.setAttribute('type', 'text');
    text_form.setAttribute('id', 'form_' + num);
    text_form.setAttribute('name', 'form_' + num);
    return text_form;
}
  

/**
 * 削除ボタン
 */
function create_delete_btn(num) {
    var btn = document.createElement('button');
    var btn_txt = document.createTextNode('削除');
    btn.appendChild(btn_txt);
    btn.setAttribute('class', 'del_btn');
    btn.setAttribute('type', 'button');
    btn.setAttribute('onclick', 'delete_form_element("form_area_' + num + '");');
    return btn;
}
  

/**
 * 削除ボタンの有効無効の設定
 */
function set_delete_btn_disabled() {
    var form = document.getElementById('form');
    var buttons = form.getElementsByTagName('button');
    if (buttons.length == 1) {
      buttons[0].disabled = true;
    }
    else {
      for (i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
      }
    }
}
  
/**
 * 追加ボタンの有効無効の設定
 */
function set_add_btn_disabled() {
    var form = document.getElementById('form');
    var buttons = form.getElementsByTagName('button');
    if (buttons.length < 5) {
      document.getElementsByClassName('add-btn')[0].disabled = false;
    }
    else {
      document.getElementsByClassName('add-btn')[0].disabled = true;
    }
}
  
/**
 * フォームの削除
 */
function delete_form_element(name) {
    // 対象フォームの削除
    var elem = document.getElementById(name);
    elem.remove();
    
    // 残っているフォームのラベル・IDの番号の振りなおしと削除ボタンの作り直し
    var forms = document.querySelector('#form').children;
    
    // 連番の振りなおし
    for (i = 0; i < forms.length; i++) {
      // フォームのIDの番号の付け直し
      forms[i].id = 'form_area_' + (i + 1);
      // ラベルの番号の付け直し
      forms[i].children[0].innerText = "No" + (i + 1);
      // 入力欄のIDの番号の付け直し
      forms[i].children[1].id = 'form_' + (i + 1);
      forms[i].children[1].name = 'form_' + (i + 1);
      // 削除ボタンは作り直し
      forms[i].children[2].remove();
      var btn = create_delete_btn(i + 1);
      forms[i].appendChild(btn);
    }
    
    // 削除ボタンの有効無効
    set_delete_btn_disabled();
    
    // 追加ボタンの有効無効
    set_add_btn_disabled();
};
  




window.onload = function () {
    add_form_element();
};
  

