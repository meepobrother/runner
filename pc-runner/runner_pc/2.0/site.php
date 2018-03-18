<?php
class Runner_pcModuleSite extends WeModuleSite
{
    public function __construct()
    {}

    public function loader()
    {
        return load();
    }

    public function table($name = '')
    {
        return table($name);
    }

    public function checkMobileDo($do)
    {
        if (empty($_GET['do'])) {
            $url = $this->createMobileUrl($do);
            header("Location:" . $url);
            exit();
        }
    }

    public function checkWebDo($do)
    {
        global $_W, $_GPC;
        if (empty($_GET['do']) || empty($_GET['i'])) {
            $url = $this->createWebUrl($do, array('i' => $_W['uniacid']));
            print_r($url);
            header("Location:" . $url);
            exit();
        }
    }
    // 后台登录
    public function checkWeb()
    {
        global $_W, $_GPC;
        return !empty($_W['uid']);
    }
    // 前台登录
    public function checkMobile()
    {
        global $_W, $_GPC;
        return !empty($_W['member']);
    }

    public function result($errno, $message, $data = '')
    {
        exit(json_encode(array(
            'errno' => $errno,
            'message' => $message,
            'data' => $data,
        )));
    }

    public function createOpen($name)
    {
        $dir = IA_ROOT . '/addons/' . $this->modulename . '/open/';
        $file = $dir . $name;
        if (file_exists($file)) {
            require $file;
            exit();
        }
    }

    public function doWebOpen()
    {
        global $_W, $_GPC;
        $this->createOpen($_GPC['open']);
    }

    public function doMobileOpen()
    {
        global $_W, $_GPC;
        $this->createOpen($_GPC['open']);
    }

    public function systemSetting()
    {
        $name = 'runner_pc';
        $module = pdo_get('modules', array('name' => $name));
        $data = array();
        $data['title'] = $module['title'];
        $data['image'] = IA_ROOT . "/addons/" . $name . "/icon.jpg";
        $plugins = array();
        $plugins[] = array(
            'title' => 'pc入口',
            'active' => false,
            'items' => array(
                array(
                    'title' => '首页',
                    'entry' => 'webapp',
                    'do' => 'index',
                    'module' => 'runner_pc',
                ),
                array(
                    'title' => '招商加盟',
                    'entry' => 'webapp',
                    'do' => 'cooperation',
                    'module' => 'runner_pc',
                ),
                array(
                    'title' => '服务介绍',
                    'entry' => 'webapp',
                    'do' => 'introduction',
                    'module' => 'runner_pc',
                ),
                array(
                    'title' => '加入跑男',
                    'entry' => 'webapp',
                    'do' => 'driver',
                    'module' => 'runner_pc',
                ),
                array(
                    'title' => '帮我买',
                    'entry' => 'webapp',
                    'do' => 'buy',
                    'module' => 'runner_pc',
                ),
                array(
                    'title' => '帮我送',
                    'entry' => 'webapp',
                    'do' => 'send',
                    'module' => 'runner_pc',
                ),
                array(
                    'title' => '帮我取',
                    'entry' => 'webapp',
                    'do' => 'take',
                    'module' => 'runner_pc',
                ),
                array(
                    'title' => '帮排队',
                    'entry' => 'webapp',
                    'do' => 'takeorder',
                    'module' => 'runner_pc',
                ),
            ),
        );
        // $plugins[] = array(
        //     'title' => '手机端',
        //     'active' => false,
        //     'items' => $this->getModulesBindings($module['name'], 'cover'),
        // );
        $plugins[] = array(
            'title' => '后台管理',
            'active' => true,
            'items' => $this->getModulesBindings($module['name'], 'menu'),
        );
        // 获取所有模块
        $data['plugins'] = $plugins;
        die(json_encode($data));
    }

    public function getModulesBindings($name, $entry)
    {
        $bindings = pdo_getall('modules_bindings', array('module' => $name, 'entry' => $entry));
        return $bindings;
    }
    public function getModules($name)
    {
        $sql = "SELECT * FROM " . tablename('modules') . " WHERE name like '%{$name}%'";
        return pdo_fetchall($sql, array());
    }

}
