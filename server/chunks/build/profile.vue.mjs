import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { ref, reactive, useSSRContext } from 'vue';

const _sfc_main = {
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const saving = ref(false);
    const error = ref(null);
    const showSuccess = ref(false);
    const passwordSaving = ref(false);
    const passwordError = ref(null);
    const passwordSuccess = ref(null);
    const profile = reactive({
      username: "",
      nickname: "",
      email: "",
      qq: "",
      bio: "",
      balance: 0,
      role: "",
      created_at: null,
      last_login: null
    });
    const passwordForm = reactive({
      current_password: "",
      new_password: "",
      confirm_password: ""
    });
    const formatRole = (role) => {
      const roleMap = {
        "admin": "管理员",
        "user": "普通用户",
        "level1": "一级代理",
        "level2": "二级代理",
        "level3": "三级代理"
      };
      return roleMap[role] || role;
    };
    const formatDate = (timestamp) => {
      if (!timestamp) return "未记录";
      const date = new Date(timestamp);
      return date.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6"><h1 class="text-2xl font-bold text-gray-800">个人资料</h1><p class="text-gray-600 mt-1">管理您的账户信息</p></div>`);
      if (loading.value) {
        _push(`<div class="flex justify-center items-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div></div>`);
      } else if (error.value) {
        _push(`<div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5v-1h2v1h-2zm0-3V7h2v1h-2z" clip-rule="evenodd"></path></svg></div><div class="ml-3"><p class="text-sm text-red-700">${ssrInterpolate(error.value)}</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showSuccess.value) {
        _push(`<div class="bg-green-50 border-l-4 border-green-500 p-4 mb-6"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div><div class="ml-3"><p class="text-sm text-green-700">资料更新成功！</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && !error.value) {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2"><form class="bg-white shadow-md rounded-lg p-6"><h2 class="text-lg font-medium text-gray-800 mb-4">基本信息</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label for="username" class="block text-sm font-medium text-gray-700 mb-1">用户名</label><input type="text" id="username"${ssrRenderAttr("value", profile.username)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 bg-gray-100" disabled><p class="mt-1 text-xs text-gray-500">用户名不可修改</p></div><div><label for="nickname" class="block text-sm font-medium text-gray-700 mb-1">昵称</label><input type="text" id="nickname"${ssrRenderAttr("value", profile.nickname)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="请输入昵称"></div><div><label for="email" class="block text-sm font-medium text-gray-700 mb-1">邮箱</label><input type="email" id="email"${ssrRenderAttr("value", profile.email)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="请输入邮箱"></div><div><label for="qq" class="block text-sm font-medium text-gray-700 mb-1">QQ</label><input type="text" id="qq"${ssrRenderAttr("value", profile.qq)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="请输入QQ号码"></div></div><div class="mt-6"><label for="bio" class="block text-sm font-medium text-gray-700 mb-1">个人简介</label><textarea id="bio" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="简单介绍一下自己吧">${ssrInterpolate(profile.bio)}</textarea></div><div class="mt-6 flex justify-end"><button type="submit"${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">`);
        if (saving.value) {
          _push(`<span class="flex items-center"><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 保存中... </span>`);
        } else {
          _push(`<span>保存资料</span>`);
        }
        _push(`</button></div></form></div><div class="lg:col-span-1"><div class="bg-white shadow-md rounded-lg p-6 mb-6"><h2 class="text-lg font-medium text-gray-800 mb-4">账户信息</h2><div class="space-y-4"><div><div class="text-sm text-gray-500">账户余额</div><div class="text-xl font-semibold text-pink-600">¥${ssrInterpolate(profile.balance || "0.00")}</div></div><div><div class="text-sm text-gray-500">用户角色</div><div class="text-md">${ssrInterpolate(formatRole(profile.role))}</div></div><div><div class="text-sm text-gray-500">注册时间</div><div class="text-md">${ssrInterpolate(formatDate(profile.created_at))}</div></div><div><div class="text-sm text-gray-500">最后登录</div><div class="text-md">${ssrInterpolate(formatDate(profile.last_login))}</div></div></div><div class="mt-6"><button class="w-full px-4 py-2 border border-pink-300 rounded-md shadow-sm text-sm font-medium text-pink-700 bg-pink-50 hover:bg-pink-100 focus:outline-none"> 充值余额 </button></div></div><div class="bg-white shadow-md rounded-lg p-6"><h2 class="text-lg font-medium text-gray-800 mb-4">修改密码</h2><form class="space-y-4"><div><label for="current_password" class="block text-sm font-medium text-gray-700 mb-1">当前密码</label><input type="password" id="current_password"${ssrRenderAttr("value", passwordForm.current_password)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="请输入当前密码" required></div><div><label for="new_password" class="block text-sm font-medium text-gray-700 mb-1">新密码</label><input type="password" id="new_password"${ssrRenderAttr("value", passwordForm.new_password)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="请输入新密码" required></div><div><label for="confirm_password" class="block text-sm font-medium text-gray-700 mb-1">确认新密码</label><input type="password" id="confirm_password"${ssrRenderAttr("value", passwordForm.confirm_password)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="请确认新密码" required></div>`);
        if (passwordError.value) {
          _push(`<div class="text-sm text-red-600">${ssrInterpolate(passwordError.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (passwordSuccess.value) {
          _push(`<div class="text-sm text-green-600">${ssrInterpolate(passwordSuccess.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mt-4"><button type="submit"${ssrIncludeBooleanAttr(passwordSaving.value) ? " disabled" : ""} class="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">`);
        if (passwordSaving.value) {
          _push(`<span class="flex items-center justify-center"><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 更新中... </span>`);
        } else {
          _push(`<span>更新密码</span>`);
        }
        _push(`</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profile.vue.mjs.map
