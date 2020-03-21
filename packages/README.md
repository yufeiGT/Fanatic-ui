## 组件列表

### adapt (响应式组件)
> 通过adapt组件创建在页面不同尺寸下插槽内容的显示与隐藏

#### 扩展组件
> 针对不同尺寸扩展的组件，无需传入type参数
**adapt-extra-small**
**adapt-small**
**adapt-medium**
**adapt-large**
**adapt-extra-large**

#### 示例
> 在页面尺寸是extra-small时显示
```HTML
<fan-adapt type="extra-small">我是最小的</fan-adapt>
<adapt-extra-small>我是最小的</adapt-extra-small>
```
在页面尺寸不是extra-small是显示
```HTML
<fan-adapt type="extra-small" reverse>我不在最小时显示</fan-adapt>
<adapt-extra-small>
	<adapt-reverse>我不在最小时显示</adapt-reverse>
</adapt-extra-small>
```

#### adapt-reverse
> 该组件放在只允许放在adapt组件的插槽中

#### Attributes

|参数|说明|类型|可选值|默认值|
|:-|:-|:-|:-|:-|
|type|尺寸类型，规定插槽内容在何时显示与隐藏|String|extra-small / small / medium / large / extra-large|——|
|tag|包裹插槽内容的标签名，可选。默认无包裹标签，在不传并且插槽子数量大于2时默认为div|String|——|——|
|reverse|颠倒渲染结果|Boolean|——|false|