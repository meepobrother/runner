<?php
global $_W, $_GPC;
$data = array();

if ($this->checkMobile()) {
    // 手机端返回数据
}

if ($this->checkWeb()) {
    // 电脑端返回数据
    $data[] = array(
        'title' => '计算订单价格',
        'method' => 'POST',
        'tip' => '(注：参数以form－data方式传递，不是json方式）',
        'code' => 'getorderprice',
        'desc' => '根据订单的位置、距离等基本信息，计算订单的价格，返回pricetoken',
        'params' => array(
            array('name' => 'origin_id', 'type' => 'string', 'need' => true, 'desc' => '第三方对接平台订单id'),
            array('name' => 'from_address', 'type' => 'string', 'need' => true, 'desc' => '起始地址'),
            array('name' => 'from_usernote', 'type' => 'string', 'need' => true, 'desc' => '起始地址'),
            array('name' => 'to_address', 'type' => 'string', 'need' => true, 'desc' => '目的地址'),
            array('name' => 'to_usernote', 'type' => 'string', 'need' => true, 'desc' => '目的地址具体门牌号'),
            array('name' => 'city_name', 'type' => 'string', 'need' => true, 'desc' => '订单所在城市名 称(如郑州市就填”郑州市“，必须带上“市”)'),
            array('name' => 'subscribe_type', 'type' => 'string', 'need' => true, 'desc' => '预约类型 0实时订单 1预约取件时间'),
            array('name' => 'county_name', 'type' => 'string', 'need' => true, 'desc' => '订单所在县级地名称(如金水区就填“金水区”)'),
            array('name' => 'subscribe_time', 'type' => 'string', 'need' => true, 'desc' => '预约时间（如：2015-09-18 14:00:25:000）没有可以传空字符串'),
            array('name' => 'coupon_id', 'type' => 'string', 'need' => true, 'desc' => '优惠券ID(如果传入-1就不用优惠券否则系统自动匹配)'),
            array('name' => 'send_type', 'type' => 'string', 'need' => true, 'desc' => '订单小类 0帮我送(默认) 1帮我买'),
            array('name' => 'to_lat', 'type' => 'string', 'need' => true, 'desc' => '目的地坐标纬度，如果无，传0(坐标系为百度地图坐标系)'),
            array('name' => 'to_lng', 'type' => 'string', 'need' => true, 'desc' => '目的地坐标经度，如果无，传0(坐标系为百度地图坐标系)'),
            array('name' => 'from_lat', 'type' => 'string', 'need' => true, 'desc' => '起始地坐标纬度，如果无，传0(坐标系为百度地图坐标系)'),
            array('name' => 'from_lng', 'type' => 'string', 'need' => true, 'desc' => '起始地坐标经度，如果无，传0(坐标系为百度地图坐标系)'),
            array('name' => 'coupon_amount', 'type' => 'string', 'need' => true, 'desc' => '优惠券金额'),
            array('name' => 'addfee', 'type' => 'string', 'need' => true, 'desc' => '加价金额'),
            array('name' => 'goods_insurancemoney', 'type' => 'string', 'need' => true, 'desc' => '商品保价金额'),
            array('name' => 'openid', 'type' => 'string', 'need' => true, 'desc' => '用户openid,详情见 获取openid接口'),
            array('name' => 'appid', 'type' => 'string', 'need' => true, 'desc' => 'appid'),
            array('name' => 'sign', 'type' => 'string', 'need' => true, 'desc' => '加密签名，详情见 消息体签名算法'),
            array('name' => 'nonce_str', 'type' => 'string', 'need' => true, 'desc' => '随机字符串，不长于32位'),
            array('name' => 'timestamp', 'type' => 'string', 'need' => true, 'desc' => '时间戳，以秒计算时间，即unix-timestamp'),
        ),
        'return' => array(
            array('name' => 'price_token', 'desc' => '金额令牌，提交订单前必须先计算价格'),
            array('name' => 'total_money', 'desc' => '订单总金额（优惠前）'),
            array('name' => 'need_paymoney', 'desc' => '实际需要支付金额'),
            array('name' => 'total_priceoff', 'desc' => '总优惠金额'),
            array('name' => 'distance', 'desc' => '配送距离（单位：米）'),
            array('name' => 'freight_money', 'desc' => '跑腿费'),
            array('name' => 'expires_in', 'desc' => 'Token过期时间'),
            array('name' => 'nonce_str', 'desc' => '随机字符串，不长于32位'),
            array('name' => 'sign', 'desc' => '加密签名，详情见消息体签名算法'),
            array('name' => 'appid', 'desc' => '第三方用户唯一凭证'),
            array('name' => 'return_msg', 'desc' => '返回信息，如非空，为错误原因，如签名失败、参数格式校验错误'),
            array('name' => 'return_code', 'desc' => '状态，ok/fail表示成功'),
        ),
    );
    $data[] = array(
        'title' => '发布订单',
        'method' => 'POST',
        'tip' => '(注：参数以form－data方式传递，不是json方式）',
        'code' => 'addorder',
        'desc' => '价格计算成功后，提交并发布订单',
        'params' => array(
            array('name' => 'price_token', 'type' => 'string', 'need' => true, 'desc' => '金额令牌，计算订单价格接口返回的price_token'),
            array('name' => 'order_price', 'type' => 'string', 'need' => true, 'desc' => '订单金额，计算订单价格接口返回的total_money'),
            array('name' => 'balance_paymoney', 'type' => 'string', 'need' => true, 'desc' => '实际余额支付金额计算订单价格接口返回的need_paymoney'),
            array('name' => 'receiver', 'type' => 'string', 'need' => true, 'desc' => '收件人'),
            array('name' => 'receiver_phone', 'type' => 'string', 'need' => true, 'desc' => '收件人电话'),
            array('name' => 'note', 'type' => 'string', 'need' => true, 'desc' => '订单备注 最长140个汉字'),
            array('name' => 'callback_url', 'type' => 'string', 'need' => true, 'desc' => '订单提交成功后及状态变化的回调地址'),
            array('name' => 'push_type', 'type' => 'string', 'need' => true, 'desc' => '推送方式（0 开放订单，1指定跑男，2商户绑定的跑男）默认传0即可”)'),
            array('name' => 'push_str', 'type' => 'string', 'need' => true, 'desc' => '推送跑男的手机号，push_type为0这里就传空字符串'),
            array('name' => 'special_type', 'type' => 'string', 'need' => true, 'desc' => '特殊处理类型，是否需要保温箱 1需要 0不需要'),
            array('name' => 'callme_withtake', 'type' => 'string', 'need' => true, 'desc' => '取件是否给我打电话 1需要 0不需要'),
            array('name' => 'pubusermobile', 'type' => 'string', 'need' => true, 'desc' => '发件人电话，（如果为空则是用户注册的手机号）'),
            array('name' => 'sign', 'type' => 'string', 'need' => true, 'desc' => '加密签名，详情见 消息体签名算法'),
            array('name' => 'nonce_str', 'type' => 'string', 'need' => true, 'desc' => '随机字符串，不长于32位'),
            array('name' => 'timestamp', 'type' => 'string', 'need' => true, 'desc' => '时间戳，以秒计算时间，即unix-timestamp'),
            array('name' => 'openid', 'type' => 'string', 'need' => true, 'desc' => '用户openid,详情见 获取openid接口'),
            array('name' => 'appid', 'type' => 'string', 'need' => true, 'desc' => 'appid'),
        ),
        'return' => array(
            array('name' => 'ordercode', 'desc' => '订单号'),
            array('name' => 'origin_id', 'desc' => '第三方对接平台订单id'),
            array('name' => 'nonce_str', 'desc' => '随机字符串，不长于32位'),
            array('name' => 'sign', 'desc' => '加密签名，详情见消息体签名算法'),
            array('name' => 'appid', 'desc' => '第三方用户唯一凭证'),
            array('name' => 'return_msg', 'desc' => '返回信息，如非空，为错误原因，如签名失败、参数格式校验错误'),
            array('name' => 'return_code', 'desc' => '状态，ok/fail表示成功'),
        ),
    );
    $data[] = array(
        'title' => '取消订单',
        'method' => 'POST',
        'tip' => '(注：参数以form－data方式传递，不是json方式）',
        'code' => 'cancelorder',
        'desc' => '取消订单',
        'params' => array(
            array('name' => 'order_code', 'type' => 'string', 'need' => true, 'desc' => '跑腿订单编号，order_code和origin_id必须二选其一，如果都传，则只根据order_code返回'),
            array('name' => 'origin_id', 'type' => 'string', 'need' => true, 'desc' => '第三方对接平台订单id，order_code和origin_id必须二选其一，如果都传，则只根据order_code返回'),
            array('name' => 'reason', 'type' => 'string', 'need' => true, 'desc' => '取消原因'),
            array('name' => 'sign', 'type' => 'string', 'need' => true, 'desc' => '加密签名，详情见 消息体签名算法'),
            array('name' => 'nonce_str', 'type' => 'string', 'need' => true, 'desc' => '随机字符串，不长于32位'),
            array('name' => 'timestamp', 'type' => 'string', 'need' => true, 'desc' => '时间戳，以秒计算时间，即unix-timestamp'),
            array('name' => 'openid', 'type' => 'string', 'need' => true, 'desc' => '用户openid,详情见 获取openid接口'),
            array('name' => 'appid', 'type' => 'string', 'need' => true, 'desc' => 'appid'),
        ),
        'return' => array(
            array('name' => 'order_code', 'desc' => '订单号'),
            array('name' => 'origin_id', 'desc' => '第三方对接平台订单id'),
            array('name' => 'nonce_str', 'desc' => '随机字符串，不长于32位'),
            array('name' => 'sign', 'desc' => '加密签名，详情见消息体签名算法'),
            array('name' => 'appid', 'desc' => '第三方用户唯一凭证'),
            array('name' => 'return_msg', 'desc' => '返回信息，如非空，为错误原因，如签名失败、参数格式校验错误'),
            array('name' => 'return_code', 'desc' => '状态，ok/fail表示成功'),
        ),
    );
    $data[] = array(
        'title' => '获取订单详情',
        'method' => 'POST',
        'tip' => '(注：参数以form－data方式传递，不是json方式）',
        'code' => 'getorderdetail',
        'desc' => '获取订单的详细信息',
        'params' => array(
            array('name' => 'order_code', 'type' => 'string', 'need' => true, 'desc' => '跑腿订单编号，order_code和origin_id必须二选其一，如果都传，则只根据order_code返回'),
            array('name' => 'origin_id', 'type' => 'string', 'need' => true, 'desc' => '第三方对接平台订单id，order_code和origin_id必须二选其一，如果都传，则只根据order_code返回'),
            array('name' => 'sign', 'type' => 'string', 'need' => true, 'desc' => '加密签名，详情见 消息体签名算法'),
            array('name' => 'nonce_str', 'type' => 'string', 'need' => true, 'desc' => '随机字符串，不长于32位'),
            array('name' => 'timestamp', 'type' => 'string', 'need' => true, 'desc' => '时间戳，以秒计算时间，即unix-timestamp'),
            array('name' => 'openid', 'type' => 'string', 'need' => true, 'desc' => '用户openid,详情见 获取openid接口'),
            array('name' => 'appid', 'type' => 'string', 'need' => true, 'desc' => 'appid'),
        ),
        'return' => array(
            array('name' => 'order_code', 'desc' => '订单号'),
            array('name' => 'origin_id', 'desc' => '第三方对接平台订单id'),

            array('name' => 'from_address', 'desc' => '起始地址'),
            array('name' => 'from_lat', 'desc' => '起始地坐标纬度(坐标系为百度地图坐标系)'),
            array('name' => 'from_lng', 'desc' => '起始地坐标经度(坐标系为百度地图坐标系)'),
            array('name' => 'to_address', 'desc' => '目的地址'),
            array('name' => 'to_lat', 'desc' => '目的地坐标纬度(坐标系为百度地图坐标系)'),
            array('name' => 'to_lng', 'desc' => '目的地坐标经度(坐标系为百度地图坐标系)'),
            array('name' => 'distance', 'desc' => '订单的距离'),
            array('name' => 'order_price', 'desc' => '订单金额'),
            array('name' => 'receiver', 'desc' => '收件人'),

            array('name' => 'receiver_phone', 'desc' => '收件人电话'),
            array('name' => 'note', 'desc' => '订单说明'),
            array('name' => 'price_off', 'desc' => '总优惠金额'),
            array('name' => 'state', 'desc' => '当前状态1下单成功 3跑男抢单 4已到达 5已取件 6到达目的地 10收件人已收货 -1订单取消'),
            array('name' => 'add_time', 'desc' => '发单时间(格式2015-07-01 15:23:56)'),

            array('name' => 'finish_time', 'desc' => '收货时间(格式2015-07-01 15:23:56)'),
            array('name' => 'start_level', 'desc' => '评价星级'),
            array('name' => 'comment_note', 'desc' => '评价内容'),
            array('name' => 'driver_name', 'desc' => '跑男姓名(跑男接单后)'),
            array('name' => 'driver_jobnum', 'desc' => '跑男工号(跑男接单后)'),
            array('name' => 'driver_mobile', 'desc' => '跑男电话(跑男接单后)'),

            array('name' => 'send_type', 'desc' => '订单小类 1帮我买'),
            array('name' => 'driver_lastloc', 'desc' => '跑男的坐标'),
            array('name' => 'nonce_str', 'desc' => '随机字符串，不长于32位'),
            array('name' => 'sign', 'desc' => '加密签名，详情见消息体签名算法'),
            array('name' => 'appid', 'desc' => '第三方用户唯一凭证'),

            array('name' => 'return_msg', 'desc' => '返回信息，如非空，为错误原因，如签名失败、参数格式校验错误'),
            array('name' => 'return_code', 'desc' => '状态，ok/fail表示成功'),
        ),
    );
    $data[] = array(
        'title' => '订单提交后及状态变化回调',
        'method' => 'POST',
        'tip' => '(注：参数以form－data方式传递，不是json方式, 用户提交订单时传入）',
        'code' => 'callback',
        'desc' => '订单状态变化回调，如果已抢单、已完成等',
        'params' => array(),
        'return' => array(
            array('name' => 'order_code', 'desc' => '订单号'),
            array('name' => 'driver_name', 'desc' => '跑男姓名(跑男接单后)'),

            array('name' => 'driver_jobnum', 'desc' => '跑男工号(跑男接单后)'),
            array('name' => 'driver_mobile', 'desc' => '跑男电话(跑男接单后)'),
            array('name' => 'state', 'desc' => '当前状态1下单成功 3跑男抢单 4已到达 5已取件 6到达目的地 10收件人已收货 -1订单取消'),
            array('name' => 'state_text', 'desc' => '当前状态说明'),
            array('name' => 'origin_id', 'desc' => '第三方订单号'),
            array('name' => 'nonce_str', 'desc' => '随机字符串，不长于32位'),
            array('name' => 'sign', 'desc' => '加密签名，详情见消息体签名算法'),
            array('name' => 'appid', 'desc' => '第三方用户唯一凭证'),

            array('name' => 'return_msg', 'desc' => '返回信息，如非空，为错误原因，如签名失败、参数格式校验错误'),
            array('name' => 'return_code', 'desc' => '状态，ok/fail表示成功'),
        ),
    );
    $data[] = array(
        'title' => '发送短信验证码',
        'method' => 'POST',
        'tip' => '(注：参数以form－data方式传递，不是json方式, 用户提交订单时传入）',
        'code' => 'binduserapply',
        'desc' => '申请注册跑腿用户，发送短信验证码（针对开发者平台类应用。如果是自建应用发单，可不用调用）',
        'params' => array(
            array('name' => 'user_mobile', 'type' => 'string', 'need' => true, 'desc' => '用户手机号'),
            array('name' => 'user_ip', 'type' => 'string', 'need' => true, 'desc' => '用户IP地址'),
            array('name' => 'sign', 'type' => 'string', 'need' => true, 'desc' => '加密签名，详情见 消息体签名算法'),
            array('name' => 'nonce_str', 'type' => 'string', 'need' => true, 'desc' => '随机字符串，不长于32位'),
            array('name' => 'timestamp', 'type' => 'string', 'need' => true, 'desc' => '时间戳，以秒计算时间，即unix-timestamp'),
            array('name' => 'appid', 'type' => 'string', 'need' => true, 'desc' => 'appid'),
        ),
        'return' => array(
            array('name' => 'nonce_str', 'desc' => '随机字符串，不长于32位'),
            array('name' => 'sign', 'desc' => '加密签名，详情见消息体签名算法'),
            array('name' => 'appid', 'desc' => '第三方用户唯一凭证'),
            array('name' => 'return_msg', 'desc' => '返回信息，如非空，为错误原因，如签名失败、参数格式校验错误'),
            array('name' => 'return_code', 'desc' => '状态，ok/fail表示成功'),
        ),
    );
    $data[] = array(
        'title' => '注册跑腿',
        'method' => 'POST',
        'tip' => '(注：参数以form－data方式传递，不是json方式, 用户提交订单时传入）',
        'code' => 'bindusersubmit',
        'desc' => '注册跑腿用户，获取用户的openid（针对开发者平台类应用。如果是自建应用发单，可不用调用）',
        'params' => array(
            array('name' => 'user_mobile', 'type' => 'string', 'need' => true, 'desc' => '用户手机号'),
            array('name' => 'validate_code', 'type' => 'string', 'need' => true, 'desc' => '发送的短信验证码,详情见 发送短信验证码接口'),
            array('name' => 'city_name', 'type' => 'string', 'need' => true, 'desc' => '城市名称如“郑州市'),
            array('name' => 'county_name', 'type' => 'string', 'need' => true, 'desc' => '区名称如“金水区”'),
            array('name' => 'reg_ip', 'type' => 'string', 'need' => true, 'desc' => '用户IP地址'),
            array('name' => 'sign', 'type' => 'string', 'need' => true, 'desc' => '加密签名，详情见 消息体签名算法'),
            array('name' => 'nonce_str', 'type' => 'string', 'need' => true, 'desc' => '随机字符串，不长于32位'),
            array('name' => 'timestamp', 'type' => 'string', 'need' => true, 'desc' => '时间戳，以秒计算时间，即unix-timestamp'),
            array('name' => 'appid', 'type' => 'string', 'need' => true, 'desc' => 'appid'),
        ),
        'return' => array(
            array('name' => 'openid', 'desc' => '用户OpenId'),
            array('name' => 'nonce_str', 'desc' => '随机字符串，不长于32位'),
            array('name' => 'sign', 'desc' => '加密签名，详情见消息体签名算法'),
            array('name' => 'appid', 'desc' => '第三方用户唯一凭证'),
            array('name' => 'return_msg', 'desc' => '返回信息，如非空，为错误原因，如签名失败、参数格式校验错误'),
            array('name' => 'return_code', 'desc' => '状态，ok/fail表示成功'),
        ),
    );
    $data[] = array(
        'title' => '用户解除绑定',
        'method' => 'POST',
        'tip' => '(注：参数以form－data方式传递，不是json方式, 用户提交订单时传入）',
        'code' => 'cancelbind',
        'desc' => '解除用户绑定（针对开发者平台类应用。如果是自建应用发单，可不用调用）',
        'params' => array(
            array('name' => 'sign', 'type' => 'string', 'need' => true, 'desc' => '加密签名，详情见 消息体签名算法'),
            array('name' => 'nonce_str', 'type' => 'string', 'need' => true, 'desc' => '随机字符串，不长于32位'),
            array('name' => 'timestamp', 'type' => 'string', 'need' => true, 'desc' => '时间戳，以秒计算时间，即unix-timestamp'),
            array('name' => 'openid', 'type' => 'string', 'need' => true, 'desc' => '用户openid,详情见 获取openid接口'),
            array('name' => 'appid', 'type' => 'string', 'need' => true, 'desc' => 'appid'),
        ),
        'return' => array(
            array('name' => 'nonce_str', 'desc' => '随机字符串，不长于32位'),
            array('name' => 'sign', 'desc' => '加密签名，详情见消息体签名算法'),
            array('name' => 'appid', 'desc' => '第三方用户唯一凭证'),
            array('name' => 'return_msg', 'desc' => '返回信息，如非空，为错误原因，如签名失败、参数格式校验错误'),
            array('name' => 'return_code', 'desc' => '状态，ok/fail表示成功'),
        ),
    );
}

$code = $_GPC['code'];

if (empty($code)) {
    return $this->result(0, '获取成功', $data);
} else {
    $da = array();
    foreach ($data as $da) {
        if ($da['code'] === $code) {
            $res = $da;
        }
    }
    return $this->result(0, $code, $data);
}
