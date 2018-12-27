var userAgent = navigator.userAgent.toLowerCase();
if (userAgent.indexOf(' electron/') > -1) {
  var btClose = document.createElement("input",);

  btClose.setAttribute("type", "button");
  btClose.setAttribute("value", "종료");
  btClose.addEventListener("click", close);
  document.body.appendChild(btClose);
}

/*
document.getElementById("bt_create").addEventListener("click", () => {
  var data = JSON.stringify({
    "text": "work"
  }, null, 4);

  download(data, 'newText.json', 'application/json');
});*/

function submitAction() {
  var inputs = document.forms['editor'].getElementsByTagName("input");

  for (var i = 0;i < inputs.length;i++) {
    console.log(inputs[i]);
    console.log(inputs[i].name);
    console.log(inputs[i].value);
  }
  return false;
}

function download(data, filename, type) {
  var file = new Blob([data], {type: type});
  if (window.navigator.msSaveOrOpenBlob) // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
    var a = document.createElement("a");
    var url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);  
    }, 0); 
  }
}

let textElement = document.getElementsByTagName('p')[0];
let inputTextElement = document.getElementById('input_text');
let mediaData = {};

function getParameterByName(name, url, callback) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
    var result = decodeURIComponent(results[2].replace(/\+/g, " "));
  if (callback != null)
    callback(result);
  return result;
}

function loadJSON(media, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', media, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

getParameterByName('media', media => {loadJSON(media, data => {
  mediaData = JSON.parse(data);

  textElement.innerText = mediaData.text;
  if (mediaData.hasOwnProperty('style')) {
    for (const [key, val] of Object.entries(mediaData.style)) {
      textElement.style[key] = val;
    }
  }
})});

if (getParameterByName('player') === null) {
  document.getElementById("editor").hidden = false;
  document.getElementById("back").style['backgroundColor'] = 'black';
  document.getElementById("scroll-direction").onchange = (event) => {
    textElement.style.animation = event.target.value + ' 10s linear infinite';
  };
  inputTextElement.addEventListener('input', inputTextChange);
  inputTextElement.addEventListener('propertychange', inputTextChange);

  let colorPicker = document.getElementById("color-picker");
  colorPicker.addEventListener("input", (event) => {
    textElement.style.color = event.target.value;
  })
}

function inputTextChange(event) {
  textElement.innerHTML = event.target.value;
}