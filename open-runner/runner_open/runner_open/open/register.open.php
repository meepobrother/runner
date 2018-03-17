<?php
global $_W, $_GPC;
$errNum = -1;
$msg = '对不起权限不足';
$data = array();
if($this->checkMobile()){
    // 手机端返回数据
}

if($this->checkWeb()){
    // 电脑端返回数据
}
return $this->result($errNum, $msg, $data);
