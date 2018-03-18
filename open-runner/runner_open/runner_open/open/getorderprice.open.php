<?php
global $_W, $_GPC;
include IA_ROOT . "/addons/runner_open/open/_function.php";

$input = $_GPC['__input'];
$data = array();
// 第三方对接平台订单id
$data['origin_id'] = $input['origin_id'];
if (empty($data['origin_id'])) {
    $return['return_msg'] = '订单ID不能为空';
    $return['return_code'] = 'fail';
    die(json_encode($return));
}
// 发货地
$data['from_address'] = $input['from_address'];
$data['from_usernote'] = $input['from_usernote'];
if (empty($data['from_address'])) {
    $return['return_msg'] = '无法解析起始地';
    $return['return_code'] = '-1001';
    die(json_encode($return));
}
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
// 卡券id
$data['coupon_id'] = $input['coupon_id'] > 0 ? $input['coupon_id'] : 0;
// 订单小类 0帮我送(默认) 1帮我买
$data['send_type'] = empty($input['send_type']) ? $input['send_type'] : 0;

// uid or openid
$data['openid'] = $input['openid'];
$data['openid'] = $data['openid'] ? $data['openid'] : $_W['member']['uid'];
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
$data['nonce_str'] = random(16, false);
$data['timestamp'] = time();

// 根据经纬度 计算距离
$distance = getDistanceByLatLng($data['from_lat'], $data['from_lng'], $data['to_lat'], $data['to_lng']);
$freight_money = getFreightMoney($distance);

// 总费用 跑腿费+其他费用
$total_money = $freight_money;
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
// 下单中的sign

if (empty($input['sign'])) {
    $sign = bulidSign($data);
    $data['sign'] = $sign;
    // 插入订单
    $data['status'] = -1;
} else {
    $item = pdo_get('runner_open_tasks', array('sign' => $item['sign']));
    $data['sign'] = $item['sign'];
    $data['status'] = -1;
}

// 返回数据
$return['origin_id'] = $input['origin_id'];
$return['price_token'] = md5(serialize($data));
// 订单总金额（优惠前）
$return['total_money'] = $total_money;
// 实际需要支付金额
$return['need_paymoney'] = $need_paymoney;
// 总优惠金额
$return['total_priceoff'] = $total_priceoff;
// 配送距离（单位：米）
$return['distance'] = $distance;
// 跑腿费
$return['freight_money'] = 7689;
// 优惠券
$return['couponid'] = $input['coupon_id'];
// 优惠券金额
$return['coupon_amount'] = $total_priceoff;
// 增加费用 小费
$return['addfee'] = 0;
// 商品保价金额 报价金额
$return['goods_insurancemoney'] = 0;
// 10分钟
$return['expires_in'] = time() + 60 * 60 * 10;
// 随机字符串
$return['nonce_str'] = ramdom(16, false);
// 签名
$return['sign'] = $sign;
$return['appid'] = $input['appid'];

die(json_encode($return));
