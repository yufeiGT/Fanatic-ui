<template>
	<div id="app">
		<fan-container style="height: 100%;">
			<fan-header>
				<fan-menu :show-logo="true">
					<template slot="logo">
						<img src="https://crazy-gt.com/crazy-js/images/logo.png">
						<adapt-extra-small tag="p" style="float: right; line-height: 30px;" reverse>{{adaptType}}</adapt-extra-small>
					</template>
					<template slot="title">{{adaptType}}</template>
					<fan-menu-item icon="fan-icon-behance-outline">
						<router-link to="/">首页</router-link>
					</fan-menu-item>
					<fan-menu-item icon="fan-icon-behance-outline">
						<router-link to="/container">布局</router-link>
					</fan-menu-item>
					<fan-menu-item>菜单3</fan-menu-item>
					<fan-submenu index="3">
						<template slot="title"><i class="fan-icon-behance-outline"></i>菜单4</template>
						<fan-menu-item>子菜单1</fan-menu-item>
						<fan-menu-item>子菜单2</fan-menu-item>
						<fan-submenu index="3-3">
							<template slot="title">子菜单3</template>
							<fan-menu-item icon="fan-icon-behance-outline">子菜单3 - 1</fan-menu-item>
							<fan-menu-item>子菜单3 - 2</fan-menu-item>
							<fan-submenu index="3-3-3">
								<template slot="title">菜单4</template>
								<fan-menu-item>子菜单1</fan-menu-item>
								<fan-menu-item>子菜单2</fan-menu-item>
								<fan-submenu index="3-3-3-3">
									<template slot="title">子菜单3</template>
									<fan-menu-item>子菜单3 - 1</fan-menu-item>
									<fan-menu-item>子菜单3 - 2</fan-menu-item>
								</fan-submenu>
							</fan-submenu>
						</fan-submenu>
					</fan-submenu>
					<fan-submenu index="4">
						<template slot="title">菜单5</template>
						<fan-menu-item>子菜单1</fan-menu-item>
						<fan-menu-item>子菜单2</fan-menu-item>
					</fan-submenu>
				</fan-menu>
			</fan-header>
			<fan-container>
				<adapt-extra-small tag="fan-aside" reverse>除手机外</adapt-extra-small>
				<fan-main>
					<router-view />
				</fan-main>
			</fan-container>
			<fan-footer>
				<a href="">粤ICP备17065935号-1</a>
			</fan-footer>
		</fan-container>
	</div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
#app{
	height: 100%;
}

.fan-footer{
	text-align: center;
	a{
		overflow: hidden;
		color: #FFF;
	}
}
</style>
