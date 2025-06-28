import{r as x,j as m,A as g,c as l,a as e,F as y,l as h,s as o,o as p,n as q,y as v,t as f}from"./BSD6ajEG.js";const w={class:"mb-8 bg-gray-50 p-4 rounded-lg"},b={class:"space-y-2"},$=["onClick"],_={class:"space-y-12"},I=["id"],k=["id"],S=["id"],T=["id"],j={__name:"api",setup(U){const a=[{id:"auth-verification",title:"授权验证"},{id:"get-announcements",title:"获取公告"},{id:"get-changelogs",title:"获取更新日志"},{id:"get-update-config",title:"获取更新配置"}],d=x(a[0].id),c=n=>{const t=document.getElementById(n);t&&t.scrollIntoView({behavior:"smooth"})},i=()=>{const n=window.scrollY+100;a.forEach(t=>{const s=document.getElementById(t.id);if(s){const r=s.offsetTop,u=s.offsetHeight;n>=r&&n<=r+u&&(d.value=t.id)}})};return m(()=>{window.addEventListener("scroll",i),i()}),g(()=>{window.removeEventListener("scroll",i)}),(n,t)=>(p(),l("div",null,[t[5]||(t[5]=e("div",{class:"mb-6"},[e("h1",{class:"text-2xl font-bold text-gray-800"},"API 接入文档"),e("p",{class:"text-gray-600 mt-1"},"了解如何在您的应用中集成授权、公告和更新日志功能")],-1)),e("div",w,[t[0]||(t[0]=e("h2",{class:"text-lg font-semibold mb-3"},"目录",-1)),e("ul",b,[(p(),l(y,null,h(a,s=>e("li",{key:s.id,class:q(["pl-2 border-l-4",{"border-pink-500":d.value===s.id,"border-transparent":d.value!==s.id}])},[e("a",{href:"#",onClick:v(r=>c(s.id),["prevent"]),class:"hover:text-pink-600 text-gray-700"},f(s.title),9,$)],2)),64))])]),e("div",_,[e("section",{id:a[0].id,class:"scroll-mt-4"},t[1]||(t[1]=[o(`<h2 class="text-xl font-bold text-gray-800 pb-3 border-b">授权验证</h2><div class="mt-4 space-y-6"><p>通过授权验证接口，您可以验证域名是否已获得授权，并获取授权的详细信息。</p><div class="mt-4"><h3 class="text-lg font-semibold mb-2">接口信息</h3><dl class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2"><div class="sm:col-span-1"><dt class="text-sm font-medium text-gray-500">请求方式</dt><dd class="mt-1 text-sm text-gray-900">POST</dd></div><div class="sm:col-span-1"><dt class="text-sm font-medium text-gray-500">接口地址</dt><dd class="mt-1 text-sm text-gray-900">/api/verify</dd></div></dl></div><div class="mt-6"><h3 class="text-lg font-semibold mb-2">请求参数</h3><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">参数名</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">必填</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">domain</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">是</td><td class="px-6 py-4 text-sm text-gray-500">要验证的域名</td></tr><tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">app_id</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">integer</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">是</td><td class="px-6 py-4 text-sm text-gray-500">应用ID</td></tr><tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ip</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">否</td><td class="px-6 py-4 text-sm text-gray-500">IP地址（如果设置了IP验证）</td></tr></tbody></table></div></div><div class="mt-6"><h3 class="text-lg font-semibold mb-2">响应示例</h3><div class="bg-gray-800 rounded-md p-4 text-gray-100"><pre class="whitespace-pre-wrap text-sm">{
  &quot;success&quot;: true,
  &quot;data&quot;: {
    &quot;auth&quot;: {
      &quot;id&quot;: 1,
      &quot;domain&quot;: &quot;example.com&quot;,
      &quot;ip&quot;: &quot;127.0.0.1&quot;,
      &quot;qq&quot;: &quot;12345678&quot;,
      &quot;outtime&quot;: 1735689600, // Unix时间戳（秒）
      &quot;version&quot;: &quot;v1.0.0&quot;,
      &quot;created_at&quot;: &quot;2023-01-01T00:00:00Z&quot;
    }
  }
}
              </pre></div></div><div class="mt-6"><h3 class="text-lg font-semibold mb-2">PHP 接入示例</h3><div class="bg-gray-800 rounded-md p-4 text-gray-100"><pre class="whitespace-pre-wrap text-sm">&lt;?php
function checkAuth($domain, $appId) {
    $apiUrl = &#39;https://您的授权系统域名/api/verify&#39;;
    
    $data = [
        &#39;domain&#39; =&gt; $domain,
        &#39;app_id&#39; =&gt; $appId,
        &#39;ip&#39; =&gt; $_SERVER[&#39;SERVER_ADDR&#39;] // 可选，如果启用IP验证
    ];
    
    $options = [
        &#39;http&#39; =&gt; [
            &#39;header&#39;  =&gt; &quot;Content-type: application/json\\r\\n&quot;,
            &#39;method&#39;  =&gt; &#39;POST&#39;,
            &#39;content&#39; =&gt; json_encode($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($apiUrl, false, $context);
    
    if ($result === FALSE) {
        return false;
    }
    
    $response = json_decode($result, true);
    
    if (!$response[&#39;success&#39;]) {
        return false;
    }
    
    $auth = $response[&#39;data&#39;][&#39;auth&#39;];
    
    // 检查授权是否过期
    if (time() &gt; $auth[&#39;outtime&#39;]) {
        return false;
    }
    
    return $auth;
}

// 使用示例
$domain = $_SERVER[&#39;HTTP_HOST&#39;];
$appId = 1; // 您的应用ID

$auth = checkAuth($domain, $appId);

if (!$auth) {
    echo &#39;授权验证失败，请联系管理员购买授权&#39;;
    exit;
}

echo &#39;授权验证成功，到期时间：&#39; . date(&#39;Y-m-d H:i:s&#39;, $auth[&#39;outtime&#39;]);
?&gt;
              </pre></div></div></div>`,2)]),8,I),e("section",{id:a[1].id,class:"scroll-mt-4"},t[2]||(t[2]=[o(`<h2 class="text-xl font-bold text-gray-800 pb-3 border-b">获取公告</h2><div class="mt-4 space-y-6"><p>获取应用最新公告，可以用于在您的应用中展示通知和重要信息。</p><div class="mt-4"><h3 class="text-lg font-semibold mb-2">接口信息</h3><dl class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2"><div class="sm:col-span-1"><dt class="text-sm font-medium text-gray-500">请求方式</dt><dd class="mt-1 text-sm text-gray-900">GET</dd></div><div class="sm:col-span-1"><dt class="text-sm font-medium text-gray-500">接口地址</dt><dd class="mt-1 text-sm text-gray-900">/api/apps/:app_id/announcements/public</dd></div></dl></div><div class="mt-6"><h3 class="text-lg font-semibold mb-2">请求参数</h3><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">参数名</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">必填</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">limit</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">integer</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">否</td><td class="px-6 py-4 text-sm text-gray-500">返回的公告数量，默认5条</td></tr></tbody></table></div></div><div class="mt-6"><h3 class="text-lg font-semibold mb-2">响应示例</h3><div class="bg-gray-800 rounded-md p-4 text-gray-100"><pre class="whitespace-pre-wrap text-sm">{
  &quot;success&quot;: true,
  &quot;data&quot;: {
    &quot;items&quot;: [
      {
        &quot;id&quot;: 1,
        &quot;title&quot;: &quot;系统维护通知&quot;,
        &quot;content&quot;: &quot;系统将于2023年6月1日进行维护升级，届时可能会短暂无法访问。&quot;,
        &quot;created_at&quot;: &quot;2023-05-25T10:00:00Z&quot;
      },
      {
        &quot;id&quot;: 2,
        &quot;title&quot;: &quot;新功能上线&quot;,
        &quot;content&quot;: &quot;我们新增了XXX功能，欢迎体验。&quot;,
        &quot;created_at&quot;: &quot;2023-05-20T08:30:00Z&quot;
      }
    ]
  }
}
              </pre></div></div><div class="mt-6"><h3 class="text-lg font-semibold mb-2">JavaScript 接入示例</h3><div class="bg-gray-800 rounded-md p-4 text-gray-100"><pre class="whitespace-pre-wrap text-sm">// 获取应用公告
async function fetchAnnouncements(appId, limit = 5) {
  try {
    const response = await fetch(\`https://您的授权系统域名/api/apps/\${appId}/announcements/public?limit=\${limit}\`);
    const data = await response.json();
    
    if (!data.success) {
      console.error(&#39;获取公告失败:&#39;, data.message);
      return [];
    }
    
    return data.data.items;
  } catch (error) {
    console.error(&#39;获取公告出错:&#39;, error);
    return [];
  }
}

// 使用示例
const appId = 1; // 您的应用ID

fetchAnnouncements(appId).then(announcements =&gt; {
  if (announcements.length &gt; 0) {
    // 显示公告
    announcements.forEach(announcement =&gt; {
      console.log(\`\${announcement.title}: \${announcement.content}\`);
    });
  } else {
    console.log(&#39;暂无公告&#39;);
  }
});
              </pre></div></div></div>`,2)]),8,k),e("section",{id:a[2].id,class:"scroll-mt-4"},t[3]||(t[3]=[o(`<h2 class="text-xl font-bold text-gray-800 pb-3 border-b">获取更新日志</h2><div class="mt-4 space-y-6"><p>获取应用更新日志，可以用于在您的应用中展示版本更新信息。</p><div class="mt-4"><h3 class="text-lg font-semibold mb-2">接口信息</h3><dl class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2"><div class="sm:col-span-1"><dt class="text-sm font-medium text-gray-500">请求方式</dt><dd class="mt-1 text-sm text-gray-900">GET</dd></div><div class="sm:col-span-1"><dt class="text-sm font-medium text-gray-500">接口地址</dt><dd class="mt-1 text-sm text-gray-900">/api/apps/:app_id/changelogs/public</dd></div></dl></div><div class="mt-6"><h3 class="text-lg font-semibold mb-2">请求参数</h3><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">参数名</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">必填</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">version</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">否</td><td class="px-6 py-4 text-sm text-gray-500">获取特定版本的更新日志</td></tr><tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">limit</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">integer</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">否</td><td class="px-6 py-4 text-sm text-gray-500">返回的更新日志数量，默认10条</td></tr></tbody></table></div></div><div class="mt-6"><h3 class="text-lg font-semibold mb-2">响应示例</h3><div class="bg-gray-800 rounded-md p-4 text-gray-100"><pre class="whitespace-pre-wrap text-sm">{
  &quot;success&quot;: true,
  &quot;data&quot;: {
    &quot;items&quot;: [
      {
        &quot;id&quot;: 1,
        &quot;version&quot;: &quot;v1.2.0&quot;,
        &quot;changes&quot;: &quot;1. 修复了登录问题\\n2. 优化了界面展示\\n3. 新增了导出功能&quot;,
        &quot;created_at&quot;: &quot;2023-06-01T10:00:00Z&quot;
      },
      {
        &quot;id&quot;: 2,
        &quot;version&quot;: &quot;v1.1.0&quot;,
        &quot;changes&quot;: &quot;1. 初始版本发布&quot;,
        &quot;created_at&quot;: &quot;2023-05-01T08:30:00Z&quot;
      }
    ]
  }
}
              </pre></div></div><div class="mt-6"><h3 class="text-lg font-semibold mb-2">PHP 接入示例</h3><div class="bg-gray-800 rounded-md p-4 text-gray-100"><pre class="whitespace-pre-wrap text-sm">&lt;?php
function getChangelogs($appId, $limit = 10) {
    $apiUrl = &quot;https://您的授权系统域名/api/apps/{$appId}/changelogs/public?limit={$limit}&quot;;
    
    $result = file_get_contents($apiUrl);
    
    if ($result === FALSE) {
        return [];
    }
    
    $response = json_decode($result, true);
    
    if (!$response[&#39;success&#39;]) {
        return [];
    }
    
    return $response[&#39;data&#39;][&#39;items&#39;];
}

// 使用示例
$appId = 1; // 您的应用ID

$changelogs = getChangelogs($appId);

if (count($changelogs) &gt; 0) {
    echo &quot;&lt;h2&gt;更新日志&lt;/h2&gt;&quot;;
    echo &quot;&lt;ul&gt;&quot;;
    foreach ($changelogs as $changelog) {
        echo &quot;&lt;li&gt;&quot;;
        echo &quot;&lt;strong&gt;{$changelog[&#39;version&#39;]}&lt;/strong&gt; - &quot; . date(&#39;Y-m-d&#39;, strtotime($changelog[&#39;created_at&#39;]));
        echo &quot;&lt;pre&gt;{$changelog[&#39;changes&#39;]}&lt;/pre&gt;&quot;;
        echo &quot;&lt;/li&gt;&quot;;
    }
    echo &quot;&lt;/ul&gt;&quot;;
} else {
    echo &quot;暂无更新日志&quot;;
}
?&gt;
              </pre></div></div></div>`,2)]),8,S),e("section",{id:a[3].id,class:"scroll-mt-4"},t[4]||(t[4]=[o(`<h2 class="text-xl font-bold text-gray-800 pb-3 border-b">获取更新配置</h2><div class="mt-4 space-y-6"><p>获取应用更新配置，可以用于在您的应用中实现版本检查和自动更新功能。</p><div class="mt-4"><h3 class="text-lg font-semibold mb-2">接口信息</h3><dl class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2"><div class="sm:col-span-1"><dt class="text-sm font-medium text-gray-500">请求方式</dt><dd class="mt-1 text-sm text-gray-900">GET</dd></div><div class="sm:col-span-1"><dt class="text-sm font-medium text-gray-500">接口地址</dt><dd class="mt-1 text-sm text-gray-900">/api/apps/:app_id/updates</dd></div></dl></div><div class="mt-6"><h3 class="text-lg font-semibold mb-2">响应示例</h3><div class="bg-gray-800 rounded-md p-4 text-gray-100"><pre class="whitespace-pre-wrap text-sm">{
  &quot;success&quot;: true,
  &quot;data&quot;: {
    &quot;latest_version&quot;: &quot;1.0.0&quot;,
    &quot;signature&quot;: &quot;xxxx&quot;,
    &quot;force_update&quot;: false,
    &quot;update_time&quot;: &quot;2023-01-01T00:00:00&quot;,
    &quot;download_url&quot;: &quot;https://example.com/app.apk&quot;
  }
}
              </pre></div></div><div class="mt-6"><h3 class="text-lg font-semibold mb-2">字段说明</h3><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">字段名</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">latest_version</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td><td class="px-6 py-4 text-sm text-gray-500">最新版本号</td></tr><tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">signature</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td><td class="px-6 py-4 text-sm text-gray-500">安装包签名</td></tr><tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">force_update</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td><td class="px-6 py-4 text-sm text-gray-500">是否强制更新</td></tr><tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">update_time</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td><td class="px-6 py-4 text-sm text-gray-500">更新发布时间</td></tr><tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">download_url</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td><td class="px-6 py-4 text-sm text-gray-500">安装包下载地址</td></tr></tbody></table></div></div><div class="mt-6"><h3 class="text-lg font-semibold mb-2">Android 接入示例</h3><div class="bg-gray-800 rounded-md p-4 text-gray-100"><pre class="whitespace-pre-wrap text-sm">// Kotlin 示例
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.net.URL

suspend fun checkForUpdates(appId: Int): UpdateInfo? {
    return withContext(Dispatchers.IO) {
        try {
            val url = URL(&quot;https://您的授权系统域名/api/apps/$appId/updates&quot;)
            val connection = url.openConnection()
            val response = connection.getInputStream().bufferedReader().use { it.readText() }
            
            val jsonObject = JSONObject(response)
            if (!jsonObject.getBoolean(&quot;success&quot;)) {
                return@withContext null
            }
            
            val data = jsonObject.getJSONObject(&quot;data&quot;)
            UpdateInfo(
                latestVersion = data.getString(&quot;latest_version&quot;),
                signature = data.optString(&quot;signature&quot;),
                forceUpdate = data.getBoolean(&quot;force_update&quot;),
                updateTime = data.getString(&quot;update_time&quot;),
                downloadUrl = data.getString(&quot;download_url&quot;)
            )
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}

// 数据类
data class UpdateInfo(
    val latestVersion: String,
    val signature: String,
    val forceUpdate: Boolean,
    val updateTime: String,
    val downloadUrl: String
)

// 使用示例
lifecycleScope.launch {
    val appId = 1 // 您的应用ID
    val currentVersion = &quot;0.9.0&quot; // 当前应用版本
    
    val updateInfo = checkForUpdates(appId)
    updateInfo?.let {
        if (isNewerVersion(currentVersion, it.latestVersion)) {
            // 显示更新提示
            showUpdateDialog(
                newVersion = it.latestVersion,
                updateUrl = it.downloadUrl,
                forceUpdate = it.forceUpdate
            )
        }
    }
}

// 版本比较函数
fun isNewerVersion(currentVersion: String, latestVersion: String): Boolean {
    // 实现版本比较逻辑
    // ...
    return true
}
              </pre></div></div></div>`,2)]),8,T)])]))}};export{j as default};
