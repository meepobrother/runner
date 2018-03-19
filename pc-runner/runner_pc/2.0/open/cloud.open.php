<?php
global $_W, $_GPC;

$op = $_GPC['op'];
$op = empty($op) ? 'login' : $op;

if ($op === 'register') {

    $email = trim($_GPC['email']);
    $password = $_GPC['password'];
    $appid = random(16);
    $appkey = md5(serialize($_GPC));
    $mdpassword = md5($password . $appid . $appkey);
    $item = pdo_get('runner_open_cloud', array('email' => $email));
    if (!empty($item)) {
        $data = array();
        $data['msg'] = '此邮箱已被注册';
        $data['code'] = -1;
    } else {
        pdo_insert(
            'runner_open_cloud',
            array(
                'email' => $email,
                'password' => $mdpassword,
                'appid' => $appid,
                'appkey' => $appkey,
                'create_time' => time(),
            )
        );
        $id = pdo_insertid();
    }

    $re = array();
    $re['appid'] = $appid;
    $re['appkey'] = $appkey;
    $re['msg'] = '注册成功';

    die(json_encode($re));
}

if ($op === 'login') {
    $email = trim($_GPC['email']);
    $password = $_GPC['password'];
    $item = pdo_get('runner_open_cloud', array('email' => $email));
    if (!empty($item)) {
        $mdpassword = md5($password . $item['appid'] . $item['appkey']);
        if ($mdpassword != $item['password']) {
            $re = array();
            $re['code'] = -1;
            $re['msg'] = '密码错误';
            die(json_encode($re));
        } else {
            die(json_encode($item));
        }
    } else {
        $re = array();
        $re['code'] = -1;
        $re['msg'] = '用户不存在';
        die(json_encode($re));
    }
}

if ($op === 'forget') {
    // 修改密码业务逻辑
    $re = array();
    $re['code'] = -1;
    $re['msg'] = '未开通';
    die(json_encode($re));
}
