import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { ref, reactive, computed, useSSRContext } from 'vue';

const limit = 10;
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const error = ref(null);
    const users = ref([]);
    const total = ref(0);
    const currentPage = ref(1);
    const searchQuery = ref("");
    const roleFilter = ref("");
    const showUserEditModal = ref(false);
    const editingUser = reactive({
      id: null,
      username: "",
      nickname: "",
      email: "",
      role: "",
      balance: 0
    });
    const saving = ref(false);
    const editError = ref(null);
    const showDeleteConfirm = ref(false);
    const userToDelete = ref(null);
    const deleting = ref(false);
    const deleteError = ref(null);
    const currentUserId = ref(null);
    const totalPages = computed(() => Math.ceil(total.value / limit));
    const displayedPages = computed(() => {
      if (totalPages.value <= 7) {
        return Array.from({ length: totalPages.value }, (_, i) => i + 1);
      }
      if (currentPage.value <= 3) {
        return [1, 2, 3, 4, 5, "...", totalPages.value];
      }
      if (currentPage.value >= totalPages.value - 2) {
        return [1, "...", totalPages.value - 4, totalPages.value - 3, totalPages.value - 2, totalPages.value - 1, totalPages.value];
      }
      return [1, "...", currentPage.value - 1, currentPage.value, currentPage.value + 1, "...", totalPages.value];
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
    const getRoleBadgeClass = (role) => {
      const classMap = {
        "admin": "bg-purple-100 text-purple-800",
        "user": "bg-gray-100 text-gray-800",
        "level1": "bg-blue-100 text-blue-800",
        "level2": "bg-green-100 text-green-800",
        "level3": "bg-yellow-100 text-yellow-800"
      };
      return classMap[role] || "bg-gray-100 text-gray-800";
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
      var _a;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6"><h1 class="text-2xl font-bold text-gray-800">用户管理</h1><p class="text-gray-600 mt-1">管理系统用户</p></div>`);
      if (loading.value) {
        _push(`<div class="flex justify-center items-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div></div>`);
      } else if (error.value) {
        _push(`<div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5v-1h2v1h-2zm0-3V7h2v1h-2z" clip-rule="evenodd"></path></svg></div><div class="ml-3"><p class="text-sm text-red-700">${ssrInterpolate(error.value)}</p></div></div></div>`);
      } else {
        _push(`<div><div class="bg-white p-4 rounded-lg shadow-md mb-6"><div class="flex flex-col md:flex-row gap-4"><div class="w-full md:w-1/3"><input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="搜索用户名、昵称或邮箱" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"></div><div class="w-full md:w-1/4"><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(roleFilter.value) ? ssrLooseContain(roleFilter.value, "") : ssrLooseEqual(roleFilter.value, "")) ? " selected" : ""}>所有角色</option><option value="admin"${ssrIncludeBooleanAttr(Array.isArray(roleFilter.value) ? ssrLooseContain(roleFilter.value, "admin") : ssrLooseEqual(roleFilter.value, "admin")) ? " selected" : ""}>管理员</option><option value="user"${ssrIncludeBooleanAttr(Array.isArray(roleFilter.value) ? ssrLooseContain(roleFilter.value, "user") : ssrLooseEqual(roleFilter.value, "user")) ? " selected" : ""}>普通用户</option><option value="level1"${ssrIncludeBooleanAttr(Array.isArray(roleFilter.value) ? ssrLooseContain(roleFilter.value, "level1") : ssrLooseEqual(roleFilter.value, "level1")) ? " selected" : ""}>一级代理</option><option value="level2"${ssrIncludeBooleanAttr(Array.isArray(roleFilter.value) ? ssrLooseContain(roleFilter.value, "level2") : ssrLooseEqual(roleFilter.value, "level2")) ? " selected" : ""}>二级代理</option><option value="level3"${ssrIncludeBooleanAttr(Array.isArray(roleFilter.value) ? ssrLooseContain(roleFilter.value, "level3") : ssrLooseEqual(roleFilter.value, "level3")) ? " selected" : ""}>三级代理</option></select></div><div class="flex-grow text-right"><button class="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none"> 查询 </button></div></div></div><div class="bg-white rounded-lg shadow-md overflow-hidden"><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">角色</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">余额</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">注册时间</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最后登录</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th></tr></thead><tbody class="bg-white divide-y divide-gray-200">`);
        if (users.value.length === 0) {
          _push(`<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500"> 没有找到匹配的用户 </td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(users.value, (user) => {
          _push(`<tr class="hover:bg-gray-50"><td class="px-6 py-4 whitespace-nowrap"><div class="flex items-center"><div><div class="text-sm font-medium text-gray-900">${ssrInterpolate(user.username)}</div><div class="text-sm text-gray-500">${ssrInterpolate(user.email || "未设置邮箱")}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap"><span class="${ssrRenderClass([getRoleBadgeClass(user.role), "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"])}">${ssrInterpolate(formatRole(user.role))}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> ¥${ssrInterpolate(user.balance || "0.00")}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ssrInterpolate(formatDate(user.created_at))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ssrInterpolate(formatDate(user.last_login))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><button class="text-pink-600 hover:text-pink-900 mr-3"> 编辑 </button>`);
          if (user.id !== currentUserId.value) {
            _push(`<button class="text-red-600 hover:text-red-900"> 删除 </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div><div class="px-6 py-3 flex items-center justify-between border-t border-gray-200"><div class="flex-1 flex justify-between sm:hidden"><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"> 上一页 </button><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"> 下一页 </button></div><div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"><div><p class="text-sm text-gray-700"> 显示 <span class="font-medium">${ssrInterpolate((currentPage.value - 1) * limit + 1)}</span> 至 <span class="font-medium">${ssrInterpolate(Math.min(currentPage.value * limit, total.value))}</span> 条，共 <span class="font-medium">${ssrInterpolate(total.value)}</span> 条记录 </p></div><div><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination"><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"><span class="sr-only">上一页</span><svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></button><!--[-->`);
        ssrRenderList(displayedPages.value, (page) => {
          _push(`<span>`);
          if (page !== "...") {
            _push(`<button class="${ssrRenderClass([
              "relative inline-flex items-center px-4 py-2 border text-sm font-medium",
              currentPage.value === page ? "z-10 bg-pink-50 border-pink-500 text-pink-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
            ])}">${ssrInterpolate(page)}</button>`);
          } else {
            _push(`<span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> ... </span>`);
          }
          _push(`</span>`);
        });
        _push(`<!--]--><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"><span class="sr-only">下一页</span><svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg></button></nav></div></div></div></div></div>`);
      }
      if (showUserEditModal.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white rounded-lg p-6 w-full max-w-md"><h2 class="text-xl font-bold mb-4">编辑用户</h2><div class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">用户名</label><input type="text"${ssrRenderAttr("value", editingUser.username)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 bg-gray-100" disabled></div><div><label class="block text-sm font-medium text-gray-700 mb-1">昵称</label><input type="text"${ssrRenderAttr("value", editingUser.nickname)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label><input type="email"${ssrRenderAttr("value", editingUser.email)} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">角色</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"><option value="admin"${ssrIncludeBooleanAttr(Array.isArray(editingUser.role) ? ssrLooseContain(editingUser.role, "admin") : ssrLooseEqual(editingUser.role, "admin")) ? " selected" : ""}>管理员</option><option value="user"${ssrIncludeBooleanAttr(Array.isArray(editingUser.role) ? ssrLooseContain(editingUser.role, "user") : ssrLooseEqual(editingUser.role, "user")) ? " selected" : ""}>普通用户</option><option value="level1"${ssrIncludeBooleanAttr(Array.isArray(editingUser.role) ? ssrLooseContain(editingUser.role, "level1") : ssrLooseEqual(editingUser.role, "level1")) ? " selected" : ""}>一级代理</option><option value="level2"${ssrIncludeBooleanAttr(Array.isArray(editingUser.role) ? ssrLooseContain(editingUser.role, "level2") : ssrLooseEqual(editingUser.role, "level2")) ? " selected" : ""}>二级代理</option><option value="level3"${ssrIncludeBooleanAttr(Array.isArray(editingUser.role) ? ssrLooseContain(editingUser.role, "level3") : ssrLooseEqual(editingUser.role, "level3")) ? " selected" : ""}>三级代理</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1">余额</label><input type="number"${ssrRenderAttr("value", editingUser.balance)} step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"></div>`);
        if (editError.value) {
          _push(`<div class="text-sm text-red-600">${ssrInterpolate(editError.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="mt-6 flex justify-end space-x-3"><button class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"> 取消 </button><button${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">`);
        if (saving.value) {
          _push(`<span class="flex items-center"><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 保存中... </span>`);
        } else {
          _push(`<span>保存</span>`);
        }
        _push(`</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showDeleteConfirm.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white rounded-lg p-6 w-full max-w-md"><h2 class="text-xl font-bold mb-4">确认删除</h2><p class="mb-6">您确定要删除用户 <span class="font-semibold">${ssrInterpolate((_a = userToDelete.value) == null ? void 0 : _a.username)}</span> 吗？此操作不可逆。</p>`);
        if (deleteError.value) {
          _push(`<div class="text-sm text-red-600 mb-4">${ssrInterpolate(deleteError.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex justify-end space-x-3"><button class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"> 取消 </button><button${ssrIncludeBooleanAttr(deleting.value) ? " disabled" : ""} class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">`);
        if (deleting.value) {
          _push(`<span class="flex items-center"><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 删除中... </span>`);
        } else {
          _push(`<span>确认删除</span>`);
        }
        _push(`</button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/users/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.vue3.mjs.map
