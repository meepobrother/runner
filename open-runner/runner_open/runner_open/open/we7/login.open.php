<?php
global $_W, $_GPC;
load()->model('user');
load()->model('message');
load()->classs('oauth2/oauth2client');
load()->model('setting');

$input = $_GPC['__input'];

$_GPC['username'] = $input['userName'];
$_GPC['password'] = $input['password'];

if (empty($_GPC['login_type'])) {
    $_GPC['login_type'] = 'system';
}
if (empty($_GPC['handle_type'])) {
    $_GPC['handle_type'] = 'login';
}
if ($_GPC['handle_type'] == 'login') {
    $member = OAuth2Client::create($_GPC['login_type'], $_W['setting']['thirdlogin'][$_GPC['login_type']]['appid'], $_W['setting']['thirdlogin'][$_GPC['login_type']]['appsecret'])->login();
} else {
    $member = OAuth2Client::create($_GPC['login_type'], $_W['setting']['thirdlogin'][$_GPC['login_type']]['appid'], $_W['setting']['thirdlogin'][$_GPC['login_type']]['appsecret'])->bind();
}

if (!empty($_W['user']) && $_GPC['handle_type'] == 'bind') {
    if (is_error($member)) {
        return $this->result('fail', $member['message']);
    } else {
        return $this->result('ok', '绑定成功');
    }
}

if (is_error($member)) {
    return $this->result('fail', $member['message']);
}

$record = user_single($member);
if (!empty($record)) {
    if ($record['status'] == USER_STATUS_CHECK || $record['status'] == USER_STATUS_BAN) {
        return $this->result('fail', '您的账号正在审核或是已经被系统禁止，请联系网站管理员解决');
    }
    $_W['uid'] = $record['uid'];
    $_W['isfounder'] = user_is_founder($record['uid']);
    $_W['user'] = $record;
    if (empty($_W['isfounder'])) {
        if (!empty($record['endtime']) && $record['endtime'] < TIMESTAMP) {
            return $this->result('fail', '您的账号有效期限已过，请联系网站管理员解决！');
        }
    }
    if (!empty($_W['siteclose']) && empty($_W['isfounder'])) {
        return $this->result('fail', '站点已关闭，关闭原因:' . $_W['setting']['copyright']['reason']);
    }
    $cookie = array();
    $cookie['uid'] = $record['uid'];
    $cookie['lastvisit'] = $record['lastvisit'];
    $cookie['lastip'] = $record['lastip'];
    $cookie['hash'] = md5($record['password'] . $record['salt']);
    $session = authcode(json_encode($cookie), 'encode');
    isetcookie('__session', $session, !empty($_GPC['rember']) ? 7 * 86400 : 0, true);
    $status = array();
    $status['uid'] = $record['uid'];
    $status['lastvisit'] = TIMESTAMP;
    $status['lastip'] = CLIENT_IP;
    user_update($status);
    if (empty($forward)) {
        $forward = user_login_forward($_GPC['forward']);
    }
    // 只能跳到本域名下
    $forward = safe_gpc_url($forward);
    if ($record['uid'] != $_GPC['__uid']) {
        isetcookie('__uniacid', '', -7 * 86400);
        isetcookie('__uid', '', -7 * 86400);
    }
    $failed = pdo_get('users_failed_login', array('username' => trim($_GPC['username']), 'ip' => CLIENT_IP));
    pdo_delete('users_failed_login', array('id' => $failed['id']));
    // 生成token
    // 删除之前登录
    pdo_delete('runner_open_token', array('uid' => $record['uid']));
    $data = array();
    $data['uid'] = $record['uid'];
    $data['notice_str'] = random(16, false);
    $data['express_in'] = time() + 60 * 60 * 30;
    $data['sign'] = bulidSign($data);
    pdo_insert('runner_open_token', $data);
    $record['password'] = $data['sign'];
    return $this->result('ok', '欢迎回来', $record);
} else {
    if (empty($failed)) {
        pdo_insert('users_failed_login', array('ip' => CLIENT_IP, 'username' => trim($_GPC['username']), 'count' => '1', 'lastupdate' => TIMESTAMP));
    } else {
        pdo_update('users_failed_login', array('count' => $failed['count'] + 1, 'lastupdate' => TIMESTAMP), array('id' => $failed['id']));
    }
    return $this->result('fail', '登录失败，请检查您输入的账号和密码');
}
