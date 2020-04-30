//数据大盘的管理模块
/*
    全局的数据大盘统计模块，负责监控全局目前的工作情况，使用方式：
        1. var statusMonitor = require('sys.dataMonitor');
        2. statusMonitor.run();
*/
var statusMonitor = {
    run: function(){
        //每20 tick运行一次，节约系统资源
        if(Game.time % 20) return;

        //为系统内存添加状态字段
        if(!Memory.status) Memory.status = {};

        //统计GCL（全局控制器等级）、GPL（全局超能等级）及其升级进度
        Memory.status.gcl = (Game.gcl.progress / Game.gcl.progressTotal) * 100;
        Memory.status.gclLevel = Game.gcl.level;
        Memory.status.gpl = (Game.gpl.progress / Game.gpl.progressTotal) * 100;
        Memory.status.gplLevel = Game.gpl.level;
        //CPU当前使用量
        Memory.status.cpu = Game.cpu.getUsed();
        //bucket使用量
        Memory.status.bucket = Game.cpu.bucket;

    }
};

module.exports = statusMonitor;