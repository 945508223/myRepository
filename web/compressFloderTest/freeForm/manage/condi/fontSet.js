$(function(){var e=parent.activeElement[0].style;console.info(parent.activeElement.css("letterSpacing"));console.info(parent.activeElement.css("lineHeight"));console.info(parent.activeElement.css("wordSpacing"));console.info(parent.activeElement.css("color"));console.info(parent.activeElement.css("fontFamily"));console.info(parent.activeElement.css("fontSize"));console.info(parent.activeElement.css("fontStyle"));console.info(parent.activeElement.css("fontVariant"));console.info(parent.activeElement.css("fontWeight"));console.info(parent.activeElement.css("textDecoration"));console.info(parent.activeElement.css("textTransform"));var t=parent.activeElement.css("letterSpacing");var n=parent.activeElement.css("wordSpacing");var i=parent.activeElement.css("color");var a=parent.activeElement.css("fontFamily");var o=parent.activeElement.css("fontSize");var l=parent.activeElement.css("fontStyle");var r=parent.activeElement.css("fontVariant");var c=parent.activeElement.css("fontWeight");var s=parent.activeElement.css("textDecoration");var f=parent.activeElement.css("textTransform");if(o==undefined||o=="none"||o==""){$("#fontSize")[0].value=0}else{$("#fontSize")[0].value=o.replace("px","")}if(t==undefined||t=="none"||t==""){$("#letterSpacingValue")[0].value=0}else{$("#letterSpacingValue")[0].value=t.replace("px","")}if(n==undefined||n=="none"||n==""){$("#wordSpacingValue")[0].value=0}else{$("#wordSpacingValue")[0].value=n.replace("px","")}document.getElementById("ColorChooser").style.backgroundColor=i;$("#fontSel")[0].value=a;if(l.indexOf("italic")!=-1&&(c.indexOf("bold")!=-1||c>400)){$("#fontType")[0].value="bold italic"}else if(l.indexOf("italic")!=-1){$("#fontType")[0].value="italic"}else if(c.indexOf("bold")!=-1||c>400){$("#fontType")[0].value="bold"}else{$("#fontType")[0].value=""}if(r=="small-caps"){var m=document.getElementsByName("allcaps");m[1].checked=true}if(f=="uppercase"){var m=document.getElementsByName("allcaps");m[0].checked=true}if(s.indexOf("underline")!=-1){var m=document.getElementsByName("line");m[0].checked=true}if(s.indexOf("line-through")!=-1){var m=document.getElementsByName("line");m[1].checked=true}colpick()});function rgb2hex(e){e=e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);function t(e){return("0"+parseInt(e).toString(16)).slice(-2)}return"#"+t(e[1])+t(e[2])+t(e[3])}function colpick(){$("#ColorChooser").colpick({submitText:"确定",layout:"rgbhex",onSubmit:function(e,t,n){var i="rgb("+n.r+","+n.g+","+n.b+")";var a=$(this)[0].el.id.substr(3);var o=rgb2hex(i);$(this)[0].el.value=o;setColorInput(o);$("#ColorChooser").colpickHide()}})}function load(){initCSS();checkVersion()}function checkVersion(){var e=BrowserDetect.browser;var t=BrowserDetect.version;switch(e){case"Explorer":if(t<7)noSupport("Internet Explorer "+t);break;case"Safari":if(t<500)noSupport("Safari build "+t)}}function delSelects(){var e=document.getElementById("fontSel");e.parentElement.removeChild(e);e=document.getElementById("measure");e.parentElement.removeChild(e);e=document.getElementById("color");e.parentElement.removeChild(e)}function setFontFamily(e){parent.activeElement[0].style.fontFamily=e;setCSS()}function setFontSize(e){parent.activeElement[0].style.fontSize=e+"px";setCSS()}function bold(){var e=parent.activeElement[0];var t=document.getElementById("bold");if(t.src.match("bold.gif")){t.src="../../static/fontSet/image/bold_a.gif";e.style.fontWeight+="bold"}else{t.src="../../static/fontSet/image/bold.gif";e.style.fontWeight=e.style.fontWeight.replace("bold","")}setCSS()}function italic(){var e=parent.activeElement[0];var t=document.getElementById("italic");if(t.src.match("italic.gif")){t.src="../../static/fontSet/image/italic_a.gif";e.style.fontStyle+="italic"}else{t.src="../../static/fontSet/image/italic.gif";e.style.fontStyle=e.style.fontStyle.replace("italic","")}setCSS()}function setfontType(e){var t=parent.activeElement[0];if(e==undefined||e==""){t.style.fontStyle=t.style.fontStyle.replace("italic","");t.style.fontWeight=t.style.fontWeight.replace("bold","")}else if(e=="italic"){t.style.fontWeight=t.style.fontWeight.replace("bold","");t.style.fontStyle+="italic"}else if(e=="bold"){t.style.fontStyle=t.style.fontStyle.replace("italic","");t.style.fontWeight+="bold"}else if(e=="bold italic"){t.style.fontStyle+="italic";t.style.fontStyle+="italic"}setCSS()}function uline(e){var t=parent.activeElement[0];if(t.style.textDecoration!=e){t.style.textDecoration="underline"}else{t.style.textDecoration="";var n=document.getElementsByName("line");for(var i=0;i<n.length;i++){n[i].checked=false}}setCSS()}function sthrough(e){var t=parent.activeElement[0];if(t.style.textDecoration!=e){t.style.textDecoration="line-through"}else{t.style.textDecoration="";var n=document.getElementsByName("line");for(var i=0;i<n.length;i++){n[i].checked=false}}setCSS()}function allcaps(e){var t=parent.activeElement[0];if(t.style.textTransform=="uppercase"){t.style.fontVariant="";t.style.textTransform="";var n=document.getElementsByName("allcaps");for(var i=0;i<n.length;i++){n[i].checked=false}}else{t.style.textTransform="uppercase";t.style.fontVariant=""}setCSS()}function smallcaps(e){var t=parent.activeElement[0];if(t.style.fontVariant=="small-caps"){t.style.fontVariant="";t.style.textTransform="";var n=document.getElementsByName("allcaps");for(var i=0;i<n.length;i++){n[i].checked=false}}else{t.style.fontVariant="small-caps";t.style.textTransform=""}setCSS()}function left(){var e=parent.activeElement[0];var t=document.getElementById("left");if(t.src.match("left.gif")){t.src="../../static/fontSet/image/left_a.gif";e.style.textAlign="left";document.getElementById("right").src="../../static/fontSet/image/right.gif";document.getElementById("justify").src="../../static/fontSet/image/justify.gif";document.getElementById("center").src="../../static/fontSet/image/center.gif"}setCSS()}function center(){var e=parent.activeElement[0];var t=document.getElementById("center");if(t.src.match("center.gif")){t.src="../../static/fontSet/image/center_a.gif";e.style.textAlign="center";document.getElementById("left").src="../../static/fontSet/image/left.gif";document.getElementById("right").src="../../static/fontSet/image/right.gif";document.getElementById("justify").src="../../static/fontSet/image/justify.gif"}setCSS()}function right(){var e=parent.activeElement[0];var t=document.getElementById("right");if(t.src.match("right.gif")){t.src="../../static/fontSet/image/right_a.gif";e.style.textAlign="right";document.getElementById("left").src="../../static/fontSet/image/left.gif";document.getElementById("justify").src="../../static/fontSet/image/justify.gif";document.getElementById("center").src="../../static/fontSet/image/center.gif"}setCSS()}function justify(){var e=parent.activeElement[0];var t=document.getElementById("justify");if(t.src.match("justify.gif")){t.src="../../static/fontSet/image/justify_a.gif";e.style.textAlign="justify";document.getElementById("left").src="../../static/fontSet/image/left.gif";document.getElementById("right").src="../../static/fontSet/image/right.gif";document.getElementById("center").src="../../static/fontSet/image/center.gif"}setCSS()}function changeLineSpacing(){var e=document.getElementById("lineSpacingValue").value;var t=parent.activeElement[0];t.style.lineHeight=e;setCSS()}function changeLetterSpacing(){var e=document.getElementById("letterSpacingValue").value;var t=parent.activeElement[0];t.style.letterSpacing=e+"px";setCSS()}function changeWordSpacing(){var e=document.getElementById("wordSpacingValue").value;var t=parent.activeElement[0];t.style.wordSpacing=e+"px";setCSS()}function setColorInput(e){document.getElementById("ColorChooser").style.backgroundColor=e;parent.activeElement[0].style.color=e}function setCSS(){var e=parent.activeElement[0].style;var t="";if(e.fontFamily)t+="font-family: "+e.fontFamily+";\n";if(e.color&&RGB2Color(e.color)!="#000000")t+="color: "+RGB2Color(e.color)+";\n";if(e.backgroundColor&&RGB2Color(e.backgroundColor)!="#FFFFFF")t+="background-color: "+RGB2Color(e.backgroundColor)+";\n";if(e.fontSize)t+="font-size: "+e.fontSize+";\n";if(e.fontWeight)t+="font-weight: "+e.fontWeight+";\n";if(e.fontStyle)t+="font-style: "+e.fontStyle+";\n";if(e.textDecoration)t+="text-decoration: "+e.textDecoration+";\n";if(e.textTransform)t+="text-transform: "+e.textTransform+";\n";if(e.fontVariant)t+="font-variant: "+e.fontVariant+";\n";if(e.textAlign&&e.textAlign!="left")t+="text-align: "+e.textAlign+";\n";if(e.letterSpacing&&e.letterSpacing!="1pt")t+="letter-spacing: "+e.letterSpacing+";\n";if(e.wordSpacing&&e.wordSpacing!="1pt")t+="word-spacing: "+e.wordSpacing+";\n";if(e.lineHeight&&e.lineHeight!=1)t+="line-height: "+e.lineHeight+";\n";parent.isChanged=1}function initCSS(){var e=parent.activeElement[0].style;e.fontFamily="verdana, sans-serif";e.fontSize="12px"}function loseFocus(){var e=parent.activeElement[0];matchDivLoc()}function gainFocus(){var e=parent.activeElement[0];if(e.value=="Paste the text you want to modify here."){}matchTALoc();e.focus()}function copyTextToDiv(){var e=parent.activeElement[0];var t=e.value.replace(/\n/g,"<br/>");var n=t.match(/\s{2,}/g);var i=new Array;for(var a=0;n&&a<n.length;a++){i[a]=n[a].replace(/\s/g,"&nbsp;");t=t.replace(n[a],i[a])}}function matchDivLoc(){var e=parent.activeElement[0];div.scrollTop=e.scrollTop}function matchTALoc(){var e=parent.activeElement[0];e.scrollTop=div.scrollTop}function byte2Hex(e){var t="0123456789ABCDEF";return String(t.substr(e>>4&15,1))+t.substr(e&15,1)}function RGB2Color(e){if(!e)return"000000";if(!e.match("rgb"))return e;var t=e.match(/\d+/g);return"#"+byte2Hex(t[0])+byte2Hex(t[1])+byte2Hex(t[2])}function noSupport(e){var t=document.getElementById("content");t.parentElement.removeChild(t);document.getElementById("browserNoSupport").style.visibility="visible";var n=document.getElementById("noSupportMsg");n.innerHTML="CSSTypeSET does not support "+e+" at this time, but we plan to add support soon.<br />"+"For now check out one of these supported browsers! <br />"+'<a href="http://www.apple.com/safari/">Safari</a><br />'+'<a href="http://www.getfirefox.com">Firefox</a><br />'+'<a href="http://www.opera.com/download/">Opera</a><br />'+'<a href="http://www.microsoft.com/windows/products/winfamily/ie/default.mspx">Internet Explorer 7</a>';n.style.visibility="visible"}