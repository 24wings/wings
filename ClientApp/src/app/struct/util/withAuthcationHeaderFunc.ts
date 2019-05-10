export function withAuthcationHeaderFunc(ok, setting) {
    setting.headers = { "Authorization": localStorage.getItem("token") };
}