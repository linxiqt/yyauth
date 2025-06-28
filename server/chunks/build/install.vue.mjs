import { ref, reactive, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderStyle } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'jws';
import 'ms';
import 'semver';
import 'crypto';
import 'knex';
import 'fs';
import 'path';
import 'axios';
import 'ar-aes';

const _sfc_main = {
  __name: "install",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const steps = [
      { label: "数据库配置" },
      { label: "管理员设置" },
      { label: "安装系统" }
    ];
    const currentStep = ref(0);
    const dbConfig = reactive({
      DB_HOST: "localhost",
      DB_PORT: 3306,
      DB_NAME: "auth",
      DB_USER: "root",
      DB_PASSWORD: ""
    });
    const adminConfig = reactive({
      username: "admin",
      password: "",
      confirmPassword: ""
    });
    const errors = reactive({});
    const testingConnection = ref(false);
    const connectionTested = ref(false);
    const connectionTestResult = ref(null);
    const installing = ref(false);
    const installComplete = ref(false);
    const installError = ref(null);
    const installProgress = ref(0);
    const installProgressText = ref("");
    const currentInstallStep = ref("准备安装系统...");
    const isAdminFormValid = computed(() => {
      return adminConfig.username && adminConfig.password && adminConfig.password === adminConfig.confirmPassword && adminConfig.password.length >= 6;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "install-container" }, _attrs))} data-v-6dfa8625><div class="install-card" data-v-6dfa8625><h1 class="text-2xl font-bold mb-6" data-v-6dfa8625>简授权安装</h1><div class="steps-container" data-v-6dfa8625><div class="steps-indicator" data-v-6dfa8625><!--[-->`);
      ssrRenderList(steps, (step, index) => {
        _push(`<div class="${ssrRenderClass(["step", { "active": currentStep.value >= index, "completed": currentStep.value > index }])}" data-v-6dfa8625><div class="step-number" data-v-6dfa8625>${ssrInterpolate(index + 1)}</div><div class="step-label" data-v-6dfa8625>${ssrInterpolate(step.label)}</div></div>`);
      });
      _push(`<!--]--></div>`);
      if (currentStep.value === 0) {
        _push(`<div class="step-content" data-v-6dfa8625><h2 class="text-xl font-semibold mb-4" data-v-6dfa8625>数据库配置</h2><div class="form-group" data-v-6dfa8625><label for="dbHost" data-v-6dfa8625>数据库主机</label><input type="text" id="dbHost"${ssrRenderAttr("value", dbConfig.DB_HOST)} placeholder="localhost"${ssrIncludeBooleanAttr(testingConnection.value) ? " disabled" : ""} data-v-6dfa8625>`);
        if (errors.DB_HOST) {
          _push(`<span class="error-text" data-v-6dfa8625>${ssrInterpolate(errors.DB_HOST)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-6dfa8625><label for="dbPort" data-v-6dfa8625>数据库端口</label><input type="number" id="dbPort"${ssrRenderAttr("value", dbConfig.DB_PORT)} placeholder="3306"${ssrIncludeBooleanAttr(testingConnection.value) ? " disabled" : ""} data-v-6dfa8625></div><div class="form-group" data-v-6dfa8625><label for="dbName" data-v-6dfa8625>数据库名称</label><input type="text" id="dbName"${ssrRenderAttr("value", dbConfig.DB_NAME)} placeholder="auth"${ssrIncludeBooleanAttr(testingConnection.value) ? " disabled" : ""} data-v-6dfa8625>`);
        if (errors.DB_NAME) {
          _push(`<span class="error-text" data-v-6dfa8625>${ssrInterpolate(errors.DB_NAME)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-6dfa8625><label for="dbUser" data-v-6dfa8625>数据库用户名</label><input type="text" id="dbUser"${ssrRenderAttr("value", dbConfig.DB_USER)} placeholder="root"${ssrIncludeBooleanAttr(testingConnection.value) ? " disabled" : ""} data-v-6dfa8625>`);
        if (errors.DB_USER) {
          _push(`<span class="error-text" data-v-6dfa8625>${ssrInterpolate(errors.DB_USER)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-6dfa8625><label for="dbPassword" data-v-6dfa8625>数据库密码</label><input type="password" id="dbPassword"${ssrRenderAttr("value", dbConfig.DB_PASSWORD)} placeholder="数据库密码"${ssrIncludeBooleanAttr(testingConnection.value) ? " disabled" : ""} data-v-6dfa8625></div><div class="button-group" data-v-6dfa8625><button class="btn-test"${ssrIncludeBooleanAttr(testingConnection.value) ? " disabled" : ""} data-v-6dfa8625>`);
        if (testingConnection.value) {
          _push(`<span data-v-6dfa8625>测试连接中...</span>`);
        } else {
          _push(`<span data-v-6dfa8625>测试连接</span>`);
        }
        _push(`</button><button class="btn-primary"${ssrIncludeBooleanAttr(!connectionTested.value || testingConnection.value) ? " disabled" : ""} data-v-6dfa8625> 下一步 </button></div>`);
        if (connectionTestResult.value) {
          _push(`<div class="${ssrRenderClass(["connection-result", connectionTestResult.value.success ? "success" : "error"])}" data-v-6dfa8625>${ssrInterpolate(connectionTestResult.value.message)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (currentStep.value === 1) {
        _push(`<div class="step-content" data-v-6dfa8625><h2 class="text-xl font-semibold mb-4" data-v-6dfa8625>管理员账户设置</h2><div class="form-group" data-v-6dfa8625><label for="adminUsername" data-v-6dfa8625>管理员用户名</label><input type="text" id="adminUsername"${ssrRenderAttr("value", adminConfig.username)} placeholder="admin" data-v-6dfa8625>`);
        if (errors.adminUsername) {
          _push(`<span class="error-text" data-v-6dfa8625>${ssrInterpolate(errors.adminUsername)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-6dfa8625><label for="adminPassword" data-v-6dfa8625>管理员密码</label><input type="password" id="adminPassword"${ssrRenderAttr("value", adminConfig.password)} placeholder="请输入密码" data-v-6dfa8625>`);
        if (errors.adminPassword) {
          _push(`<span class="error-text" data-v-6dfa8625>${ssrInterpolate(errors.adminPassword)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-6dfa8625><label for="confirmPassword" data-v-6dfa8625>确认密码</label><input type="password" id="confirmPassword"${ssrRenderAttr("value", adminConfig.confirmPassword)} placeholder="请再次输入密码" data-v-6dfa8625>`);
        if (errors.confirmPassword) {
          _push(`<span class="error-text" data-v-6dfa8625>${ssrInterpolate(errors.confirmPassword)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="button-group" data-v-6dfa8625><button class="btn-secondary" data-v-6dfa8625>上一步</button><button class="btn-primary"${ssrIncludeBooleanAttr(!isAdminFormValid.value) ? " disabled" : ""} data-v-6dfa8625>下一步</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (currentStep.value === 2) {
        _push(`<div class="step-content" data-v-6dfa8625><h2 class="text-xl font-semibold mb-4" data-v-6dfa8625>系统安装</h2>`);
        if (!installing.value && !installComplete.value) {
          _push(`<div class="install-confirm" data-v-6dfa8625><p data-v-6dfa8625>所有配置已完成，点击&quot;开始安装&quot;按钮开始安装系统。</p><p data-v-6dfa8625>安装过程中请不要关闭浏览器或刷新页面。</p><div class="button-group" data-v-6dfa8625><button class="btn-secondary" data-v-6dfa8625>上一步</button><button class="btn-primary" data-v-6dfa8625>开始安装</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (installing.value) {
          _push(`<div class="installing" data-v-6dfa8625><div class="loading-spinner" data-v-6dfa8625></div><div class="install-progress" data-v-6dfa8625><h3 data-v-6dfa8625>${ssrInterpolate(currentInstallStep.value)}</h3><div class="progress-bar" data-v-6dfa8625><div class="progress" style="${ssrRenderStyle({ width: installProgress.value + "%" })}" data-v-6dfa8625></div></div><p data-v-6dfa8625>${ssrInterpolate(installProgressText.value)}</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (installComplete.value) {
          _push(`<div class="install-complete" data-v-6dfa8625><div class="success-icon" data-v-6dfa8625>✓</div><h3 data-v-6dfa8625>安装完成！</h3><p data-v-6dfa8625>简授权已成功安装，您现在可以使用系统了。</p><div class="button-group" data-v-6dfa8625><button class="btn-primary" data-v-6dfa8625>前往登录</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (installError.value) {
          _push(`<div class="install-error" data-v-6dfa8625><div class="error-icon" data-v-6dfa8625>✗</div><h3 data-v-6dfa8625>安装失败</h3><p data-v-6dfa8625>${ssrInterpolate(installError.value)}</p><div class="button-group" data-v-6dfa8625><button class="btn-primary" data-v-6dfa8625>重试安装</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/install.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const install = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6dfa8625"]]);

export { install as default };
//# sourceMappingURL=install.vue.mjs.map
