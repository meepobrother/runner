<?php

function getDistanceByLatLng($fromLat, $fromLng, $toLat, $toLng)
{
    $ak = '9BKXcBKYKc4GCH2urrEpnaIb';
    $sk = 'aPYRttw2VaTlt5kdomGNkiWMMhoRs8Rm';
    $url = "http://api.map.baidu.com/direction/v2/riding?origin=%s&destination=%s&ak=%s&sn=%s";
    $uri = '/direction/v2/riding';
    $origin = "{$fromLat},{$fromLng}";
    $destination = "{$toLat},{$toLng}";
    $querystring_arrays = array(
        'origin' => $origin,
        'destination' => $destination,
        'ak' => $ak,
    );
    $sn = caculateAKSN($ak, $sk, $uri, $querystring_arrays);
    $target = sprintf($url, urlencode($origin), urlencode($destination), $ak, $sn);
    load()->func('communication');
    $re = ihttp_get($target);
    $content = json_decode($re['content'], true);
    if ($content['status'] === 0) {
        $result = $content['result'];
        $routes = $result['routes'];
        if (empty($routes)) {
            $re['return_msg'] = '没有有效路径';
            $re['return_code'] = 'fail';
            die(json_encode($re));
        }
        return $routes[0]['distance'];
    } else {
        $re['return_msg'] = $content['message'];
        $re['return_code'] = 'fail';
        die(json_encode($re));
    }
    die(json_encode($content));
}

function caculateAKSN($ak, $sk, $url, $querystring_arrays, $method = 'GET')
{
    if ($method === 'POST') {
        ksort($querystring_arrays);
    }
    $querystring = http_build_query($querystring_arrays);
    return md5(urlencode($url . '?' . $querystring . $sk));
}

function getFreightMoney($distance)
{
    // 米转公里
    $distance = $distance / 1000;
    // setting
    $setting = array(
        array(
            'start' => 0,
            'end' => 5,
            'price' => 5,
        ),
        array(
            'start' => 5,
            'end' => 10,
            'price' => 15,
        ),
        array(
            'start' => 10,
            'end' => 20,
            'price' => 35,
        ),
        array(
            'start' => 20,
            'end' => 30,
            'price' => 55,
        ),
    );

    foreach ($setting as $set) {
        if ($distance >= $set['start'] && $distance <= $set['end']) {
            return $set['price'];
        }
    }
    return 0;
}

function getUserCoupon($openid = '')
{
    global $_W, $_GPC;
    $uid = mc_openid2uid($openid);
    $param = array('uniacid' => $_W['uniacid'], 'uid' => $uid, 'status' => 1);
    $data = pdo_getall('coupon_record', $param);
    foreach ($data as $key => $record) {
        $coupon = activity_coupon_info($record['couponid']);
        if ($coupon['source'] != COUPON_TYPE) {
            unset($data[$key]);
            continue;
        }
        if ($coupon['status'] != '3') {
            pdo_delete('coupon_record', array('id' => $record['id']));
            unset($data[$key]);
            continue;
        }
        if (is_error($coupon)) {
            unset($data[$key]);
            continue;
        }
        $modules = array();
        if (!empty($coupon['modules'])) {
            foreach ($coupon['modules'] as $module) {
                $modules[] = $module['name'];
            }
        }
        if (!empty($modules) && !in_array($_W['current_module']['name'], $modules) && !empty($_W['current_module']['name'])) {
            unset($data[$key]);
            continue;
        }
        if (is_array($coupon['date_info']) && $coupon['date_info']['time_type'] == '2') {
            $starttime = $record['addtime'] + $coupon['date_info']['deadline'] * 86400;
            $endtime = $starttime + ($coupon['date_info']['limit'] - 1) * 86400;
            if ($endtime < time()) {
                unset($data[$key]);
                pdo_delete('coupon_record', array('id' => $record['id']));
                continue;
            } else {
                $coupon['extra_date_info'] = '有效期:' . date('Y.m.d', $starttime) . '-' . date('Y.m.d', $endtime);
            }
        }
        if (is_array($coupon['date_info']) && $coupon['date_info']['time_type'] == '1') {
            $endtime = str_replace('.', '-', $coupon['date_info']['time_limit_end']);
            $endtime = strtotime($endtime);
            if ($endtime < time()) {
                pdo_delete('coupon_record', array('id' => $record['id']));
                unset($data[$key]);
                continue;
            }

        }
        if ($coupon['type'] == COUPON_TYPE_DISCOUNT) {
            $coupon['icon'] = '<div class="price">' . $coupon['extra']['discount'] * 0.1 . '<span>折</span></div>';
        } elseif ($coupon['type'] == COUPON_TYPE_CASH) {
            $coupon['icon'] = '<div class="price">' . $coupon['extra']['reduce_cost'] * 0.01 . '<span>元</span></div><div class="condition">满' . $coupon['extra']['least_cost'] * 0.01 . '元可用</div>';
        } elseif ($coupon['type'] == COUPON_TYPE_GIFT) {
            $coupon['icon'] = '<img src="resource/images/wx_gift.png" alt="" />';
        } elseif ($coupon['type'] == COUPON_TYPE_GROUPON) {
            $coupon['icon'] = '<img src="resource/images/groupon.png" alt="" />';
        } elseif ($coupon['type'] == COUPON_TYPE_GENERAL) {
            $coupon['icon'] = '<img src="resource/images/general_coupon.png" alt="" />';
        }
        $data[$key] = $coupon;
        $data[$key]['recid'] = $record['id'];
        $data[$key]['code'] = $record['code'];
        if ($coupon['source'] == '2') {
            if (empty($data[$key]['code'])) {
                $data[$key]['extra_ajax'] = url('entry', array('m' => 'we7_coupon', 'do' => 'activity', 'type' => 'coupon', 'op' => 'addcard'));
            } else {
                $data[$key]['extra_ajax'] = url('entry', array('m' => 'we7_coupon', 'do' => 'activity', 'type' => 'coupon', 'op' => 'opencard'));
            }
        }
    }
    return $data;
}

function hasOwnCoupon($mycoupons, $couponid)
{
    $has = false;
    foreach ($mycoupons as $my) {
        if ($my['couponid'] == $couponid) {
            $has = true;
        }
    }
    return $has;
}

function array2url($params)
{
    $str = '';
    $ignore = array('coupon_refund_fee', 'coupon_refund_count');
    foreach ($params as $key => $val) {
        if ((empty($val) || is_array($val)) && !in_array($key, $ignore)) {
            continue;
        }
        $str .= "{$key}={$val}&";
    }
    $str = trim($str, '&');
    return $str;
}

function bulidSign($params)
{
    unset($params['sign']);
    unset($params['id']);
    ksort($params);
    $string = array2url($params);
    $string = md5($string);
    $result = strtoupper($string);
    return $result;
}

