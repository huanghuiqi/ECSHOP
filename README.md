# ECSHOP
ECSHOP二次开发


#### 1、安装后现在include - init.php - define('DEBUG_MODE', 0); - 0改为2

#### 2、library - member_info.lbi  登录和注册按钮

#### 3、登录注册静态代码放进 page_header.lbi 后，要在index.dwt中引入   

	<!-- #BeginLibraryItem "/library/page_header.lbi" --><!-- #EndLibraryItem -->

#### 4、模板管理-设置模板 可以修改显示的商品数目

#### 5、商店设置- 显示设置 可以设置缩略图大小 然后在 商品管理 - 图片批量处理 更新图片

#### 6、有些图片加载不出是因为路径原因 改成/vmall/images/...

#### 7、底部的帮助中心内容在 文章管理 - 文章分类 中  help.lib

#### 8、修改底部copyright内容，在languages 下的 zh-cn - common.php 搜索copyright 替换里面的内容就行了

#### 9、分类模块 category.dwt

#### 10、分类模块的面包屑导航 ur_here.php

#### 11、商品列表在good_list.lbi 

#### 12、商品列表的分页在page.lbi

#### 13、二级页面的子目录 - 增加分类目录  在主目录的 category.php

#### 14、搜索功能 search.dwt
