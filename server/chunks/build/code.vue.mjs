import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
import 'vue-router';

const php = `<?php

function checkAuthorization($host, $currentVersion) {
    $checkHost = 'https://auth.katomegumi.net/api/verify';
    
    try {
        error_log('开始远程检测');
        
        $params = [
            'domain' => $host,
            'version' => $currentVersion,
            'app_id' => 1
        ];
        error_log('请求参数: ' . print_r($params, true));
        
        $response = httpGetRequest($checkHost, $params);
        error_log('远程响应: ' . $response);
        
        $data = json_decode($response, true);
        error_log('远程检测结果: ' . print_r($data, true));
        
        return [
            'success' => $data['success'] ?? false,
            'response' => $data
        ];
    } catch (Exception $e) {
        error_log('远程授权检测失败: ' . $e->getMessage());
        return [
            'success' => false,
            'response' => ['message' => '服务器内部错误']
        ];
    }
}

function httpGetRequest($url, $params = []) {
    $queryParams = http_build_query($params);
    $fullUrl = $url . '?' . $queryParams;
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $fullUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT'] ?? 'PHP-Curl');
    
    $response = curl_exec($ch);
    
    if (curl_errno($ch)) {
        $error = curl_error($ch);
        curl_close($ch);
        throw new Exception('cURL 错误: ' . $error);
    }
    
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode >= 400) {
        throw new Exception('HTTP 错误: ' . $httpCode);
    }
    
    return $response;
}

$host = $_SERVER['HTTP_HOST'] ?? 'example.com';
$currentVersion = '1.0.0';
$debug = false; // 设置为 true 可以查看服务器返回的原始数据

try {
    $result = checkAuthorization($host, $currentVersion);
    
    if (!$result['success']) {
        http_response_code(403);
        exit(noAuthorizationHtml($result['response'], $debug));
    }
} catch (Exception $e) {
    error_log('授权检测发生异常: ' . $e->getMessage());
    http_response_code(500);
    exit(serverErrorHtml());
}

function noAuthorizationHtml($responseData, $debug) {
    $debugContent = '';
    if ($debug) {
        $debugContent = '<h2>调试信息</h2><pre>' . print_r($responseData, true) . '</pre>';
    }
    
    return <<<HTML
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>未授权访问</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
            width: 100%;
        }
        h1 {
            color: #e74c3c;
            margin-bottom: 20px;
        }
        p {
            font-size: 18px;
            line-height: 1.5;
            margin-bottom: 20px;
        }
        .contact-info {
            font-style: italic;
            color: #555;
        }
        pre {
            background-color: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>未授权访问</h1>
        <p>您当前的访问未获得授权，请联系系统管理员解决此问题。</p>
        <div class="contact-info">
            <p>管理员邮箱: admin@example.com</p>
            <p>联系电话: 400-123-4567</p>
        </div>
        {$debugContent}
    </div>
</body>
</html>
HTML;
}

function serverErrorHtml() {
    return <<<HTML
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>服务器错误</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
            width: 100%;
        }
        h1 {
            color: #e74c3c;
            margin-bottom: 20px;
        }
        p {
            font-size: 18px;
            line-height: 1.5;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>服务器错误</h1>
        <p>系统发生内部错误，请稍后再试或联系管理员。</p>
    </div>
</body>
</html>
HTML;
}

?>`;
const _sfc_main = {
  __name: "code",
  __ssrInlineRender: true,
  setup(__props) {
    const customHost = ref("");
    const copyStatus = ref("复制代码");
    const generatedCode = computed(() => {
      if (!customHost.value) {
        return php;
      }
      return php.replace(
        "$checkHost = 'https://auth.katomegumi.net/api/verify';",
        `$checkHost = 'https://${customHost.value}/api/verify';`
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "code-generator" }, _attrs))} data-v-d2c56cbb><h1 style="${ssrRenderStyle({ "text-align": "center", "margin-bottom": "20px", "font-size": "24px", "font-weight": "bold" })}" data-v-d2c56cbb>PHP授权验证代码生成器</h1><p style="${ssrRenderStyle({ "text-align": "center", "color": "#666", "margin-bottom": "20px" })}" data-v-d2c56cbb>请将以下代码添加到您的PHP项目中，以实现授权验证功能。你还可以对下方代码进行修改或加密，以适应您的需求。</p><div class="form-group" data-v-d2c56cbb><label for="hostInput" data-v-d2c56cbb>授权验证域名：</label><input type="text" id="hostInput"${ssrRenderAttr("value", customHost.value)} placeholder="输入域名或使用当前域名" data-v-d2c56cbb><button class="btn-secondary" data-v-d2c56cbb>使用当前域名</button></div><div class="code-container" data-v-d2c56cbb><pre data-v-d2c56cbb><code data-v-d2c56cbb>${ssrInterpolate(generatedCode.value)}</code></pre><button class="btn-primary" data-v-d2c56cbb>${ssrInterpolate(copyStatus.value)}</button></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/code.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const code = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d2c56cbb"]]);

export { code as default };
//# sourceMappingURL=code.vue.mjs.map
