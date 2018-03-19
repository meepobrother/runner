<?php
global $_W, $_GPC;
include IA_ROOT . "/addons/runner_open/open/_function.php";
$input = $_GPC['__input'];
$price_token = $input['price_token'];

die(json_encode($return));
