1. 多语言下， hash不能写死， 需要考虑当前语言
    - 重新整理了一下点击后的url的控制,详情看main.js
2. hash与section双向绑定
    - 重新整理了一下滚动的url的控制,详情看main.js
3. bug： header product下拉框连续点两下 回到/null
    - 点击处没做冒泡处理(因为子菜单处注释了),详情看main.js + header.html
4. products section button点击失效 （不确定啥问题）
    - 点击处没做冒泡处理(因为子菜单处注释了),详情看main.js + header.html