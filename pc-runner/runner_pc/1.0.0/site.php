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


    public function doWebbuy()
    {
        global $_W, $_GPC;
        $this->checkWebDo("index");
        include $this->template('web/index');
    }
    public function doWebsend()
    {
        global $_W, $_GPC;
        $this->checkWebDo("index");
        include $this->template('web/index');
    }
    public function doWebtake()
    {
        global $_W, $_GPC;
        $this->checkWebDo("index");
        include $this->template('web/index');
    }
    public function doWebtakeorder()
    {
        global $_W, $_GPC;
        $this->checkWebDo("index");
        include $this->template('web/index');
    }
}
