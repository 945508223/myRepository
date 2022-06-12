//保存模板
function addSourceModel(row){
     debugger
     let sql = `select count(*) AS CNT from SSO_T_DATARESOURCEMODEL where ITEMCODE='${row.ITEMCODE}' AND SOURCETYPE='R'`;
     let cnt = $DS.selectBySql('PORTAL',sql);
     if(cnt.isError){
          console.error(cnt.errMsg?cnt.errMsg:'查询模板失败');
          return false;
     }
     if(cnt.result[0].CNT==0){
          let newModel = {
               YEAR:$DS.getPms('USER_currentyear'),
               ITEMCODE:row.ITEMCODE,
               ITEMNAME:row.ITEMNAME,
               SOURCETYPE:'R'
          }

          let res = $DS.saveTable('PORTAL','add',newModel,'SSO_T_DATARESOURCEMODEL','GUID');
          if(res.isError){
               console.error(res.errMsg?res.errMsg:'新增资源模板失败')
          }
     }
}

function checkData(){
     debugger
     let info = $DS.getCtrl('GRID_资源模板').info;
     $grid.setEditRows(info.ds_id);
     let year = $DS.getPms('USER_currentyear');
     for(let key in info.ds_editAllRows){
          if(key=='deleted') continue;
          for(let row of info.ds_editAllRows[key]){
               if(!row.YEAR) row.YEAR=year
          }
     }
}
