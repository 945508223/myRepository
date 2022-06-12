let sqlMap = {
    BAS_INCOME_SORT: "SELECT  FISCAL_YEAR||INCOME_SORT_ID AS ID,INCOME_SORT_CODE AS CODE,INCOME_SORT_NAME AS NAMECN,INCOME_SORT_CODE||'-'||INCOME_SORT_NAME AS NAME,MOF_DIV_CODE,FISCAL_YEAR||PARENT_ID AS PID,case when IS_LEAF=1 then '是' else '否' end  as IS_LEAF,case when IS_ENABLED=1 then '是' else '否' end  as IS_ENABLED ,FUND_TYPE_CODE,FISCAL_YEAR,case when IS_STANDARD=1  then '是' else '否' end  as  IS_STANDARD FROM   BAS_INCOME_SORT WHERE  FISCAL_YEAR= '${V.USER_currentyear,\"\"}' ORDER BY  INCOME_SORT_CODE",
    BAS_EXP_FUNC: "SELECT FISCAL_YEAR || EXP_FUNC_ID AS ID,EXP_FUNC_CODE AS CODE,EXP_FUNC_NAME AS NAMECN, EXP_FUNC_CODE || '-' || EXP_FUNC_NAME  AS NAME,MOF_DIV_CODE,FISCAL_YEAR || PARENT_ID AS PID,case when IS_LEAF = 1 then '是' else '否' end   as IS_LEAF,case when IS_ENABLED = 1 then '是' else '否' end  as IS_ENABLED,FUND_TYPE_CODE,FISCAL_YEAR,case when IS_STANDARD = 1 then '是' else '否' end as IS_STANDARD FROM BAS_EXP_FUNC WHERE FISCAL_YEAR = '${V.USER_currentyear,\"\"}' ORDER BY EXP_FUNC_CODE",
    BAS_DEP_BGT_ECO: "SELECT FISCAL_YEAR || DEP_BGT_ECO_ID AS ID,DEP_BGT_ECO_CODE AS CODE,DEP_BGT_ECO_NAME AS NAMECN, DEP_BGT_ECO_CODE || '-' || DEP_BGT_ECO_NAME  AS NAME,MOF_DIV_CODE,FISCAL_YEAR || PARENT_ID AS PID,case when IS_LEAF = 1 then '是' else '否' end   as IS_LEAF,case when IS_ENABLED = 1 then '是' else '否' end  as IS_ENABLED,FUND_TYPE_CODE,FISCAL_YEAR,case when IS_STANDARD = 1 then '是' else '否' end as IS_STANDARD FROM BAS_DEP_BGT_ECO WHERE FISCAL_YEAR = '${V.USER_currentyear,\"\"}' ORDER BY DEP_BGT_ECO_CODE",
    BAS_GOV_BGT_ECO: "SELECT FISCAL_YEAR || GOV_BGT_ECO_ID AS ID,GOV_BGT_ECO_CODE AS CODE,GOV_BGT_ECO_NAME AS NAMECN, GOV_BGT_ECO_CODE || '-' || GOV_BGT_ECO_NAME  AS NAME,MOF_DIV_CODE,FISCAL_YEAR || PARENT_ID AS PID,case when IS_LEAF = 1 then '是' else '否' end   as IS_LEAF,case when IS_ENABLED = 1 then '是' else '否' end  as IS_ENABLED,FUND_TYPE_CODE,FISCAL_YEAR,case when IS_STANDARD = 1 then '是' else '否' end as IS_STANDARD FROM BAS_GOV_BGT_ECO WHERE FISCAL_YEAR = '${V.USER_currentyear,\"\"}' ORDER BY GOV_BGT_ECO_CODE"
}

function changeSqlByLeftGrid(val) {
    debugger
    //BAS_GOV_BGT_ECO
    let tableName = val.ID;
    let source = $DS.getSource("DS_科目树");
    source.sql = sqlMap[tableName];
    $DS.loadCtrl("TREE_科目树");
    $DS.loadCtrl("GRID_科目明细");
}


function filterGrid(curNode,treeData) {
    debugger
   $DS.getCtrl("GRID_科目明细").info.ds_grid = curNode.children?curNode.children:[];
}