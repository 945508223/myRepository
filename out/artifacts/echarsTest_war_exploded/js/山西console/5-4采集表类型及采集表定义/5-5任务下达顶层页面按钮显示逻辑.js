function isShowBtn_topHuiZong() {
    var topWin = $DS.util.getTopWin("window");
    let pms = topWin.$DS.getPms("allBtn_notShow");
    if (pms && pms == "true") {
        let btnObj = {
            showBtn: ["btn_loadOtherData", "BUTTON_校验"],
            notShowBtn: ["BUTTON_汇总"]
        };
        for (let key in btnObj) {
            for (let btn of btnObj[key]) {
                if($DS.getCtrl(btn)){
                    let btnInfo = $DS.getCtrl(btn).info;
                    btnInfo.ds_show = key == "showBtn" ? true : false;
                    btnInfo.ds_load_success = "";
                }
            }
        }
    }
}
isShowBtn_topHuiZong();


