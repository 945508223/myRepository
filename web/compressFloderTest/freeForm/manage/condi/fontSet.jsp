<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" href="../../../static/layui2.4.2/css/layui.css" />
<link rel="stylesheet" type="text/css" href="../../../static/pubcss/common.css">
<script language="javascript" src="../../../static/pubjs/common.js"></script>
<script type="text/javascript" src="../../../static/jquery/jquery-1.10.2.min.js"></script>
<%--<script type="text/javascript" src="../../../static/wangEditor/release/wangEditor.js"></script>--%>
<script src="../../../static/jquery-plugin/Picker/colpick.js"></script>
<link rel="stylesheet" href="../../../static/jquery-plugin/Picker/colpick.css" type="text/css" />
<script type="text/javascript" src="fontSet.js"></script>
<script type="text/javascript">
	var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
</script>
<style>
#textInput {
	width: 800px;
	height: 800px;
	margin: 10px auto;
	display: block;
}

html{
	font-size: 12px;
	height: calc(100%);
}
.colpick{
    top: 102px !important;
}
</style>
</head>
<body style="margin : 15px;">
	<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;" width="480px">
		<legend style="font-size: 13px; font-color: black; margin: 5px;">样式</legend>
		<table class="controls" width="480px">
			<tr>
				<td>字体(F):</td>
				<td>字形(O):</td>
				<td>字号(S):</td>
			</tr>
			<tr>
				<td>
					<select size=7 id="fontSel" class="font_family" name="font" onchange="setFontFamily(this.value)" style="visibility: visible;width:120px;">
						<option value="courier, &quot;courier new&quot;, monospace">Courier</option>
						<option value="georgia, serif">Georgia</option>
						<option value="&quot;palatino linotype&quot;, palatino, serif">Palatino</option>
						<option value="&quot;times new roman&quot;, times, serif">Times New Roman</option>
						<option value="arial, sans-serif">Arial</option>
						<option value="helvetica, sans-serif">Helvetica</option>
						<option value="&quot;lucida sans unicode&quot;, &quot;lucida grande&quot;, sans-serif">Lucida Sans</option>
						<option value="&quot;Tahoma&quot;, &quot;Geneva&quot;, sans-serif">Tahoma</option>
						<option value="&quot;trebuchet MS&quot;, sans-serif">Trebuchet MS</option>
						<option value="Verdana, Arial, sans-serif">Verdana</option>
						<option value="楷体, sans-serif">楷体</option>
						<option value="仿宋体, sans-serif">仿宋体</option>
						<option value="宋体, sans-serif" >宋体</option>
						<option value="黑体, sans-serif" >黑体</option>
						<option value="微软雅黑, sans-serif" >微软雅黑</option>
					</select>
				</td>
				<td>
					<select size=7 id="fontType" class="font_Type" name="fontType" onchange="setfontType(this.value)" style="visibility: visible;width:120px;">
						<option value="">常规</option>
						<option value="italic">斜体</option>
						<option value="bold">粗体</option>
						<option value="bold italic">加粗倾斜</option>
					</select>
				</td>
				<td>
					<select size=7 id="fontSize" type="text" name="font_size" value="12" onchange="setFontSize(this.value)" style="visibility: visible;width:120px;">
						<option value="12">6</option>
						<option value="13">7</option>
						<option value="14">8</option>
						<option value="15">9</option>
						<option value="16">10</option>
						<option value="17">11</option>
						<option value="18">12</option>
						<option value="19">13</option>
						<option value="20">14</option>
						<option value="21">15</option>
						<option value="22">16</option>
						<option value="23">17</option>
						<option value="24">18</option>
						<option value="26">20</option>
						<option value="29">22</option>
						<option value="32">24</option>
						<option value="35">26</option>
						<option value="36">27</option>
						<option value="37">28</option>
						<option value="38">29</option>
						<option value="40">30</option>
						<option value="42">32</option>
						<option value="45">34</option>
						<option value="48">36</option>
						<option value="56">42</option>
						<option value="72">54</option>
						<option value="84">64</option>
						<option value="96">72号</option>
					</select>
				</td>
			</tr>
	</table>
	</fieldset>
	<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
	  <legend style="font-size: 13px; font-color: black;margin: 5px;">效果</legend>
	<table class="controls" width="480px">
			<tr>
				<td>字体颜色(C):</td>
				<td>线形效果:</td>
				<td>字母效果:</td>
			</tr>
			<tr>
				<td>
					<input class="hexValue" name="ColorChooser" id="ColorChooser" onchange="setColorInput(this.value)" maxlength="7"  size=15>
				</td>
				<td>
					<input type="radio" id="line" name="line" value="underline" onclick="uline(this.value)">下划线</input><br/>
					<input type="radio" id="line" name="line" value="line-through" onclick="sthrough(this.value)">删除线</input>
				</td>
				<!-- <input type="image" id="left" name="left" src="../../static/fontSet/image/left_a.gif" onclick="left()">
					<input type="image" id="center" name="center" src="../../static/fontSet/image/center.gif" onclick="center()">
					<input type="image" id="right" name="right" src="../../static/fontSet/image/right.gif" onclick="right()">
					<input type="image" id="justify" name="justify" src="../../static/fontSet/image/justify.gif" onclick="justify()"> -->
				<td>
					<input type="radio" id="allcaps" name="allcaps" value = "allcaps"   onclick="allcaps(this.value)">全部大写字母</input><br/>
					<input type="radio" id="allcaps" name="allcaps" value=" 	" onclick="smallcaps(this.value)">小型大写字母</input>
				</td>
			</tr>
		</table>
	</fieldset>
	<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
	  <legend style="font-size: 13px; font-color: black;margin: 5px;">间距</legend>
		<table class="controls" width="480px">
			<tr>
						<td class="letterSpacing">
								字符间距:<input name="letterSpacingValue" id="letterSpacingValue" type="text" size="3" onchange="changeLetterSpacing()" value="1">
						</td>
						<td class="wordSpacing">
								单词间距:<input name="wordSpacingValue" id="wordSpacingValue" type="text" size="3" onchange="changeWordSpacing()" value="1">
						</td>
						<!-- <td class="lineSpacing">
								行间距:<input name="lineSpacingValue" id="lineSpacingValue" type="text" size="3" onchange="changeLineSpacing()" value="1">
						</td> -->
			</tr>
		</table>
	</fieldset>
	<div class="ycdpw-footer-main" style="position: absolute;bottom: 0;left: 0;width: 100%;">
		<div class="ycdpw-footer-content">
			<!-- <button class="ycdpw-footer-button" onclick="saveCatDir()"><i style="margin-top:2px;" class="ycd-icon-ok"></i>确定</button> -->
			<button class="ycdpw-footer-button" onclick="close_()"><i style="margin-top:2px;" class="ycd-icon-cancel"></i>关闭</button>
		</div>
	</div>
</body>
</html>