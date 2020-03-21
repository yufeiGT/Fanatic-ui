### 布局容器
* [header](#header)
* [main](#main)
* [aside](#aside)
* [conainer](#conainer)
* [footer](#footer)
----

### 组件列表
* [adapt](#adapt)
* [breadcrumb](#breadcrumb)
* [button](#button)
* [image](#image)
* [input](#input)
* [menu](#menu)
* [slider](#slider)
* [switch](#switch)
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
> ```html
> <fan-adapt type="extra-small">我是最小的</fan-adapt>
> <adapt-extra-small>我是最小的</adapt-extra-small>
> ```
> 在页面尺寸不是extra-small是显示
> ```html
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
> ```html
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
> ```html
> <fan-button>自适应按钮</fan-button>
> ```
> 固定大小
> ```html
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
> ```html
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
> ```html
> <fan-input v-model="text" />
> ```
> 使用show-password属性即可得到一个可切换显示隐藏的密码框
> ```html
> <fan-input v-model="text" show-password />
> ```

#### Attributes
|参数|说明|类型|可选值|默认值|
|:-|:-|:-|:-|:-|
|value / v-model|绑定值|String/Number|——|——|
|size|尺寸|String|extra-small / small / medium / large / extra-large|——|
|min-size|最小尺寸|String|extra-small / small / medium / large / extra-large|——|
|max-size|最大尺寸|String|extra-small / small / medium / large / extra-large|——|
|type|类型|String|text，textarea和其他[原生input的type值](https://developer.mozilla.org/en-US/docs/Web/html/Element/input#Form_%3Cinput%3E_types)|text|
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

<div id="menu"></div>

### menu (导航菜单)
#### 示例
> ```html
> <fan-menu>
> 	<template slot="logo">
> 		<img src="https://crazy-gt.com/crazy-js/images/logo.png">
> 	</template>
> 	<template slot="title">菜单标题</template>
> 	<fan-menu-item icon="fan-icon-behance-outline">
> 		<router-link to="/">首页</router-link>
> 	</fan-menu-item>
> 	<fan-submenu index="1">
> 		<template slot="title">菜单</template>
> 		<fan-menu-item>子菜单1</fan-menu-item>
> 		<fan-menu-item>子菜单2</fan-menu-item>
> 	</fan-submenu>
> </fan-menu>
> ```

#### menu Attributes
#### menu item Attributes
#### submenu Attributes
----

<div id="slider"></div>

### slider (滑块)
> 通过拖动滑块在一个固定区间内进行选择

#### 示例
> 基础用法
> ```html
> <fan-slider v-model="value" />
> ```
> 竖向模式
> ```html
> <fan-slider v-model="value" height="300px" />
> ```

#### Attributes
|参数|说明|类型|可选值|默认值|
|:-|:-|:-|:-|:-|
|size|尺寸|String|extra-small / small / medium / large / extra-large|——|
|min-size|最小尺寸|String|extra-small / small / medium / large / extra-large|——|
|max-size|最大尺寸|String|extra-small / small / medium / large / extra-large|——|
|value / v-model|绑定值|Number|——|——|
|min|最小值|Number|——|0|
|max|最大值|Number|——|100|
|color|背景及文本颜色|String|——|#DCDFE6|
|active-color|激活的背景及tooltip颜色|String|——|#333|
|step-color|间断点颜色|String|——|#FFF|
|disabled|是否禁用|Boolean|——|false|
|step|步长|Number|——|1|
|show-stops|是否显示间断点|Boolean|——|false|
|show-tooltip(尚未实现)|是否显示tooltip|Boolean|——|true|
|format-tooltip(尚未实现)|格式化tooltip message|Function(value)|——|——|
|tooltip-class(尚未实现)|为tooltip添加类|String|——|——|
|range(尚未实现)|是否为范围选择|Boolean|——|false|
|height|slider高度，设置后变为竖向模式|String|——|——|
|marks|标记， key 的类型必须为 number 且取值在闭区间 [min, max] 内|Object|——|——|
#### Events
|事件名称|说明|回调参数|
|:-|:-|:-|
|change|值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发）|(value: Number)|
|input|数据改变时触发（使用鼠标拖曳时，活动过程实时触发）|(value: Number)|
----

<div id="switch"></div>

### switch (开关)
> 表示两种相互对立的状态间的切换，多用于触发「开/关」。

#### 示例
> 基础用法
> ```html
> <fan-switch v-model="value" />
> ```
> 添加文字描述
> ```html
> <fan-switch v-model="value" active-text="开启" inactive-text="关闭" />
> ```

#### Attributes
|参数|说明|类型|可选值|默认值|
|:-|:-|:-|:-|:-|
|size|尺寸|String|extra-small / small / medium / large / extra-large|——|
|min-size|最小尺寸|String|extra-small / small / medium / large / extra-large|——|
|max-size|最大尺寸|String|extra-small / small / medium / large / extra-large|——|
|value / v-model|绑定值|Boolean / String / Number|——|——|
|width|switch的宽度（像素）|Number|——|——|
|active-icon|switch打开时所显示图标，设置此项会忽略active-text|String|——|——|
|inactive-icon|switch关闭时所显示图标，设置此项会忽略active-text|String|——|——|
|active-text|switch打开时的文字描述|String|——|——|
|inactive-text|switch关闭时的文字描述|String|——|——|
|active-value|switch打开时的值|Boolean / String / Number|——|true|
|inactive-value|switch关闭时的值|Boolean / String / Number|——|false|
|active-color|switch打开时的颜色|String|——|#333|
|inactive-color|switch关闭时的颜色|String|——|#DCDFE6|
|name|switch对应的name属性|String|——|——|
|disabled|是否禁用|Boolean|——|false|
#### Events
|事件名称|说明|回调参数|
|:-|:-|:-|
|change|switch状态发生变化时的回调函数|(value: Boolean / String / Number)
#### Methods
|方法名|说明|参数|
|:-|:-|:-|
|focus|使switch获取焦点|——|
----