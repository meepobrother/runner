<?php
global $_W,$_GPC;
$_W['uniacid'] = $_W['uniacid'] ? $_W['uniacid'] : $_GPC['i'];
die(json_encode(
    array(
        '_w'=> $_W,
        '_gpc'=> $_GPC
    )
));