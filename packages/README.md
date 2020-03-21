### 组件列表
* [adapt](#adapt)
* [breadcrumb](#breadcrumb)
* [button](#button)
* [image](#image)
* [input](#input)
----

<div id="adapt"></div>

### adapt (响应式组件)
> 通过adapt组件创建在页面不同尺寸下插槽内容的显示与隐藏

#### 扩展组件
> 针对不同尺寸扩展的组件，无需传入type参数
> ##### adapt-extra-small
> ##### adapt-small
> ##### adapt-medium
> ##### adapt-large
> ##### adapt-extra-large


#### 示例
> 在页面尺寸是extra-small时显示
> ```HTML
> <fan-adapt type="extra-small">我是最小的</fan-adapt>
> <adapt-extra-small>我是最小的</adapt-extra-small>
> ```
> 在页面尺寸不是extra-small是显示
> ```HTML
> <fan-adapt type="extra-small" reverse>我不在最小时显示</fan-adapt>
> <adapt-extra-small>
> 	<adapt-reverse>我不在最小时显示</adapt-reverse>
> </adapt-extra-small>
> ```

#### adapt-reverse (颠倒组件)
> 该组件放在只允许放在adapt组件的插槽中

#### Attributes

|参数|说明|类型|可选值|默认值|
|:-|:-|:-|:-|:-|
|type|尺寸类型，规定插槽内容在何时显示与隐藏|String|extra-small / small / medium / large / extra-large|——|
|tag|包裹插槽内容的标签名，可选。默认无包裹标签，在不传并且插槽子数量大于2时默认为div|String|——|——|
|reverse|颠倒渲染结果|Boolean|——|false|
----

<div id="breadcrumb"></div>

### breadcrumb (面包屑)
#### 示例
> 基础用法
> ```HTML
> <fan-breadcrumb separator=">">
> 	<fan-breadcrumb-item to="/">首页</fan-breadcrumb-item>
> 	<fan-breadcrumb-item><a href="http://www.baidu.com">子页</a></fan-breadcrumb-item>
> </fan-breadcrumb>
> ```

#### breadcrumb Attributes
|参数|说明|类型|可选值|默认值|
|:-|:-|:-|:-|:-|
|separator|分隔符|String|——|/|
|separatorIcon|图标分隔符|String|——|——|
#### breadcrumb item Attributes
|参数|说明|类型|可选值|默认值|
|:-|:-|:-|:-|:-|
|to|路由跳转对象，同 vue-router 的 to|String/Object|——|——|
|replace|在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录|Boolean|——|false|
----

<div id="button"></div>

### button (按钮)
#### 示例
> 自适应大小
> ```HTML
> <fan-button>自适应按钮</fan-button>
> ```
> 固定大小
> ```HTML
> <fan-button size="extra-small">迷你按钮</fan-button>
> ```

#### Attributes
|参数|说明|类型|可选值|默认值|
|:-|:-|:-|:-|:-|
|size|尺寸|String|extra-small / small / medium / large / extra-large|——|
|min-size|最小尺寸|String|extra-small / small / medium / large / extra-large|——|
|max-size|最大尺寸|String|extra-small / small / medium / large / extra-large|——|
|type|类型(尚未实现)|String|——|default|
|round|是否圆角按钮|Boolean|——|false|
|circle|是否圆形按钮|Boolean|——|false|
|disabled|是否禁用状态|Boolean|——|false|
|icon|图标|String|——|——|
|native-type|图标|String|——|——|
|back-color|背景色|String|——|——|
|text-color|文字颜色|String|——|——|
|hover-back-color|鼠标悬浮时背景色|String|——|——|
|hover-text-color|鼠标悬浮时文字颜色|String|——|——|
|active-back-color|点击时背景色|String|——|——|
|active-text-color|点击时文字颜色|String|——|——|
----

<div id="image"></div>

### image (图片)
#### 示例
> 基础用法
> ```HTML
> <fan-image src="https://crazy-gt.com/crazy-js/images/logo.png" />
> ```

#### Attributes
|参数|说明|类型|可选值|默认值|
|:-|:-|:-|:-|:-|
|src|图片源，同原生|String|——|——|
|fit|确定图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)|String|——|——|
|alt|原生 alt|String|——|——|
|referrer-policy(尚未实现)|原生 referrerPolicy|String|——|——|
|lazy(尚未实现)|是否开启懒加载|Boolean|——|——|
|width|宽度|String|——|——|
|height|高度|String|——|——|
#### Events
|事件名称|说明|回调参数|
|:-|:-|:-|
|load|图片加载成功触发|(event: Event)|
|error|图片加载失败触发|(event: Error)|
#### Slots
|名称|说明|
|:-|:-|
|loading|图片加载时内容|
|error|加载失败的内容|
----

<div id="input"></div>

### input (输入框)
#### 示例
> 基础用法
> ```HTML
> <fan-input v-model="text" />
> ```
> 使用show-password属性即可得到一个可切换显示隐藏的密码框
> ```HTML
> <fan-input v-model="text" show-password />
> ```

#### Attributes
|参数|说明|类型|可选值|默认值|
|:-|:-|:-|:-|:-|
|value/v-model|绑定值|String/Number|——|——|
|size|尺寸|String|extra-small / small / medium / large / extra-large|——|
|min-size|最小尺寸|String|extra-small / small / medium / large / extra-large|——|
|max-size|最大尺寸|String|extra-small / small / medium / large / extra-large|——|
|type|类型|String|text，textarea和其他[原生input的type值](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)|text|
|disabled|禁用|Boolean|——|false|
|clearable|是否可清空|Boolean|——|false|
|placeholder|输入框占位文本|String|——|——|
|show-password|是否显示切换密码图标|Boolean|——|false|
|name|原生属性|String|——|——|
#### Events
|事件名称|说明|回调参数|
|:-|:-|:-|
|blur|在input失去焦点时触发|(event: Event)|
|focus|在input获得焦点时触发|(event: Event)|
|change|仅在输入框失去焦点或用户按下回车时触发|(value: String/Number)|
|input|在input值改变时触发|(value: String/Number)|
|clear|在点击由 clearable 属性生成的清空按钮时触发|——|
----
