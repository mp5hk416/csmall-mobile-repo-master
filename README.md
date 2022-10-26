# 酷鲨商城移动客户端

## 技术选型
**VantUI**

## 项目安装与配置

### 首先需要运行酷鲨商城服务端项目
```
https://gitee.com/chengheng2022/csmall-repo.git
```

### 配置项目运行环境
1. 安装`nodejs`

  1. 登录网站 `https://nodejs.org/zh-cn/` ，下载长期维护版`nodejs`安装包。
  2. 双击安装完成。

2. 执行命令，配置`nodejs`镜像源：

   ```shell
   # 设置淘宝镜像源  
   npm config set registry https://registry.npm.taobao.org
   
   # 查看使用的镜像源  
   npm config get registry
   ```

   输出若为淘宝镜像源，则设置成功。



### 运行项目

1. 执行`git`命令，拉取项目：

   ```shell
   git clone https://gitee.com/mingxuchn/csmall-mobile-repo.git
   ```

2. 进入`csmall-pms-client`目录，执行命令，安装所需模块：

   ```shell
   cd csmall-mobile-repo
   npm install
   ```

3. 执行命令，启动静态`web`服务：

   ```shell
   npm run serve
   ```

   该命令将编译项目，打包并部署至内置的`8080`服务器，若`8080`被占用，端口会被顺延至`8081`。

4. 访问以下链接即可：

   ```
   http://localhost:8080/
   ```

