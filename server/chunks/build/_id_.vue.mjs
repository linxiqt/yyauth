import { ref, reactive, watch, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    let domain = ref("");
    const route = useRoute();
    useRouter();
    const appId = route.params.id;
    const loading = ref(true);
    const error = ref(null);
    const app = ref({});
    const auths = ref([]);
    const announcements = ref([]);
    const changelogs = ref([]);
    const activeTab = ref("auth");
    const tabs = [
      { id: "auth", name: "授权管理" },
      { id: "announcements", name: "公告管理" },
      { id: "changelogs", name: "更新日志管理" },
      { id: "updates", name: "更新管理" },
      { id: "settings", name: "应用设置" }
    ];
    const showAnnouncementModal = ref(false);
    const showChangelogModal = ref(false);
    const editingAnnouncement = ref(null);
    const editingChangelog = ref(null);
    const announcementForm = reactive({
      title: "",
      content: "",
      is_active: true
    });
    const changelogForm = reactive({
      version: "",
      changes: ""
    });
    const saving = ref(false);
    const updateConfig = ref({
      latest_version: "",
      signature: "",
      force_update: false,
      update_time: "",
      download_url: ""
    });
    const updateConfigLoading = ref(false);
    const updateConfigSaving = ref(false);
    const appSettings = reactive({
      name: "",
      description: "",
      identifier: "",
      platform: "android"
    });
    const appSettingsLoading = ref(false);
    const appSettingsSaving = ref(false);
    const loadAuths = async () => {
      try {
        const response = await fetch(`/api/apps/${appId}/auth`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message || "获取授权列表失败");
        }
        auths.value = result.data.items || [];
      } catch (err) {
        console.error("加载授权列表出错:", err);
        error.value = err.message || "获取授权列表时发生错误，请重试";
      }
    };
    const loadAnnouncements = async () => {
      try {
        const response = await fetch(`/api/apps/${appId}/announcements`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message || "获取公告列表失败");
        }
        announcements.value = result.data.items || [];
      } catch (err) {
        console.error("加载公告列表出错:", err);
        error.value = err.message || "获取公告列表时发生错误，请重试";
      }
    };
    const loadChangelogs = async () => {
      try {
        const response = await fetch(`/api/apps/${appId}/changelogs`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message || "获取更新日志列表失败");
        }
        changelogs.value = result.data.items || [];
      } catch (err) {
        console.error("加载更新日志列表出错:", err);
        error.value = err.message || "获取更新日志列表时发生错误，请重试";
      }
    };
    const loadUpdateConfig = async () => {
      try {
        updateConfigLoading.value = true;
        const response = await fetch(`/api/apps/${appId}/updates`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const result = await response.json();
        if (!result.success) {
          throw new Error(result.message || "获取更新配置失败");
        }
        updateConfig.value = result.data || {
          latest_version: "",
          signature: "",
          force_update: false,
          update_time: "",
          download_url: ""
        };
        if (updateConfig.value.update_time) {
          const date = new Date(updateConfig.value.update_time);
          updateConfig.value.update_time = date.toISOString().slice(0, 16);
        }
      } catch (err) {
        console.error("加载更新配置出错:", err);
        error.value = err.message || "获取更新配置时发生错误，请重试";
      } finally {
        updateConfigLoading.value = false;
      }
    };
    const formatDate = (timestamp) => {
      const date = new Date(typeof timestamp === "string" ? timestamp : timestamp * 1e3);
      return date.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    watch(activeTab, (newTab) => {
      if (newTab === "settings") ;
      else if (newTab === "auth") {
        loadAuths();
      } else if (newTab === "announcements") {
        loadAnnouncements();
      } else if (newTab === "changelogs") {
        loadChangelogs();
      } else if (newTab === "updates") {
        loadUpdateConfig();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-6"><h1 class="text-2xl font-bold text-gray-800">${ssrInterpolate(app.value.name)}</h1><p class="text-gray-600 mt-1">应用管理面板、快速应用敏捷开发</p></div>`);
      if (loading.value) {
        _push(`<div class="flex justify-center items-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div></div>`);
      } else if (error.value) {
        _push(`<div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5v-1h2v1h-2zm0-3V7h2v1h-2z" clip-rule="evenodd"></path></svg></div><div class="ml-3"><p class="text-sm text-red-700">${ssrInterpolate(error.value)}</p></div></div></div>`);
      } else {
        _push(`<div class="bg-white shadow-md rounded-lg overflow-hidden"><div class="bg-gray-50 px-4 py-3 border-b flex space-x-4"><!--[-->`);
        ssrRenderList(tabs, (tab) => {
          _push(`<button class="${ssrRenderClass([[
            activeTab.value === tab.id ? "bg-pink-100 text-pink-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          ], "px-3 py-2 rounded-md text-sm font-medium"])}">${ssrInterpolate(tab.name)}</button>`);
        });
        _push(`<!--]--></div><div class="p-6">`);
        if (activeTab.value === "settings") {
          _push(`<div><div class="flex justify-between items-center mb-6"><h2 class="text-lg font-semibold text-gray-800">应用设置</h2></div><div class="border rounded-md p-6">`);
          if (appSettingsLoading.value) {
            _push(`<div class="flex justify-center py-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div></div>`);
          } else {
            _push(`<form class="space-y-4"><div><label for="app_name" class="block text-sm font-medium text-gray-700">应用名称 <span class="text-red-500">*</span></label><input type="text" id="app_name"${ssrRenderAttr("value", appSettings.name)} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="应用名称" required></div><div><label for="app_description" class="block text-sm font-medium text-gray-700">应用描述</label><textarea id="app_description" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="应用简介（可选）">${ssrInterpolate(appSettings.description)}</textarea></div><div class="pt-4"><button type="submit"${ssrIncludeBooleanAttr(appSettingsSaving.value) ? " disabled" : ""} class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none disabled:opacity-50">`);
            if (appSettingsSaving.value) {
              _push(`<span>保存中...</span>`);
            } else {
              _push(`<span>保存设置</span>`);
            }
            _push(`</button></div></form>`);
          }
          _push(`</div></div>`);
        } else if (activeTab.value === "auth") {
          _push(`<div><div class="flex justify-between items-center mb-6"><h2 class="text-lg font-semibold text-gray-800">授权管理</h2><button class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none"> 添加授权 </button></div><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">域名</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">到期时间</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">联系方式</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th></tr></thead><tbody class="bg-white divide-y divide-gray-200">`);
          if (auths.value.length === 0) {
            _push(`<tr><td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">暂无授权记录</td></tr>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--[-->`);
          ssrRenderList(auths.value, (auth) => {
            _push(`<tr class="hover:bg-gray-50"><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${ssrInterpolate(auth.domain)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ssrInterpolate(formatDate(auth.outtime))}</td><td class="px-6 py-4 whitespace-nowrap"><span class="${ssrRenderClass([auth.outtime * 1e3 > Date.now() ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800", "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"])}">${ssrInterpolate(auth.outtime * 1e3 > Date.now() ? "正常" : "已过期")}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ssrInterpolate(auth.qq || "-")}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><button class="text-pink-600 hover:text-pink-900 mr-2">编辑</button><button class="text-red-600 hover:text-red-900">删除</button></td></tr>`);
          });
          _push(`<!--]--></tbody></table></div></div>`);
        } else if (activeTab.value === "announcements") {
          _push(`<div><div class="flex justify-between items-center mb-6"><h2 class="text-lg font-semibold text-gray-800">公告管理</h2><button class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none"> 添加公告 </button></div><div class="space-y-4">`);
          if (announcements.value.length === 0) {
            _push(`<div class="bg-gray-50 rounded-md p-4 text-center text-gray-500"> 暂无公告记录 </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--[-->`);
          ssrRenderList(announcements.value, (announcement) => {
            _push(`<div class="border rounded-md p-4 hover:bg-gray-50"><div class="flex justify-between items-start"><div><h3 class="font-medium text-gray-900">${ssrInterpolate(announcement.title)}</h3><p class="mt-1 text-sm text-gray-500">${ssrInterpolate(formatDate(announcement.created_at))}</p></div><div class="flex space-x-2"><button class="text-pink-600 hover:text-pink-900">编辑</button><button class="text-red-600 hover:text-red-900">删除</button></div></div><div class="mt-2 text-sm text-gray-700">${ssrInterpolate(announcement.content)}</div><div class="mt-2"><span class="${ssrRenderClass([announcement.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800", "px-2 py-1 text-xs rounded-full"])}">${ssrInterpolate(announcement.is_active ? "已发布" : "草稿")}</span></div></div>`);
          });
          _push(`<!--]--></div><div class="mt-6 bg-gray-50 rounded-md p-4 border border-gray-200"><h3 class="text-sm font-medium text-gray-700 mb-2">接口信息</h3><div class="text-sm text-gray-600"><p>应用公告API: <code class="bg-gray-100 px-2 py-1 rounded">${ssrInterpolate(unref(domain))}/api/apps/${ssrInterpolate(unref(appId))}/announcements</code></p><p class="mt-2">返回格式:</p><pre class="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">{
  &quot;success&quot;: true,
  &quot;data&quot;: {
    &quot;items&quot;: [
      {
        &quot;id&quot;: &quot;xxxxxxxx&quot;,
        &quot;title&quot;: &quot;重要公告&quot;,
        &quot;content&quot;: &quot;这是一条公告内容&quot;,
        &quot;is_active&quot;: true,
        &quot;created_at&quot;: &quot;2023-01-01T00:00:00&quot;
      }
    ]
  }
}</pre></div></div></div>`);
        } else if (activeTab.value === "changelogs") {
          _push(`<div><div class="flex justify-between items-center mb-6"><h2 class="text-lg font-semibold text-gray-800">更新日志管理</h2><button class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none"> 添加更新日志 </button></div><div class="space-y-4">`);
          if (changelogs.value.length === 0) {
            _push(`<div class="bg-gray-50 rounded-md p-4 text-center text-gray-500"> 暂无更新日志记录 </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--[-->`);
          ssrRenderList(changelogs.value, (changelog) => {
            _push(`<div class="border rounded-md p-4 hover:bg-gray-50"><div class="flex justify-between items-start"><div><h3 class="font-medium text-gray-900">${ssrInterpolate(changelog.version)}</h3><p class="mt-1 text-sm text-gray-500">${ssrInterpolate(formatDate(changelog.created_at))}</p></div><div class="flex space-x-2"><button class="text-pink-600 hover:text-pink-900">编辑</button><button class="text-red-600 hover:text-red-900">删除</button></div></div><div class="mt-2 text-sm text-gray-700 whitespace-pre-line">${ssrInterpolate(changelog.changes)}</div></div>`);
          });
          _push(`<!--]--></div><div class="mt-6 bg-gray-50 rounded-md p-4 border border-gray-200"><h3 class="text-sm font-medium text-gray-700 mb-2">接口信息</h3><div class="text-sm text-gray-600"><p>应用更新日志API: <code class="bg-gray-100 px-2 py-1 rounded">${ssrInterpolate(unref(domain))}/api/apps/${ssrInterpolate(unref(appId))}/changelogs</code></p><p class="mt-2">返回格式:</p><pre class="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">{
  &quot;success&quot;: true,
  &quot;data&quot;: {
    &quot;items&quot;: [
      {
        &quot;id&quot;: &quot;xxxxxxxx&quot;,
        &quot;version&quot;: &quot;1.0.1&quot;,
        &quot;changes&quot;: &quot;1. 修复了某某问题\\n2. 优化了性能\\n3. 添加了新功能&quot;,
        &quot;created_at&quot;: &quot;2023-01-01T00:00:00&quot;
      }
    ]
  }
}</pre></div></div></div>`);
        } else if (activeTab.value === "updates") {
          _push(`<div><div class="flex justify-between items-center mb-6"><h2 class="text-lg font-semibold text-gray-800">更新管理</h2></div><div class="border rounded-md p-6">`);
          if (updateConfigLoading.value) {
            _push(`<div class="flex justify-center py-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div></div>`);
          } else {
            _push(`<form class="space-y-4"><div><label for="latest_version" class="block text-sm font-medium text-gray-700">最新版本 <span class="text-red-500">*</span></label><input type="text" id="latest_version"${ssrRenderAttr("value", updateConfig.value.latest_version)} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="例如: 1.0.0" required></div><div><label for="signature" class="block text-sm font-medium text-gray-700">签名</label><input type="text" id="signature"${ssrRenderAttr("value", updateConfig.value.signature)} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="安装包签名（可选）"></div><div><label for="download_url" class="block text-sm font-medium text-gray-700">更新链接 <span class="text-red-500">*</span></label><input type="url" id="download_url"${ssrRenderAttr("value", updateConfig.value.download_url)} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="下载地址" required></div><div class="flex items-center"><input type="checkbox" id="force_update"${ssrIncludeBooleanAttr(Array.isArray(updateConfig.value.force_update) ? ssrLooseContain(updateConfig.value.force_update, null) : updateConfig.value.force_update) ? " checked" : ""} class="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"><label for="force_update" class="ml-2 block text-sm text-gray-900"> 强制更新 </label></div><div><label for="update_time" class="block text-sm font-medium text-gray-700">更新时间</label><input type="datetime-local" id="update_time"${ssrRenderAttr("value", updateConfig.value.update_time)} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"></div><div class="pt-4"><button type="submit"${ssrIncludeBooleanAttr(updateConfigSaving.value) ? " disabled" : ""} class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none disabled:opacity-50">`);
            if (updateConfigSaving.value) {
              _push(`<span>保存中...</span>`);
            } else {
              _push(`<span>保存配置</span>`);
            }
            _push(`</button></div></form>`);
          }
          _push(`</div><div class="mt-6 bg-gray-50 rounded-md p-4 border border-gray-200"><h3 class="text-sm font-medium text-gray-700 mb-2">接口信息</h3><div class="text-sm text-gray-600"><p>应用更新检查API: <code class="bg-gray-100 px-2 py-1 rounded">${ssrInterpolate(unref(domain))}/api/apps/${ssrInterpolate(unref(appId))}/updates</code></p><p class="mt-2">返回格式:</p><pre class="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">{
  &quot;success&quot;: true,
  &quot;data&quot;: {
    &quot;latest_version&quot;: &quot;1.0.0&quot;,
    &quot;signature&quot;: &quot;xxxx&quot;,
    &quot;force_update&quot;: false,
    &quot;update_time&quot;: &quot;2023-01-01T00:00:00&quot;,
    &quot;download_url&quot;: &quot;https://example.com/app.apk&quot;
  }
}</pre></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      if (showAnnouncementModal.value) {
        _push(`<div class="fixed z-10 inset-0 overflow-y-auto"><div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"><div class="fixed inset-0 transition-opacity" aria-hidden="true"><div class="absolute inset-0 bg-gray-500 opacity-75"></div></div><span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span><div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"><div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"><div class="sm:flex sm:items-start"><div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full"><h3 class="text-lg leading-6 font-medium text-gray-900">${ssrInterpolate(editingAnnouncement.value ? "编辑公告" : "添加公告")}</h3><div class="mt-4 space-y-4"><div><label for="title" class="block text-sm font-medium text-gray-700">标题 <span class="text-red-500">*</span></label><input type="text" id="title"${ssrRenderAttr("value", announcementForm.title)} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="输入公告标题" required></div><div><label for="content" class="block text-sm font-medium text-gray-700">内容</label><textarea id="content" rows="5" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="输入公告内容">${ssrInterpolate(announcementForm.content)}</textarea></div><div class="flex items-center"><input type="checkbox" id="is_active"${ssrIncludeBooleanAttr(Array.isArray(announcementForm.is_active) ? ssrLooseContain(announcementForm.is_active, null) : announcementForm.is_active) ? " checked" : ""} class="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"><label for="is_active" class="ml-2 block text-sm text-gray-900"> 立即发布 </label></div></div></div></div></div><div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"><button type="button"${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50">`);
        if (saving.value) {
          _push(`<span>保存中...</span>`);
        } else {
          _push(`<span>保存</span>`);
        }
        _push(`</button><button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"> 取消 </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showChangelogModal.value) {
        _push(`<div class="fixed z-10 inset-0 overflow-y-auto"><div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"><div class="fixed inset-0 transition-opacity" aria-hidden="true"><div class="absolute inset-0 bg-gray-500 opacity-75"></div></div><span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span><div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"><div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"><div class="sm:flex sm:items-start"><div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full"><h3 class="text-lg leading-6 font-medium text-gray-900">${ssrInterpolate(editingChangelog.value ? "编辑更新日志" : "添加更新日志")}</h3><div class="mt-4 space-y-4"><div><label for="version" class="block text-sm font-medium text-gray-700">版本号 <span class="text-red-500">*</span></label><input type="text" id="version"${ssrRenderAttr("value", changelogForm.version)} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="例如: v1.0.0" required></div><div><label for="changes" class="block text-sm font-medium text-gray-700">更新内容</label><textarea id="changes" rows="5" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500" placeholder="输入更新内容，可使用换行分隔多项更新">${ssrInterpolate(changelogForm.changes)}</textarea></div></div></div></div></div><div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"><button type="button"${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50">`);
        if (saving.value) {
          _push(`<span>保存中...</span>`);
        } else {
          _push(`<span>保存</span>`);
        }
        _push(`</button><button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"> 取消 </button></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/apps/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_.vue.mjs.map
