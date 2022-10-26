module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {

            // 自定义Less变量
            'transparent': '#fff0',

            // 导航顶部主题样式
            // 'nav-bar-background-color': '@blue',
            // 'nav-bar-icon-color': '@white',
            // 'nav-bar-text-color': '@white',
            // 'nav-bar-title-text-color':'@white',
            
            // 网格主题样式
            'grid-item-content-background-color': '#0000',
            
            // 底部选项卡主题样式
            'tabbar-item-active-color':'@blue',

            // 搜索框主题样式
            'search-background-color':'@transparent',
            'search-input-height':'24px',
            'search-content-background-color':'#fff', 

            // treeSelect主题样式 
            'tree-select-item-active-color': '@blue',

            // 滚动水平导航主题样式
            'tabs-bottom-bar-height': '2px',
            'tab-font-size': '0.9em',
            
          },
        },
      },
    },
  },
};