<?php
global $_W, $_GPC;
$input = $_GPC['__input'];
$url = 'http://meepo.com.cn/app/index.php?i=2&c=entry&do=open&open=cloud&m=runner_open&op=login';
load()->func('communication');
$re = ihttp_post($url,$input);
$content = json_decode($re['content'],true);
die(json_encode($content));
