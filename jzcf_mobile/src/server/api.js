/**
 * 封装登录相关的请求及数据处理
 */
import HttpService from "./http.js";

export const Service = {
  api: {
    authorized: "/api/",//首次进入
    login: "/api/login",//登录
    prefill: "/api/report/prefill",//预填信息状态
    queryBaseInfo: "api/report/queryBaseInfo",//查询基本信息
    queryCompany: "api/listCompany",// 查询企业列表
    readyIllness: "api/report/readyIllness",//查看大病医疗
    queryPcaForPlug: "api/common/queryPcaForPlug",//查看全部城市
    saveBaseInfo: "api/report/saveBaseInfo",//保存基本信息
    queryChildList: "api/report/queryChildList",//查询子女信息列表
    saveChild: "api/report/saveChild",//保存子女信息
    queryCountry: "api/common/queryCountry",// 查询国家和地区
    queryChild: "api/report/queryChild",//查看子女信息详情
    delChild: "api/report/delChild",//删除子女
    queryHouseList: "api/report/queryHouseList",//查询租房列表
    saveHouseRent: "api/report/saveHouseRent",//保存租房信息
    queryHouseRent: "api/report/queryHouseRent",//获取租房信息
    delHouseRent: "api/report/delHouseRent",//删除当前租房
    saveHouse: "api/report/saveHouse",//保存住房贷款信息
    queryHouse: "api/report/queryHouse",//查询住房贷款信息
    delHouse: "api/report/delHouse",//清空房贷款信息
    saveSupportBe: "api/report/saveSupportBe",//添加/修改被赡养人信息
    saveSupportTo: "api/report/saveSupportTo",//添加/修改共同赡养人信息
    querySupport: "api/report/querySupport",//查询赡养老人信息
    delAllSupportBe: "api/report/delAllSupportBe",//删除全部被赡养人
    delAllSupportTo: "api/report/delAllSupportTo",//删除全部共同赡养人
    saveSupport: "api/report/saveSupport",//保存赡养基本信息
    querySupportBe: "api/report/querySupportBe",//查询被赡养人信息
    querySupportTo: "api/report/querySupportTo",//查询共同赡养人信息
    delSupportBe: "api/report/delSupportBe",//删除被赡养人信息
    delSupportTo: "api/report/delSupportTo",//删除共同赡养人信息
    queryEducationList: "api/report/queryEducationList",//查询继续教育列表
    saveQualification: "api/report/saveQualification",//保存学历继续教育
    saveOccupation: "api/report/saveOccupation",//保存职业资格继续教育
    queryQualification: "api/report/queryQualification",//查询学历继续教育
    delQualification: "api/report/delQualification",//删除学历继续教育
    queryOccupation: "api/report/queryOccupation",//查询职业资格继续教育
    delOccupation: "api/report/delOccupation",//删除职业资格继续教育
    saveReport: "api/report/saveReport",//呈报
    getHomeInfo: "api/home",//首页信息
    searchBus: "api/searchBus",//查询企业列表
    changeCompany: "api/changeCompany",//选择企业
    applyBus: "api/applyBus",//申请加入
    invoice: "api/invoice",//查询开票信息
    listHisReport: "api/report/listHisReport",//查询呈报记录列表
    listSuccessReport: "api/report/listSuccessReport",//查询呈报成功记录列表
    listFailReport: "api/report/listFailReport",//查询呈报记失败录列表
    report: "api/report/report",//查看单条呈报结果
    setPassword: "api/setPassword",//设置新安全码
    checkPassword: "api/checkPassword",//校验安全码
    queryUserInfo: "api/queryUserInfo",//获取当前用户信息
    queryArticle: "api/queryArticle",//政策解读文章
    queryOccCard: "api/common/queryOccCardName",//查询证书名列表
    saveFeedBack: "api/saveFeedBack",//提交问题反馈
    reportValid: "api/report/reportValid",//校验呈报信息
    reportByPrefill: "api/report/reportByPrefill",//使用预填信息新建呈报项
    readWages: "api/readWages",//查询单月工资
    readWagesByDateArea: "api/readWagesByDateArea",//查询多月工资
	exit:"api/exit",		//安全退出
	sendLoginSms:"api/sendLoginSms"
  },
  authorized(params){
    return HttpService.post(this.api.authorized, params);
  },
  login(params) {
    return HttpService.post(this.api.login, params);
  },
  prefill(params) {
    return HttpService.post(this.api.prefill, params);
  },
  queryBaseInfo(params) {
    return HttpService.post(this.api.queryBaseInfo, params);
  },
  queryCompany(params) {
    return HttpService.post(this.api.queryCompany, params);
  },
  readyIllness(params) {
    return HttpService.post(this.api.readyIllness, params);
  },
  report(params) {
    return HttpService.post(this.api.report, params);
  },
  queryPcaForPlug(params) {
    return HttpService.post(this.api.queryPcaForPlug, params);
  },
  saveBaseInfo(params) {
    return HttpService.post(this.api.saveBaseInfo, params);
  },
  queryChildList(params) {
    return HttpService.post(this.api.queryChildList, params);
  },
  saveChild(params) {
    return HttpService.post(this.api.saveChild, params);
  },
  queryCountry(params) {
    return HttpService.post(this.api.queryCountry, params);
  },
  queryChild(params) {
    return HttpService.post(this.api.queryChild, params);
  },
  delChild(params) {
    return HttpService.post(this.api.delChild, params);
  },
  queryHouseList(params) {
    return HttpService.post(this.api.queryHouseList, params);
  },
  saveHouseRent(params) {
    return HttpService.post(this.api.saveHouseRent, params);
  },
  queryHouseRent(params) {
    return HttpService.post(this.api.queryHouseRent, params);
  },
  delHouseRent(params) {
    return HttpService.post(this.api.delHouseRent, params);
  },
  saveHouse(params) {
    return HttpService.post(this.api.saveHouse, params);
  },
  queryHouse(params){
    return HttpService.post(this.api.queryHouse, params);
  },
  delHouse(params){
    return HttpService.post(this.api.delHouse, params);
  },
  saveSupportBe(params){
    return HttpService.post(this.api.saveSupportBe, params);
  },
  saveSupportTo(params){
    return HttpService.post(this.api.saveSupportTo, params);
  },
  querySupport(params){
    return HttpService.post(this.api.querySupport, params);
  },
  delAllSupportBe(params){
    return HttpService.post(this.api.delAllSupportBe, params);
  },
  delAllSupportTo(params){
    return HttpService.post(this.api.delAllSupportTo, params);
  },
  saveSupport(params){
    return HttpService.post(this.api.saveSupport, params);
  },
  querySupportBe(params){
    return HttpService.post(this.api.querySupportBe, params);
  },
  querySupportTo(params){
    return HttpService.post(this.api.querySupportTo, params);
  },
  delSupportBe(params){
    return HttpService.post(this.api.delSupportBe, params);
  },
  delSupportTo(params){
    return HttpService.post(this.api.delSupportTo, params);
  },
  queryEducationList(params){
    return HttpService.post(this.api.queryEducationList, params);
  },
  saveQualification(params){
    return HttpService.post(this.api.saveQualification, params);
  },
  saveOccupation(params){
    return HttpService.post(this.api.saveOccupation, params);
  },
  queryQualification(params){
    return HttpService.post(this.api.queryQualification, params);
  },
  delQualification(params){
    return HttpService.post(this.api.delQualification, params);
  },
  queryOccupation(params){
    return HttpService.post(this.api.queryOccupation, params);
  },
  delOccupation(params){
    return HttpService.post(this.api.delOccupation, params);
  },
  saveReport(params){
    return HttpService.post(this.api.saveReport, params);
  },
  getHomeInfo(params){
    return HttpService.post(this.api.getHomeInfo, params);
  },
  searchBus(params){
    return HttpService.post(this.api.searchBus, params);
  },
  changeCompany(params){
    return HttpService.post(this.api.changeCompany, params);
  },
  applyBus(params){
    return HttpService.post(this.api.applyBus, params);
  },
  invoice(params){
    return HttpService.post(this.api.invoice, params);
  },
  listHisReport(params){
    return HttpService.post(this.api.listHisReport, params);
  },
  listSuccessReport(params){
    return HttpService.post(this.api.listSuccessReport, params);
  },
  listFailReport(params){
    return HttpService.post(this.api.listFailReport, params);
  },
  setPassword(params){
    return HttpService.post(this.api.setPassword, params);
  },
  queryUserInfo(params){
    return HttpService.post(this.api.queryUserInfo, params);
  },
  checkPassword(params){
    return HttpService.post(this.api.checkPassword, params);
  },
  queryArticle(params){
    return HttpService.post(this.api.queryArticle, params);
  },
  queryOccCard(params){
    return HttpService.post(this.api.queryOccCard, params);
  },
  saveFeedBack(params){
    return HttpService.post(this.api.saveFeedBack, params);
  },
  reportValid(params){
    return HttpService.post(this.api.reportValid, params);
  },
  reportByPrefill(params){
    return HttpService.post(this.api.reportByPrefill, params);
  },
  readWages(params){
    return HttpService.post(this.api.readWages, params);
  },
  readWagesByDateArea(params){
    return HttpService.post(this.api.readWagesByDateArea, params);
  },
  exit(params){
    return HttpService.post(this.api.exit, params);
  },
  sendLoginSms(params){
    return HttpService.post(this.api.sendLoginSms, params);
  },
  
};
