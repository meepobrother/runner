<?php

$sql = "DROP TABLE IF EXISTS " . tablename('runner_open_token') . ";
CREATE TABLE " . tablename('runner_open_token') . " (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `uid` int(11) NOT NULL DEFAULT '0',
    `sign` varchar(64) NOT NULL,
    `express_in` int(11) NOT NULL DEFAULT '0',
    `notice_str` varchar(64) NOT NULL,
    PRIMARY KEY (`id`)
    UNIQUE KEY `sign` (`sign`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;";

pdo_query($sql);


$sql = "DROP TABLE IF EXISTS ".tablename('runner_open_tasks').";
CREATE TABLE  ".tablename('runner_open_tasks')."(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `origin_id` varchar(64) NOT NULL,
  `from_address` varchar(128) NOT NULL,
  `from_usernote` varchar(320) NOT NULL,
  `to_address` varchar(128) NOT NULL,
  `to_usernote` varchar(320) NOT NULL,
  `city_name` varchar(64) NOT NULL,
  `county_name` varchar(64) NOT NULL,
  `subscribe_type` tinyint(2) NOT NULL DEFAULT '0',
  `special_type` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(2) NOT NULL DEFAULT '-1',
  `callme_withtake` tinyint(2) NOT NULL DEFAULT '0',
  `goods_needpay` tinyint(2) NOT NULL DEFAULT '0',
  `push_type` tinyint(2) NOT NULL DEFAULT '0',
  `push_str` varchar(320) NOT NULL,
  `subscribe_time` int(11) NOT NULL DEFAULT '0',
  `subscribe_time_long` int(11) NOT NULL DEFAULT '0',
  `coupon_id` int(11) NOT NULL DEFAULT '-1',
  `send_type` int(11) NOT NULL DEFAULT '0',
  `openid` varchar(64) NOT NULL,
  `appid` varchar(64) NOT NULL,
  `to_lat` varchar(64) NOT NULL,
  `to_lng` varchar(64) NOT NULL,
  `from_lat` varchar(64) NOT NULL,
  `from_lng` varchar(64) NOT NULL,
  `nonce_str` varchar(64) NOT NULL,
  `timestamp` int(11) NOT NULL DEFAULT '0',
  `sign` varchar(64) NOT NULL,
  `uniacid` int(11) NOT NULL DEFAULT '0',
  `distance` int(11) NOT NULL DEFAULT '0',
  `freight_money` decimal(10,2) NOT NULL DEFAULT '0.00',
  `need_paymoney` decimal(10,2) NOT NULL DEFAULT '0.00',
  `total_priceoff` decimal(10,2) NOT NULL DEFAULT '0.00',
  `goods_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `goods_weight` decimal(10,2) NOT NULL DEFAULT '0.00',
  `goods_insurance` decimal(10,2) NOT NULL DEFAULT '0.00',
  `goods_insurance_money` decimal(10,2) NOT NULL DEFAULT '0.00',
  `other_fee` decimal(10,2) NOT NULL DEFAULT '0.00',
  `addfee` decimal(10,2) NOT NULL DEFAULT '0.00',
  `coupon_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `other_fee_desc` varchar(320) NOT NULL,
  `goods_tool` varchar(32) NOT NULL DEFAULT '',
  `note` text NOT NULL,
  `receiver` varchar(32) NOT NULL,
  `receiver_phone` varchar(32) NOT NULL,
  `pubusermobile` varchar(32) NOT NULL,
  `callback_url` varchar(320) NOT NULL,
  `countpay` varchar(32) NOT NULL DEFAULT 'wechat',
  `goods_type` varchar(32) NOT NULL,
  `goods_name` varchar(32) NOT NULL,
  `add_time` int(11) NOT NULL DEFAULT '0',
  `finish_time` int(11) NOT NULL DEFAULT '0',
  `start_level` int(11) NOT NULL DEFAULT '0',
  `expires_in` int(11) NOT NULL DEFAULT '0',
  `comment_note` varchar(320) NOT NULL,
  `driver_name` varchar(320) NOT NULL,
  `driver_jobnum` varchar(320) NOT NULL,
  `driver_mobile` varchar(320) NOT NULL,
  `driver_lastloc` varchar(320) NOT NULL,
  PRIMARY KEY (`id`)
  KEY `appid` (`appid`),
  KEY `send_type` (`send_type`),
  KEY `openid` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;";

pdo_query($sql);