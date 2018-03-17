<?php
global $_W, $_GPC;
include IA_ROOT . "/addons/runner_open/open/_function.php";

$input = $_GPC['__input'];
$data = array();
$return = array();

$data['price_token'] = $input['price_token'];
// 检查price_token
$order = pdo_get('runner_open_order', array('price_token' => $data['price_token']));
if (empty($order)) {
    $return['return_msg'] = '价格信息有误';
    $return['return_code'] = 'fail';
    die(json_encode($return));
}
if ($priceToken['expires_in'] < time()) {
    $return['return_msg'] = '订单已失效，请重新下单';
    $return['return_code'] = 'fail';
    die(json_encode($return));
}
// 订单金额，计算订单价格接口返回的total_money
$data['order_price'] = $input['order_price'];
// 实际余额支付金额计算订单价格接口返回的need_paymoney
$data['balance_paymoney'] = $input['balance_paymoney'];
// 收件人
$data['receiver'] = $input['receiver'];
$data['receiver_phone'] = $input['receiver_phone'];
if (empty($data['receiver']) || empty($data['receiver_phone'])) {
    $return['return_msg'] = '收货人或收货人电话不能为空';
    $return['return_code'] = 'fail';
    die(json_encode($return));
}
$data['note'] = trim($input['note']);
$data['callback_url'] = $input['callback_url'];

$data['push_type'] = $input['push_type'];
$data['push_str'] = $input['push_str'];
$data['special_type'] = $input['special_type'];
$data['callme_withtake'] = $input['callme_withtake'];
// openid
$data['pubusermobile'] = $input['pubusermobile'];
$data['sign'] = $input['sign'];
$data['nonce_str'] = $input['nonce_str'];
$data['timestamp'] = $input['timestamp'];
$data['openid'] = $input['openid'];
$data['appid'] = $input['appid'];
$sign = bulidSign($data);
if ($sign != $data['sign']) {
    $return['return_msg'] = '签名错误';
    $return['return_code'] = 'fail';
    die(json_encode($return));
}

$return['ordercode'] = Date('ymdHis').random(16, false);
$return['origin_id'] = $order['origin_id'];
$return['nonce_str'] = ramdom(16,false);
$return['appid'] = $order['appid'];
$return['sign'] = bulidSign($data);

die(json_encode($return));
