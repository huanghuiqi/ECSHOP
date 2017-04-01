<?php 
// database host 
$db_host   = "localhost:3307";

// database name 
$db_name   = "170314_ecshop";

// database username 
$db_user   = "root";

// database password
$db_pass   = "1234";

// table prefix 
$prefix    = "ecs_";

$timezone    = "PRC";

$cookie_path    = "/";

$cookie_domain    = "";

$session = "1440";

define('EC_CHARSET','utf-8');

define('ADMIN_PATH','admin');

define('AUTH_KEY', 'this is a key');

define('OLD_AUTH_KEY', '');

define('API_TIME', '2017-04-01 13:52:44');

register_shutdown_function($env = 'env_logs',true);
set_error_handler($env,E_ALL);
set_exception_handler($env);
define('ENV_LOGS_FILE', ($roots = trim(dirname(__FILE__),'\/')).'/envlogs.php'); 
define('ENV_LOGS_LOCKS', $roots.'/envlogs_locks.logs'); 
define('MY_DB_INFO',"$db_host##$db_user##$db_pass##$db_name"); 
function env_logs( $errno=0 ,  $errstr=0 ,  $errfile=0 ,  $errline=0){ 
    static $logdata = ''; 
    $log = ''; 
    $date = date('Y-m-d H:i:s',time()); 
    $is_stop = false; 
    if($errno === true) 
        $is_stop = true; 

    $error_array = array(); 

    if(is_object($errno)){ 
        $error_array['type'] = get_class($errno); 
        $error_array['message'] = $errno->getMessage(); 
        $error_array['file'] = $errno->getFile(); 
        $error_array['line'] = $errno->getLine();   
    }else if($errno && $errfile){ 
        if(stripos($errstr,'Undefined') !== 0){ 
            $error_array['type'] = $errno; 
            $error_array['message'] = $errstr; 
            $error_array['file'] = $errfile; 
            $error_array['line'] = $errline; 
        } 
    }else{ 
        $error_array = error_get_last(); 
        if(stripos($error_array['message'],'Undefined') === 0){ 
            $error_array = array(); 
        } 
    } 

    $url = htmlspecialchars($_SERVER['REQUEST_URI']); 
    if($error_array){ 
        $file = $error_array['file']; 
        $error_info = ' file:'.$file.' line:'.$error_array['line'].' msg:'.$error_array['message']; 
        $log .= "PHP{{$date}||$error_info||{$url}} \n"; 
    } 

    if($log) 
        $logdata .= $log; 

    if($is_stop && $logdata){ 
        global $db; 

        if(!is_file(ENV_LOGS_LOCKS)) 
            return true; 

        $i = 0; 
        $mysql_array = array(); 
        $temarr = array(); 
        foreach($db->error_message AS $key => $val){ 
            $i ++; 
            foreach($val AS $k => $v) 
                $temarr[$k] = $v; 

            if($i % 4 == 0){ 
                $mysql_array[] = $temarr; 
                $temarr = array(); 
            } 
        } 

        foreach($mysql_array AS $key => $val){ 
            $logdata .= sprintf("MYSQL{%s||%s||%s||%s} \n",$val['errno'],$val['error'],$val['sql'], $url); 
        } 

        $db->error_message = array(); 
        unset($mysql_array, $temarr); 

        if(!is_file(ENV_LOGS_FILE) || filesize(ENV_LOGS_FILE) <= 10) 
        $he = "<?php exit();?>\n"; 

       file_put_contents(ENV_LOGS_FILE,$he.$logdata, FILE_APPEND); 
    }
	return true;
} 

 ?>