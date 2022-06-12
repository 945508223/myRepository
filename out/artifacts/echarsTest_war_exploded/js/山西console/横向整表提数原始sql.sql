/*表6================================================================================================*/
SELECT A.YEAR||'_'||A.MOF_DIV_CODE||'_'||A.EXP_FUNC_CODE as VKEY,
       A.EXP_FUNC_CODE,
       A.EXP_FUNC_NAME,
       A.LEVEL_NO,
       A.PAYAMT,
       A.BIANDONG_AMT
  FROM PM_V_GOV_PAY2021 A
 WHERE A.MOF_DIV_CODE= '${TASKDIVCODE}'
   AND A.YEAR='${YEAR}'
   AND A.PAYAMT <> 0 ;

/*------------------------------------------------------------------------------------------------------------------------*/
SELECT A.YEAR||'_'||A.MOF_DIV_CODE||'_'||A.EXP_FUNC_CODE as VKEY,
       A.EXP_FUNC_CODE,
       A.EXP_FUNC_NAME,
       A.LEVEL_NO,
       nvl(A.PAYAMT,0)*10000 as PAYAMT,
       nvl(A.BIANDONG_AMT,0)*10000 as BIANDONG_AMT
  FROM PM_V_GOV_PAY2021 A
 WHERE A.MOF_DIV_CODE= '${TASKDIVCODE}'
   AND A.YEAR='${YEAR}'
   AND A.PAYAMT <> 0


/*表19=====================================================================================================*/
SELECT A.YEAR || '_' || A.MOF_DIV_CODE || '_' || A.EXP_FUNC_CODE as VKEY,
       A.EXP_FUNC_CODE,
       A.EXP_FUNC_NAME,
       A.LEVEL_NO,
       A.BMYSSAMT,
       A.YBXZYZFAMT,
       A.ZXZYZFAMT,
       A.DFZFYBZQAPSAMT
FROM PM_V_GOV_YBGGYS_FUNC A
WHERE A.MOF_DIV_CODE = '${TASKDIVCODE}'
  AND A.YEAR = '${YEAR}'
  AND (A.BMYSSAMT <> 0
    OR A.YBXZYZFAMT <> 0
    OR A.ZXZYZFAMT <> 0
    OR A.DFZFYBZQAPSAMT <> 0)
/*-------------------------------------------------------------------------------------------------------------------*/

SELECT A.YEAR || '_' || A.MOF_DIV_CODE || '_' || A.EXP_FUNC_CODE as VKEY,
       A.EXP_FUNC_CODE,
       A.EXP_FUNC_NAME,
       A.LEVEL_NO,
       nvl(A.BMYSSAMT,0)*10000 as BMYSSAMT,
       nvl(A.YBXZYZFAMT,0)*10000 as YBXZYZFAMT,
       nvl(A.ZXZYZFAMT,0)*10000 as ZXZYZFAMT,
       nvl(A.DFZFYBZQAPSAMT,0)*10000 as DFZFYBZQAPSAMT
FROM PM_V_GOV_YBGGYS_FUNC A
WHERE A.MOF_DIV_CODE = '${TASKDIVCODE}'
  AND A.YEAR = '${YEAR}'
  AND (A.BMYSSAMT <> 0
    OR A.YBXZYZFAMT <> 0
    OR A.ZXZYZFAMT <> 0
    OR A.DFZFYBZQAPSAMT <> 0)



/*表21============================================================================================================*/
/*原始*/
SELECT A.YEAR||'_'||A.MOF_DIV_CODE||'_'||A.GOV_BGT_ECO_CODE as VKEY,
       A.GOV_BGT_ECO_CODE,
       A.GOV_BGT_ECO_NAME,
       A.LEVEL_NO,
       SUM(A.BMYSSAMT) as BMYSSAMT,
       SUM(A.YBXZYZFAMT) as YBXZYZFAMT,
       SUM(A.ZXZYZFAMT) as ZXZYZFAMT,
       SUM(A.DFZFYBZQAPSAMT as DFZFYBZQAPSAMT,
       SUM(A.BMYSSAMT +  A.YBXZYZFAMT + A.ZXZYZFAMT + A.DFZFYBZQAPSAMT ) as BGTAMT
  FROM PM_V_GOV_YBGGYSJBYS_ECO A
 WHERE A.MOF_DIV_CODE= '${TASKDIVCODE}'
   AND A.YEAR='${YEAR}'
   AND A.LEVEL_NO<>3
   AND A.PRO_KIND_CODE IN ('1','21')
   AND (A.BMYSSAMT <> 0
   OR A.YBXZYZFAMT <> 0
   OR A.ZXZYZFAMT <> 0
   OR A.DFZFYBZQAPSAMT <> 0 )
  GROUP BY A.YEAR||'_'||A.MOF_DIV_CODE||'_'||A.GOV_BGT_ECO_CODE,GOV_BGT_ECO_CODE,GOV_BGT_ECO_NAME,LEVEL_NO

/*---------------------------------------------------------------------------------------------------------------*/
SELECT A.YEAR||'_'||A.MOF_DIV_CODE||'_'||A.GOV_BGT_ECO_CODE as VKEY,
       A.GOV_BGT_ECO_CODE,
       A.GOV_BGT_ECO_NAME,
       A.LEVEL_NO,
       SUM(A.BMYSSAMT) as BMYSSAMT,
      SUM(A.YBXZYZFAMT) as YBXZYZFAMT,
      SUM(A.ZXZYZFAMT) as ZXZYZFAMT,
      SUM(A.DFZFYBZQAPSAMT) as DFZFYBZQAPSAMT,
     SUM(A.BMYSSAMT +  A.YBXZYZFAMT + A.ZXZYZFAMT + A.DFZFYBZQAPSAMT ) as BGTAMT
  FROM PM_V_GOV_YBGGYSJBYS_ECO A
 WHERE A.MOF_DIV_CODE= '${TASKDIVCODE}'
   AND A.YEAR='${YEAR}'
   AND A.LEVEL_NO<>3
   AND A.PRO_KIND_CODE IN ('1','21')
   AND (A.BMYSSAMT <> 0
   OR A.YBXZYZFAMT <> 0
   OR A.ZXZYZFAMT <> 0
   OR A.DFZFYBZQAPSAMT <> 0 )
  GROUP BY A.YEAR||'_'||A.MOF_DIV_CODE||'_'||A.GOV_BGT_ECO_CODE,GOV_BGT_ECO_CODE,GOV_BGT_ECO_NAME,LEVEL_NO


/*表23====================================================================================================*/
SELECT LEVEL_NO,VKEY,MOF_DIV_CODE,PRO_CODE,PRO_NAME,BGTAMT,TQXD  FROM (
SELECT A.LEVEL_NO,
       A.YEAR,
       A.MOF_DIV_CODE,
       A.YEAR||'_'||A.MOF_DIV_CODE||'_'||A.EXP_FUNC_CODE as VKEY,
       A.PRO_CODE,
       A.PRO_NAME,
       sum(A.BGTAMT)+SUM(TQXD) AS BGTAMT,
       sum(A.TQXD) AS TQXD
  FROM PM_V_BGT_TRA A
  WHERE LEVEL_NO='1'
  group by A.LEVEL_NO,
       A.YEAR,
       A.MOF_DIV_CODE,
       A.EXP_FUNC_CODE,
       A.PRO_CODE,
       A.PRO_NAME
  UNION ALL
  SELECT A.LEVEL_NO,
       A.YEAR,
       A.MOF_DIV_CODE,
       A.YEAR||'_'||A.MOF_DIV_CODE||'_'||A.EXP_FUNC_CODE||'_'||A.PRO_CODE as VKEY,
       A.PRO_CODE,
       A.PRO_NAME,
      sum(A.BGTAMT)+SUM(TQXD) AS BGTAMT,
      SUM(A.TQXD) AS TQXD
  FROM PM_V_BGT_TRA A
  WHERE LEVEL_NO='2'
  GROUP BY A.LEVEL_NO,
       A.YEAR,
       A.MOF_DIV_CODE,
       A.EXP_FUNC_CODE,
       A.PRO_CODE,
       A.PRO_NAME
  )
 WHERE MOF_DIV_CODE= '${ADMDIVCODE}'
   AND YEAR='${YEAR}'

   /*测试环境------------------------------------*/
   SELECT LEVEL_NO,VKEY,MOF_DIV_CODE,PRO_CODE,PRO_NAME,BGTAMT,TQXD  FROM (
SELECT A.LEVEL_NO,
       A.YEAR,
       A.MOF_DIV_CODE,
       A.YEAR||'_'||A.MOF_DIV_CODE||'_'||A.EXP_FUNC_CODE as VKEY,
       A.PRO_CODE,
       A.PRO_NAME,
       NVL(sum(A.BGTAMT)+SUM(TQXD),0) AS BGTAMT,
       NVL(sum(A.TQXD),0) AS TQXD
  FROM PM_V_BGT_TRA A
  WHERE LEVEL_NO='1'
  group by A.LEVEL_NO,
       A.YEAR,
       A.MOF_DIV_CODE,
       A.EXP_FUNC_CODE,
       A.PRO_CODE,
       A.PRO_NAME
  UNION ALL
  SELECT A.LEVEL_NO,
       A.YEAR,
       A.MOF_DIV_CODE,
       A.YEAR||'_'||A.MOF_DIV_CODE||'_'||A.EXP_FUNC_CODE||'_'||A.PRO_CODE as VKEY,
       A.PRO_CODE,
       A.PRO_NAME,
        NVL(sum(A.BGTAMT)+SUM(TQXD),0) AS BGTAMT,
       NVL(SUM(A.TQXD),0) AS TQXD
  FROM PM_V_BGT_TRA A
  WHERE LEVEL_NO='2'
  GROUP BY A.LEVEL_NO,
       A.YEAR,
       A.MOF_DIV_CODE,
       A.EXP_FUNC_CODE,
       A.PRO_CODE,
       A.PRO_NAME
  )
 WHERE MOF_DIV_CODE= '${ADMDIVCODE}'
   AND YEAR='${YEAR}'
/*--------------------------------------------------------------------------------------*/
SELECT LEVEL_NO,VKEY,MOF_DIV_CODE,PRO_CODE,PRO_NAME,BGTAMT,TQXD  FROM (
SELECT A.LEVEL_NO,
       A.YEAR,
       A.MOF_DIV_CODE,
       A.YEAR||'_'||A.MOF_DIV_CODE||'_'||A.EXP_FUNC_CODE as VKEY,
       A.PRO_CODE,
       A.PRO_NAME,
       NVL(sum(A.BGTAMT)+SUM(TQXD),0) AS BGTAMT,
       NVL(sum(A.TQXD),0) AS TQXD
  FROM PM_V_BGT_TRA A
  WHERE LEVEL_NO='1'
  group by A.LEVEL_NO,
       A.YEAR,
       A.MOF_DIV_CODE,
       A.EXP_FUNC_CODE,
       A.PRO_CODE,
       A.PRO_NAME
  UNION ALL
  SELECT A.LEVEL_NO,
       A.YEAR,
       A.MOF_DIV_CODE,
       A.YEAR||'_'||A.MOF_DIV_CODE||'_'||A.EXP_FUNC_CODE||'_'||A.PRO_CODE as VKEY,
       A.PRO_CODE,
       A.PRO_NAME,
        NVL(sum(A.BGTAMT)+SUM(TQXD),0) AS BGTAMT,
       NVL(SUM(A.TQXD),0) AS TQXD
  FROM PM_V_BGT_TRA A
  WHERE LEVEL_NO='2'
  GROUP BY A.LEVEL_NO,
       A.YEAR,
       A.MOF_DIV_CODE,
       A.EXP_FUNC_CODE,
       A.PRO_CODE,
       A.PRO_NAME
  )
 WHERE MOF_DIV_CODE= '${ADMDIVCODE}'
   AND YEAR='${YEAR}'


/*表26=================================================================================*/
  SELECT A.YEAR||'_'||A.MOF_DIV_CODE||'_'||A.EXP_FUNC_CODE as VKEY,
       A.EXP_FUNC_CODE,
       A.EXP_FUNC_NAME,
       A.LEVEL_NO,
       NVL(A.BMYSSAMT+A.YBXZYZFAMT+A.ZXZYZFAMT,0) AS BMYSSAMT1,
       A.BMYSSAMT,
       A.YBXZYZFAMT,
       A.ZXZYZFAMT,
       A.DFZFYBZQAPSAMT
  FROM PM_V_GOV_ZFXJJ_FUNC A
 WHERE A.MOF_DIV_CODE= '${TASKDIVCODE}'
   AND A.YEAR='${YEAR}'
   AND ( A.BMYSSAMT <> 0
   OR A.YBXZYZFAMT <> 0
   OR A.ZXZYZFAMT <> 0
   OR A.DFZFYBZQAPSAMT <> 0 )

   /*------------------------------------------------------------------------*/
SELECT A.YEAR||'_'||A.MOF_DIV_CODE||'_'||A.EXP_FUNC_CODE as VKEY,
       A.EXP_FUNC_CODE,
       A.EXP_FUNC_NAME,
       A.LEVEL_NO,
       NVL(A.BMYSSAMT+A.YBXZYZFAMT+A.ZXZYZFAMT,0)*10000 AS BMYSSAMT1,
       NVL(A.YBXZYZFAMT,0)*10000 AS YBXZYZFAMT,
       NVL(A.ZXZYZFAMT,0)*10000 AS ZXZYZFAMT,
       NVL(A.DFZFYBZQAPSAMT,0)*10000 AS DFZFYBZQAPSAMT
  FROM PM_V_GOV_ZFXJJ_FUNC A
 WHERE A.MOF_DIV_CODE= '${TASKDIVCODE}'
   AND A.YEAR='${YEAR}'
   AND ( A.BMYSSAMT <> 0
   OR A.YBXZYZFAMT <> 0
   OR A.ZXZYZFAMT <> 0
   OR A.DFZFYBZQAPSAMT <> 0 )
/*表28========================================================================*/
SELECT A.YEAR,
       A.VKEY,
       A.LEVEL_NO,
       A.MOF_DIV_CODE,
       A.EXP_FUNC_CODE,
       A.EXP_FUNC_NAME,
       NVL(A.BGTAMT,0)*10000 AS BGTAMT,
       NVL(A.DXZYZFAMT,0)*10000 AS DXZYZFAMT
  FROM PM_V_GOV_ZFXJJ_TRA A
 WHERE A.BGTAMT<>0  OR A.DXZYZFAMT <> 0
   AND A.MOF_DIV_CODE= '${ADMDIVCODE}'
   AND A.YEAR='${YEAR}'

   /*------------------------------------------------------*/
   SELECT A.YEAR,
       A.VKEY,
       A.LEVEL_NO,
       A.MOF_DIV_CODE,
       A.EXP_FUNC_CODE,
       A.EXP_FUNC_NAME,
       A.BGTAMT,
       A.DXZYZFAMT
  FROM PM_V_GOV_ZFXJJ_TRA A
 WHERE A.BGTAMT<>0  OR A.DXZYZFAMT <> 0
   AND A.MOF_DIV_CODE= '${ADMDIVCODE}'
   AND A.YEAR='${YEAR}'