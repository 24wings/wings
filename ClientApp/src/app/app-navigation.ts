export const navigation = [
  {
    text: "系统设置",
    //path: '/admin/rbac',
    icon: "preferences",
    items: [
      { text: "公司管理", path: "/admin/rbac/company", icon: "group" },
      { text: "组织管理", path: "/admin/rbac/org", icon: "group" },
      { text: "用户管理", path: "/rcxh/admin/page/Wings.Projects.Rcxh.DVO.Rbac.UserManage", icon: 'user' },
      { text: "菜单管理", path: "/rcxh/admin/page/Wings.Projects.Rcxh.DVO.Rbac.MenuManage", icon: "menu" },
      { text: "角色管理", path: "/rcxh/admin/page/Wings.Projects.Rcxh.DVO.Rbac.RoleManage", icon: 'card' },
    ]

  },



  {
    text: "历史文章",
    icon: "edit",
    path: "/home/page/Article",
  },

  {
    text: "写作",
    icon: "edit",
    path: "/home/write",
  }





];
