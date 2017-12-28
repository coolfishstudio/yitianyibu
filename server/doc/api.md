# api设计
post /api/login 登录
post /api/logout 退出

post /api/article 发表文章
get /api/article 获取文章列表
get /api/article/:articleId 获取文章详情
put /api/article/:articleId 修改文章
delete /api/article/:articleId 删除文章

post /api/category 创建类别
get /api/category 获取类别列表
get /api/category/:category 获取类别详情
put /api/category/:category 修改类别
delete /api/category/:category 删除类别

post /api/tag 创建标签
get /api/tag 获取标签列表
get /api/tag/:tag 获取标签详情
put /api/tag/:tag 修改标签
delete /api/tag/:tag 删除标签

post /api/app 创建应用
get /api/app 获取应用列表
get /api/app/:app 获取应用详情
put /api/app/:app 修改应用
delete /api/app/:app 删除应用

post /api/notice 创建公告
get /api/notice 获取公告列表
get /api/notice/:notice 获取公告详情
put /api/notice/:notice 修改公告
delete /api/notice/:notice 删除公告

post /api/message 创建留言
get /api/message 获取留言列表
get /api/message/:message 获取留言详情
delete /api/message/:message 删除留言

post /api/comment 创建评论
get /api/comment/by/article/:article 获取评论列表
get /api/comment/by/article/:article/:comment 获取评论详情
delete /api/comment/by/article/:article/:comment 删除评论

post /api/log 创建日志
get /api/log 获取日志列表
get /api/log/:log 获取日志详情
put /api/log/:log 修改日志
delete /api/log/:log 删除日志


返回值接口
{"status":{"code":0,"message":"success"},"data":{}}
{"status":{"code":"unknow","message":"No authentication token found\n"}}
