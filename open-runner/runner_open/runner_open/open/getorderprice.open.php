<?php
global $_W, $_GPC;
// ini_set('display_errors', true);
// error_reporting(E_ALL);
$input = $_GPC['__input'];
$data = array();
// 第三方对接平台订单id
$data['origin_id'] = $input['origin_id'];
if (empty($data['origin_id'])) {
    $return['return_msg'] = '订单ID不能为空';
    $return['return_code'] = 'fail';
    die(json_encode($return));
}
// 发货地 发货地可以留空
$data['from_address'] = $input['from_address'];
$data['from_usernote'] = $input['from_usernote'];
if (empty($data['from_address'])) {
    $return['return_msg'] = '无法解析起始地';
    $return['return_code'] = '-1001';
    die(json_encode($return));
}

// 必须有目的地
$data['to_address'] = $input['to_address'];
$data['to_usernote'] = $input['to_usernote'];
if (empty($data['to_address'])) {
    $return['return_msg'] = '无法解析目的地';
    $return['return_code'] = '-1002';
    die(json_encode($return));
}
// 收货地
$data['city_name'] = $input['city_name'];
$data['county_name'] = $input['county_name'];
if (empty($data['city_name'])) {
    $return['return_msg'] = '城市信息有误';
    $return['return_code'] = 'fail';
    die(json_encode($return));
}
// 预约类型 0实时订单 1预约取件时间
$data['subscribe_type'] = $input['subscribe_type'];

// 预约时间 2015-09-18 14:00:25:000
$data['subscribe_time'] = $input['subscribe_time'];
if ($data['subscribe_type'] == 1 && empty($data['subscribe_time'])) {
    $return['return_msg'] = '请选择预约时间';
    $return['return_code'] = 'fail';
    die(json_encode($return));
}
$data['subscribe_time_long'] = intval($input['subscribe_time_long']);
// 卡券id
$data['coupon_id'] = $input['coupon_id'] > 0 ? $input['coupon_id'] : 0;
// 订单小类 0帮我送(默认) 1帮我买
$data['send_type'] = empty($input['send_type']) ? $input['send_type'] : 0;

// uid or openid
$data['openid'] = $input['openid'] ? $input['openid'] : $_W['member']['uid'];
// 支付方式
$data['countpay'] = $input['countpay'];

if (empty($data['openid'])) {
    $return['return_msg'] = 'openid无效';
    $return['return_code'] = '-105';
    die(json_encode($return));
}
$data['appid'] = $input['appid'];

if (empty($data['appid'])) {
    $return['return_msg'] = 'appid不能为空';
    $return['return_code'] = 'fail';
    die(json_encode($return));
}

$data['to_lat'] = $input['to_lat'];
$data['to_lng'] = $input['to_lng'];
$data['from_lat'] = $input['from_lat'];
$data['from_lng'] = $input['from_lng'];
if (empty($data['to_lat']) || empty($data['to_lng']) || empty($data['from_lat']) || empty($data['from_lng'])) {
    $return['return_msg'] = '经纬度信息有误';
    $return['return_code'] = 'fail';
    die(json_encode($return));
}
// 校验签名
$data['nonce_str'] = $input['nonce_str'] ? $input['nonce_str'] : random(16, false);
$data['timestamp'] = $input['timestamp'] ? $input['timestamp'] : time();
// 留言
$data['note'] = $input['note'];
// 收件人
$data['receiver'] = $input['receiver'];
$data['receiver_phone'] = $input['receiver_phone'];

$data['pubusermobile'] = $input['pubusermobile'];
$data['callme_withtake'] = intval($input['callme_withtake']);

$data['callback_url'] = $input['callback_url'];
// 类型
$data['special_type'] = intval($input['special_type']);

// 根据经纬度 计算距离
$distance = getDistanceByLatLng($data['from_lat'], $data['from_lng'], $data['to_lat'], $data['to_lng']);
$data['distance'] = $distance;
$freight_money = getFreightMoney($distance);
$data['freight_money'] = $freight_money;
// 多商品
$goods = $input['goods'];
// 商品价格
$data['goods_price'] = $input['goods_price'];
// 是否需要计价
$data['goods_needpay'] = intval($input['goods_needpay']);
// 物品重量
$data['goods_weight'] = $input['goods_weight'];
// 配送工具
$data['goods_tool'] = $input['goods_tool'];
// 商品型号
$data['goods_type'] = $input['goods_type'];
// 商品名称
$data['goods_name'] = $input['goods_name'];
// 商品保价金额
$data['goods_insurance'] = $input['goods_insurance'];
// 保价费用
$data['goods_insurance_money'] = $input['goods_insurance_money'];

$goods_price = 0;
// 单个商品计费
if ($data['goods_needpay'] === 1) {
    $goods_price += $data['goods_price'];
}
// 多个商品计费
if (is_array($goods)) {
    $msg = '';
    foreach ($goods as $good) {
        // goods.need_pay 需要支付 good['total'] 数量
        // good
        // - title
        // - type
        // - price
        // - need_pay
        // - total
        // 如果需要支付
        if ($good['need_pay']) {
            if ($good['price'] < 0 || $good['total'] < 0) {
                $msg .= '商品:' . $good['title'] . '价格或数量有误';
            } else {
                $goods_price += $good['need_pay'] * $good['total'];
            }
        }
    }
    if (!empty($msg)) {
        $return['return_msg'] = $msg;
        $return['code'] = 'fail';
        die(json_encode($return));
    }
}

$data['other_fee'] = floatval($input['other_fee']);
$data['other_fee_desc'] = $input['other_fee_desc'];

// 总费用 跑腿费 * 跑腿人数 + 商品费用 + 商品保价费用 + 其他费用
$data['driver_num'] = empty($input['driver_num']) ? 1 : intval($data['driver_num']);
if ($data['driver_num'] < 0) {
    $return['return_msg'] = '需要跑腿人数量有误';
    $return['return_code'] = 'fail';
    die(json_encode($return));
}

$data['addfee'] = empty($input['addfee']) ? 0 : floatval($input['addfee']);
if ($data['addfee'] < 0) {
    $return['return_msg'] = '金额错误';
    $return['return_code'] = 'fail';
    die(json_encode($return));
}
$addfee = $data['addfee'];
$total_money = (($freight_money + $data['addfee']) * $data['driver_num']) + $goods_price + $data['goods_insurance_money'] + $data['other_fee'];
$total_priceoff = 0;
$need_paymoney = $total_money;
// 获取优惠券信息
if ($input['coupon_id'] > 0) {
    load()->model('activity');
    $coupon_info = pdo_get('coupon', array('uniacid' => $_W['uniacid'], 'id' => $input['coupon_id']));
    if (!empty($coupon_info)) {
        $extra = iunserializer($coupon_info['extra']);
        if ($coupon_info['type'] == COUPON_TYPE_DISCOUNT) {
            // 折扣券
            $need_paymoney = sprintf("%.2f", ($total_money * ($extra['discount'] / 100)));
            // 优惠金额
            $total_priceoff = $total_money - $need_paymoney;
        } elseif ($coupon_info['type'] == COUPON_TYPE_CASH) {
            // 现金券
            if ($log['fee'] >= $extra['least_cost'] * 0.01) {
                $need_paymoney = sprintf("%.2f", ($total_money - $extra['reduce_cost'] / 100));
                // 优惠金额
                $total_priceoff = $total_money - $need_paymoney;
            }
        }
    }
    $hisCoupons = getUserCoupon($input['openid']);
    $return = array();
    if (!hasOwnCoupon($hisCoupons, $input['coupon_id'])) {
        $return['return_msg'] = '所选优惠券有误';
        $return['return_code'] = 'fail';
        die(json_encode($return));
    }
}

$data['need_paymoney'] = $need_paymoney;
$data['total_priceoff'] = $total_priceoff;

//

// 下单中的sign
$data['uniacid'] = $_W['uniacid'];
// 下单时间
$data['add_time'] = time();
// 完成时间
$data['finish_time'] = 0;
// 评星
$data['start_level'] = 0;
// 评价内容
$data['comment_note'] = '';
// 跑男姓名
$data['driver_name'] = '';
// 跑男工号
$data['driver_jobnum'] = '';
// 跑男电话
$data['driver_mobile'] = '';
// 跑男位置
$data['driver_lastloc'] = '';

if (empty($input['sign'])) {
    $sign = bulidSign($data);
    $data['sign'] = $sign;
    // 插入订单
    $data['status'] = -1;
    // 保存数据到数据库
    // pdo_insert('runner_open_tasks', $data);
    // $id = pdo_insertid();
    // 设置缓存
    load()->func('cache');
    cache_write($sign, json_encode($data));
} else {
    $item = json_decode(cache_load($input['sign']), true);
    if (!empty($item)) {
        // 更新sign
        $sign = bulidSign($data);
        $data['sign'] = $sign;
        cache_write($sign, json_encode($data));
    } else {
        $sign = bulidSign($data);
        $data['sign'] = $sign;
        cache_write($sign, json_encode($data));
    }
}

// 返回数据
$return['origin_id'] = $input['origin_id'];
// 订单总金额（优惠前）
$return['total_money'] = $total_money;
// 实际需要支付金额
$return['need_paymoney'] = $need_paymoney;
// 总优惠金额
$return['total_priceoff'] = $total_priceoff;
// 配送距离（单位：米）
$return['distance'] = $distance;
// 跑腿费
$return['freight_money'] = $freight_money;
// 优惠券
$return['couponid'] = $input['coupon_id'];
// 优惠券金额
$return['coupon_amount'] = $total_priceoff;
// 增加费用 小费
$return['addfee'] = $addfee;
// 商品保价金额 报价金额
$return['goods_insurancemoney'] = 0;
// 10分钟
$return['expires_in'] = time() + 60 * 60 * 10;
// 随机字符串
$return['nonce_str'] = random(16, false);
// 签名
$return['sign'] = $sign;
$return['appid'] = $input['appid'];
$return['price_token'] = bulidSign($return);

cache_write($return['price_token'], json_encode($return));
die(json_encode($return));
