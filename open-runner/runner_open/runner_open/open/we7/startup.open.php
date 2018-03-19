<?php
global $_W, $_GPC;
$_W['uniacid'] = $_W['uniacid'] ? $_W['uniacid'] : $_GPC['i'];

$pindex = max(1, intval($_GPC['page']));
$psize = 15;

$account_table = table('account');
$account_table->searchWithType(array(ACCOUNT_TYPE_OFFCIAL_NORMAL, ACCOUNT_TYPE_OFFCIAL_AUTH));
$account_count = $account_table->searchAccountList();
$total = count($account_count);
$account_table->searchWithType(array(ACCOUNT_TYPE_OFFCIAL_NORMAL, ACCOUNT_TYPE_OFFCIAL_AUTH));

$keyword = trim($_GPC['keyword']);
if (!empty($keyword)) {
    $account_table->searchWithKeyword($keyword);
}

$letter = $_GPC['letter'];
if (isset($letter) && strlen($letter) == 1) {
    $account_table->searchWithLetter($letter);
}

$account_table->accountRankOrder();
// $account_table->searchWithPage($pindex, $psize);

// 公众号列表
$account_list = $account_table->searchAccountList();
$account_list = array_values($account_list);
foreach ($account_list as &$account) {
    $account = uni_fetch($account['uniacid']);
    $account['starttime'] = Date('y-m-d', $account['starttime']);
    $account['fans'] = pdo_getall('mc_members', array('uniacid' => $account['uniacid']), array('uid', 'nickname', 'avatar'), '', 'createtime DESC', 10);
    $account['role'] = permission_account_user_role($_W['uid'], $account['uniacid']);
}
unset($account);

$menus = array();
$menu = array(
    'text' => '主导航',
    'group' => true,
    'children' => array(
        array(
            'text' => '切换公众号',
            'link' => '/web/site/entry/runner_open/index',
            'icon' => 'anticon anticon-setting',
        ),
    ),
);
$menus[] = $menu;

$menu = array(
    'text' => '前台',
    'group' => true,
    'children' => array(
        array(
            'text' => '前台入口',
            'link' => '/web/site/entry/runner_open/appopen',
            'icon' => 'anticon anticon-setting',
        ),
    ),
);
$menus[] = $menu;

$menu = array(
    'text' => 'PC端',
    'group' => true,
    'children' => array(
        array(
            'text' => 'pc端入口',
            'link' => '/web/site/entry/runner_open/webopen',
            'icon' => 'anticon anticon-setting',
        )
    ),
);
$menus[] = $menu;

$menu = array(
    'text' => '管理端',
    'group' => true,
    'acl' => 'manager,admin',
    'children' => array(
        array(
            'text' => '任务管理',
            'link' => '/web/site/entry/runner_open/tasks',
            'icon' => 'anticon anticon-setting',
        ),
        array(
            'text' => '跑腿管理',
            'link' => '/web/site/entry/runner_open/runners',
            'icon' => 'anticon anticon-setting',
        ),
        array(
            'text' => '店铺管理',
            'link' => '/web/site/entry/runner_open/shops',
            'icon' => 'anticon anticon-setting',
        ),
        array(
            'text' => '会员管理',
            'link' => '/web/site/entry/runner_open/members',
            'icon' => 'anticon anticon-setting',
        ),
    ),
);
$menus[] = $menu;

$menu = array(
    'text' => '系统设置',
    'group' => true,
    'acl' => 'manager,admin',
    'children' => array(
        array(
            'text' => '基础设置',
            'link' => '/web/site/entry/runner_open/setting',
            'icon' => 'anticon anticon-setting',
        ),
    ),
);
$menus[] = $menu;

$menu = array(
    'text' => '数据统计',
    'group' => true,
    'acl' => 'manager,admin',
    'children' => array(
        array(
            'text' => '访问统计',
            'link' => '/web/site/entry/runner_open/fangwen',
            'icon' => 'anticon anticon-setting',
        ),
    ),
);
$menus[] = $menu;

$menu = array(
    'text' => '站长特权',
    'group' => true,
    'acl' => 'admin',
    'children' => array(),
);
$menus[] = $menu;

// 消息
load()->model('message');
$message_table = table('message');
$message_table->searchWithIsRead(1);
$lists = $message_table->messageList($type);
$lists = message_list_detail($lists);

$data = array();
$data['accounts'] = $account_list;
$data['uniacid'] = $_W['uniacid'];
$data['uid'] = $_W['uid'];
$data['user'] = $_W['user'];
$data['isfounder'] = user_is_founder($_W['uid']);
$data['menu'] = $menus;
$data['messages'] = $lists;

die(json_encode($data));
