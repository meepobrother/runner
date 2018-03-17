<?php

class Runner_openModuleSite extends WeModuleSite
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
        $file = $dir . $name . '.open.php';
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

    public function doWebindex()
    {
        global $_W, $_GPC;
        $this->checkWebDo("index");
        include $this->template('web/index');
    }
    public function doWeblogin()
    {
        global $_W, $_GPC;
        $this->checkWebDo("login");
        include $this->template('web/index');
    }
    public function doWebregister()
    {
        global $_W, $_GPC;
        $this->checkWebDo("register");
        include $this->template('web/index');
    }
    public function doWebforget()
    {
        global $_W, $_GPC;
        $this->checkWebDo("forget");
        include $this->template('web/index');
    }
    public function doWebdevelopword()
    {
        global $_W, $_GPC;
        $this->checkWebDo("developword");
        include $this->template('web/index');
    }
    public function doWeberrorcode()
    {
        global $_W, $_GPC;
        $this->checkWebDo("errorcode");
        include $this->template('web/index');
    }
    public function doWebdemo()
    {
        global $_W, $_GPC;
        $this->checkWebDo("demo");
        include $this->template('web/index');
    }
    public function doWebprocess()
    {
        global $_W, $_GPC;
        $this->checkWebDo("process");
        include $this->template('web/index');
    }

    public function doWebwordshow()
    {
        global $_W, $_GPC;
        $this->checkWebDo("wordshow");
        include $this->template('web/index');
    }
}
