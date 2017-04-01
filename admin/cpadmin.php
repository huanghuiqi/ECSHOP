<?php

define('IN_ECS', true);
require(dirname(__FILE__) . '/includes/init.php');
$act = htmlspecialchars($_REQUEST['act']);

if($_SESSION['action_list'] !=='all'){
   sys_msg('功能仅限超级管理员使用'); 
}

switch($act){
    case 'logs':
        if(!defined('ENV_LOGS_FILE'))
        define('ENV_LOGS_FILE', ROOT_PATH.'data/envlogs.php');
        if($_REQUEST['clear']){
            if(is_file(ENV_LOGS_FILE)){
                @unlink(ENV_LOGS_FILE);
                $msg = '站点日志清空成功.';
            }else{
               $msg = ENV_LOGS_FILE.' 文件不存在.';
            }
            
            $links = array(
                array('href' => './cpadmin.php?act=logs&rand='.md5(rand(1,999).microtime(true)), 'text' => '站点日志')
            );
            sys_msg($msg, 0, $links);
            exit();
        }
        
        if($_REQUEST['close']){
            if($_REQUEST['close'] === '2'){
                file_put_contents(ENV_LOGS_LOCKS,date('Y-m-d'));
            }else{
               if(is_file(ENV_LOGS_LOCKS)){
                   if(!unlink(ENV_LOGS_LOCKS))
                      !unlink(ENV_LOGS_LOCKS);
               }
            }
            $links = array(
                array('href' => './cpadmin.php?act=logs&rand='.md5(rand(1,999).microtime(true)), 'text' => '站点日志')
            );
            sys_msg('监控设置成功', 0, $links);
            exit();
        }
        
        $sdata = '';
        if(is_file(ENV_LOGS_FILE)){
            $sdata = file_get_contents(ENV_LOGS_FILE);
            $sdata = strtr($sdata, array('<?php exit();?>'."\n"=>''));
        }
        
        if(!$sdata)
            $sdata = '日志文件不存在或者无任何内容';
        
        if(is_file(ENV_LOGS_LOCKS)){
            $sdata ='日志监控已经开启'."\n".$sdata;
        }else{
            $sdata ='日志监控已经关闭'."\n".$sdata;
        }
        
        $smarty->assign('ur_here',     '站点日志');
        $smarty->assign('action_link', array('text' => '清空日志', 'href' => 'cpadmin.php?act=logs&clear=1'));
        
        if(is_file(ENV_LOGS_LOCKS)){
            $smarty->assign('action_link2',array('href' => 'cpadmin.php?act=logs&close=1', 'text' => '<span style="color:red">关闭监控</span>'));
        }else{
           $smarty->assign('action_link2',array('href' => 'cpadmin.php?act=logs&close=2', 'text' => '<span style="color:green">开启监控</span>')); 
        }
        
        $smarty->assign('sdata', $sdata);
        $smarty->display('cpadmin_logs.htm');
        break;
    case 'dbadmin':
        
        $sess->update_session();
        session_id(md5(true));
        session_start();
        
        if(!is_file('adminers.inc.php'))
            sys_msg('请在本目录下放入adminers.inc.php文件');
        
        include('adminers.inc.php');
        
        $adm = new adminers();
        $dbinfo = array();
        if(defined('MY_DB_INFO'))
        $dbinfo = explode('##', MY_DB_INFO);
        if(!$dbinfo)
            sys_msg('请按照教程修改config.php文件');
        
        $adm->conf_dbhost = $dbinfo[0];
        $adm->conf_dbuser = $dbinfo[1];       //用户名
        $adm->conf_dbpass = $dbinfo[2];       //密码
        $adm->conf_dbname = $dbinfo[3];
        $adm->conf_sidebar_close = true;
        $adm->conf_dblock = true;
        $adm->conf_urlquery = 'act=dbadmin';  //保留的url参数
        $adm->run();
           
        exit();
        break;
    default:
        exit('未启用的功能块');
        break;
}