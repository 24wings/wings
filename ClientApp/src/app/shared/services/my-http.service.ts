import { Injectable } from "@angular/core";
import notify from "devextreme/ui/notify";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
type RequestOptions = {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe?: "body";
  params?: HttpParams | { [param: string]: string | string[] };
  reportProgress?: boolean;
  responseType: "json";
  withCredentials?: boolean;
};
@Injectable()
export class MyHttpService {
  httpTimeout: number = 3000;
  isMock: boolean = false;
  isDev: boolean = true;
  get ip(): string {
    return environment.ip;
  }

  Get(url: string, options?: RequestOptions, authHeader: boolean = true) {


    if (!options)
      options = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }),
        responseType: "json"
      };
    else
      options.headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("token")}`
      });
    return this.http
      .get(`${this.ip}${url}`, options)
      .toPromise()
      .then(rtn => {
        let result = rtn as any;
        if (result.statusCode > 400 && result.statusCode < 500) {
          return (result = {
            success: false,
            msg: "资源访问错误:" + result.message,
            status: result.statusCode
          });
        } else if (result.statusCode >= 500) {
          return (result = {
            success: false,
            msg: result.message ? result.message : "服务器内部错误:",
            status: result.statusCode
          });
        }
        if (!result.success) {
          return this.createMessage("error", result.data) && false;
        }
        return result.resData;
      })
      .catch(e => {
        this.handleError(e);
      });
  }
  Post(url: string, body: any, options?: RequestOptions): Promise<any> {

    if (!options)
      options = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }),
        responseType: "json"
      };
    else
      options.headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem("token")}`
      });

    return this.http
      .post(`${this.ip}${url}`, body, options)
      .toPromise()
      .then(rtn => {
        let result = rtn as any;
        if (result.statusCode > 400 && result.statusCode < 500) {
          result = {
            success: false,
            data: "资源访问错误:" + result.message,
            status: result.statusCode
          };
        } else if (result.statusCode >= 500) {
          result = {
            success: false,
            data: result.message ? result.message : "服务器内部错误:",
            status: result.statusCode
          };
        }
        if (!result.success) {
          this.createMessage("error", result.message);
          return false;
        } else {
          return result.resData;
        }
      })
      .catch(e => this.handleError(e));
    /**超过timeout 时间就会执行以下代码,返回错误信息 */
  }

  Delete(url: string, options?: RequestOptions) {
    url = url.startsWith("http") ? url : `${this.ip}${url}`;
    options = options ? options : ({} as any);
    return this.http
      .delete(`${this.ip}${url}`)
      .toPromise()
      .then(rtn => {
        let result = rtn as any;
        return result.success
          ? result.data
          : this.createMessage("error", result.data);
      });
  }

  Put(url: string, body, options?: RequestOptions) {
    url = url.startsWith("http") ? url : `${this.ip}${url}`;
    options = options ? options : ({} as any);
    // options.withCredentials = true;
    return this.http
      .put(`${this.ip}${url}`, body)
      .toPromise()
      .then(rtn => {
        let result = rtn as any;
        return result.success
          ? result.data
          : this.createMessage("error", result.data);
      });
  }
  async handleError(res: Response) {
    switch (res.status as any) {
      case 404:
        this.createMessage("error", "404请求的资源不存在");
        break;
      case 500:
        let body = res as any;
        this.createMessage(
          "error",
          body.message ? body.message : "服务器内部错误"
        );
        break;
      default:
        this.createMessage("error", res.status + "尚未捕获的请求异常");

        break;
    }
    return false;
  }
  localGet(url: string) {
    return this.http.get(url).toPromise();
  }
  localGetJSON(url: string) {
    return this.http
      .get(url)
      .toPromise()
      .then(rtn => rtn);
  }


  createMessage(type: "error" | "success" | "warning", text): boolean {
    notify(text, type);
    return true;
  }
  constructor(public http: HttpClient) { }
}
