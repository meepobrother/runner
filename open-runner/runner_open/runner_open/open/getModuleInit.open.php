<?php
global $_W, $_GPC;
$name = $_GPC['name'];
$site = WeUtility::createModuleSite($name);
if (!is_error($site)) {
    exit($site->systemSetting());
}
