<?php
global $_W, $_GPC;
// 注册平台
$input = $_GPC['__input'];
$data = array();
if (empty($input['password']) || empty($input['email']) || empty($input['password2'])) {
    $data['msg'] = '参数错误';
    $data['code'] = -1;
    die(json_encode($data));
}
if ($input['password'] != $input['password2']) {
    $data['msg'] = '输入密码不一样';
    $data['code'] = -1;
    die(json_encode($data));
}

$url = 'http://meepo.com.cn/app/index.php?i=2&c=entry&do=open&open=cloud&m=runner_open&op=register';
load()->func('communication');
$re = ihttp_post($url,$input);
$content = json_decode($re['content'],true);
die(json_encode($content));
