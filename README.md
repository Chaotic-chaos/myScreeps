# myScreeps
- 一份对游戏`screeps`的代码备份仓库

# 说明
- 代码均为个人书写/网上摘取
- 每次上传前保证代码可长时间稳定运行

# 命名方式
- `main.js`为主代码
- `role.*.js`为角色模块，分别控制文件名所指的劳工角色运动
- `construction.*.js`为建筑模块，分别控制文件名所指的建筑运动
- `sys.*.js`为全局模块，基本为一些全局环境下使用的函数

# 初版所具备的功能
1. harvester自动寻找建筑物进行能量补充
2. upgrader自动寻找controller进行升级，~~劳工数保持在10-~~
3. builder自动寻找construction site进行建筑建造
4. 防御塔自动寻找攻击目标进行攻击（消耗能量）
5. 防御塔自动寻找需要修理的目标进行修理（消耗能量）
6. ~~各角色数量自动维护：~~
  ~~a. harvester <= 5~~
  ~~b. upgrader <= 3~~
  ~~c. builder按需动态控制：~~
       ~~i. 有建造点：<= 2~~
       ~~ii. 无建造点：<= 1~~


# 后续更新

## 2020.04.24更新
1. 添加了日志系统文件`sys.log.js`，具体用法请查看文件注释
2. 更新了矿工`part`数量，基本做到矿产重生之前一次性采光
3. 更新了控制台日志的输出结构，便于查看每一个tick中的代码执行情况 

## 2020.04.25更新
1. bugFix：防御塔维护逻辑错误，修复
2. newFeature：增加矿工行动时的信息提示
3. newFeature：增加防御塔工作时的信息提示

## 2020.04.29更新
1. newFeature：增加container的充能工作（由builder完成）
2. newFeature：暂停了builder的维护工作，全部交由tower负责
3. bugFix：harvester采矿位置固定为同一个矿点，调整采矿分配
4. waitingToFinish：为container专门分配充能角色，让upgrader工作更加专心（待验证可行性）

## 2020.05.01更新
1. newFeature：增加了一个新的角色模块containerTransfer，负责转运能量（mine -> container）
2. bugFix：修改upgrader的功能部件，使之尽可能多的work，少carry, 少move
3. newFeature：增设角色distributor，想法上是守在link旁边进行远程传送能量的分发存储工作，待完善

## 2020.05.02更新
1. newFeature：增加了建筑link的逻辑控制，目前使用ID管理，后期如果有需要在进行优化
2. bugFix：完善了distributor角色的逻辑功能，目前实现守在spawn旁边进行能量补充
3. waitingToFinish：人力过剩问题目前比较严重，需要解决
4. newFeature：取消了upgrader的挖矿功能，老老实实等着人给喂饭

## To be Continue...
