import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export class SqlmapTaskListResponse {
  success: boolean;
  tasks: Map<string, string>;
}

export class SqlmapOption {
  crawlDepth: any;
  osShell: boolean;
  getUsers: false;
  getPasswordHashes: false;
  excludeSysDbs: false;
  ignoreTimeouts: false;
  regData: null;
  prefix: null;
  code: null;
  googlePage: 1;
  skip: null;
  query: null;
  randomAgent: false;
  osPwn: false;
  authType: null;
  safeUrl: null;
  requestFile: null;
  predictOutput: false;
  wizard: false;
  stopFail: false;
  forms: false;
  uChar: null;
  secondReq: null;
  taskid: "ac26029ece7a2a3e";
  pivotColumn: null;
  dropSetCookie: false;
  smart: false;
  paramExclude: null;
  risk: 1;
  sqlFile: null;
  rParam: null;
  getCurrentUser: false;
  notString: null;
  getRoles: false;
  getPrivileges: false;
  testParameter: null;
  tbl: null;
  charset: null;
  trafficFile: null;
  osSmb: false;
  level: 1;
  dnsDomain: null;
  skipStatic: false;
  outputDir: null;
  encoding: null;
  skipWaf: false;
  timeout: 30;
  firstChar: null;
  torPort: null;
  getComments: false;
  binaryFields: null;
  checkTor: false;
  commonTables: false;
  direct: null;
  tmpPath: null;
  titles: false;
  getSchema: false;
  identifyWaf: false;
  paramDel: null;
  safeReqFile: null;
  regKey: null;
  murphyRate: null;
  limitStart: null;
  crawlExclude: null;
  flushSession: false;
  loadCookies: null;
  csvDel: ",";
  offline: false;
  method: null;
  tmpDir: null;
  disablePrecon: false;
  osBof: false;
  testSkip: null;
  invalidLogical: false;
  getCurrentDb: false;
  hexConvert: false;
  proxyFile: null;
  answers: null;
  host: null;
  dependencies: false;
  cookie: null;
  proxy: null;
  regType: null;
  optimize: false;
  limitStop: null;
  search: false;
  uFrom: null;
  noCast: false;
  testFilter: null;
  ignoreCode: null;
  eta: false;
  csrfToken: null;
  threads: 1;
  logFile: null;
  os: null;
  col: null;
  rFile: null;
  proxyCred: null;
  verbose: 1;
  isDba: false;
  updateAll: false;
  privEsc: false;
  forceDns: false;
  getAll: false;
  api: true;
  url: null;
  invalidBignum: false;
  regexp: null;
  getDbs: false;
  freshQueries: false;
  uCols: null;
  smokeTest: false;
  wFile: null;
  udfInject: false;
  invalidString: false;
  tor: false;
  forceSSL: false;
  beep: false;
  noEscape: false;
  configFile: null;
  scope: null;
  authFile: null;
  torType: "SOCKS5";
  regVal: null;
  dummy: false;
  checkInternet: false;
  safePost: null;
  skipUrlEncode: false;
  referer: null;
  liveTest: false;
  retries: 3;
  extensiveFp: false;
  dumpTable: false;
  getColumns: false;
  batch: true;
  purge: false;
  headers: null;
  authCred: null;
  osCmd: null;
  suffix: null;
  dbmsCred: null;
  regDel: false;
  shLib: null;
  sitemapUrl: null;
  timeSec: 5;
  msfPath: null;
  dumpAll: false;
  getHostname: false;
  sessionFile: null;
  disableColoring: true;
  getTables: false;
  safeFreq: null;
  agent: null;
  webRoot: null;
  exclude: null;
  lastChar: null;
  string: null;
  dbms: null;
  dumpWhere: null;
  tamper: null;
  ignoreRedirects: false;
  hpp: false;
  runCase: null;
  delay: 0;
  evalCode: null;
  cleanup: false;
  csrfUrl: null;
  secondUrl: null;
  getBanner: false;
  profile: false;
  regRead: false;
  bulkFile: null;
  db: null;
  dumpFormat: "CSV";
  alert: null;
  harFile: null;
  nullConnection: false;
  user: null;
  parseErrors: false;
  getCount: false;
  dFile: null;
  data: null;
  regAdd: false;
  ignoreProxy: false;
  database: string;
  mobile: false;
  googleDork: null;
  saveConfig: null;
  sqlShell: false;
  tech: "BEUSTQ" | string;
  textOnly: false;
  cookieDel: null;
  commonColumns: false;
  keepAlive: false;
}

export class SqlmapTaskOpionResponse {
  options: SqlmapOption;
  success: boolean;
}
@Injectable()
export class SqlMapService {
  constructor(private httpClient: HttpClient) {}
  private getTaskListUrl(ip: string) {
    return `${ip}/admin/task/list`;
  }
  private getTaskDeleteUrl(ip, taskId) {
    return `${ip}/task/${taskId}/delete`;
  }
  private getTaskOptionsUrl(ip, taskId) {
    return `${ip}/option/${taskId}/list`;
  }
  private getSetTaskOptionUrl(ip: string, taskId: string) {
    return `${ip}/option/${taskId}/set`;
  }
  private getTaskStartUrl(ip: string, taskId: string) {
    return `${ip}/scan/${taskId}/start`;
  }
  private getTaskLogUrl(ip, taskId: string) {
    return `${ip}/scan/${taskId}/log`;
  }

  getTaskList(ip) {
    return this.httpClient.get(this.getTaskListUrl(ip)).toPromise() as Promise<
      SqlmapTaskListResponse
    >;
  }
  deleteTask(ip, taskId) {
    return this.httpClient
      .get(this.getTaskDeleteUrl(ip, taskId))
      .toPromise() as Promise<any>;
  }
  getTaskOption(ip, taskId) {
    return this.httpClient
      .get(this.getTaskOptionsUrl(ip, taskId))
      .toPromise() as Promise<SqlmapTaskOpionResponse>;
  }
  setTaskOption(ip: string, taskId: string, sqlmapOption: SqlmapOption) {
    return this.httpClient
      .post(this.getSetTaskOptionUrl(ip, taskId), sqlmapOption)
      .toPromise();
  }
  async taskStart(ip: string, taskId, options = {}) {
    return this.httpClient
      .post(this.getTaskStartUrl(ip, taskId), options)
      .toPromise();
  }
  async taskLog(ip, taskId) {
    return this.httpClient.get(this.getTaskLogUrl(ip, taskId)).toPromise();
  }
}
