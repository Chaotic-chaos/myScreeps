# myScreeps
- 一份对游戏`screeps`的代码备份仓库

# 说明
- 代码均为个人书写/网上摘取
- 每次上传前保证代码可长时间稳定运行

# 命名方式
- `main.js`为主代码
- `role.*.js`为角色模块，分别控制文件名所指的劳工角色运动
- `construction.*.js`为建筑模块，分别控制文件名所指的建筑运动

# 目前所具备的功能
1. harvester自动寻找建筑物进行能量补充
2. upgrader自动寻找controller进行升级，劳工数保持在10-
3. builder自动寻找construction site进行建筑建造
4. 防御塔自动寻找攻击目标进行攻击（消耗能量）
5. 防御塔自动寻找需要修理的目标进行修理（消耗能量）
6. 各角色数量自动维护：
  a. harvester <= 5
  b. upgrader <= 10
  c. builder按需动态控制：
       i. 有建造点：<= 5
       ii. 无建造点：<= 1

## To be Continue...
