<?php
// ini_set('display_errors', true);
// error_reporting(E_ALL);

class Runner_openModuleSite extends WeModuleSite
{
    public function __construct()
    {
        global $_W, $_GPC;
        $token = $_SERVER['HTTP_TOKEN'];
        load()->model('user');
        load()->model('account');
        if (!empty($token)) {
            $item = pdo_get('runner_open_token', array('sign' => $token));
            if (!empty($item)) {
                $record = user_single($item['uid']);
                $_W['uid'] = $record['uid'];
                $_W['username'] = $record['username'];
                $_W['user'] = $record;
                $_W['isfounder'] = user_is_founder($_W['uid']);
            }
        }
        if (!empty($_GPC['__uniacid']) || !empty($_GPC['i'])) {
            $_W['uniacid'] = intval($_GPC['__uniacid']);
            $_W['uniacid'] = $_W['uniacid'] > 0 ? $_W['uniacid'] : intval($_GPC['i']);
        } else {
            $_W['uniacid'] = uni_account_last_switch();
        }
    }

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

    public function result($errno, $message = '', $data = array())
    {
        exit(json_encode(array(
            'return_code' => $errno,
            'return_msg' => $message,
            'return_content' => $data,
        )));
    }

    public function createOpen($name)
    {
        $dir = IA_ROOT . '/addons/' . $this->modulename . '/open/';
        if (empty($name)) {
            return $this->result('fail', '参数错误');
        }
        $file = $dir . '_function.php';
        if (file_exists($file)) {
            include $file;
        }
        $name = urldecode($name);
        $file = $dir . $name . '.open.php';
        if (file_exists($file)) {
            require $file;
            exit();
        } else {
            return $this->result('fail', '不存在此接口');
        }
    }

    public function doWebOpen()
    {
        global $_W, $_GPC;
        header("Access-Control-Allow-Headers:Content-Type, Accept, Authorization, token");
        header("Access-Control-Max-Age: 1800");
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            return $this->result('ok', 'oauth pass');
        }
        $this->createOpen($_GPC['open']);
    }

    public function doMobileOpen()
    {
        global $_W, $_GPC;
        header("Access-Control-Allow-Headers:Content-Type, Accept, Authorization, token");
        header("Access-Control-Max-Age: 1800");
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            return $this->result('ok', 'oauth pass');
        }
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

    public function doWebHome()
    {
        global $_W, $_GPC;
        $this->checkWebDo("home");
        include $this->template('web/index');
    }
}
