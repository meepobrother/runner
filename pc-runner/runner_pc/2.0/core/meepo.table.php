<?php
class MeepoTable
{
    public $table;
    protected $query;
    public function __construct($table = '')
    {
        $this->table = $table;
        $this->query = load()->object('Query');
        $this->query->from($this->table);
    }

    public function searchWithPage($pageindex, $pagesize)
    {
        if (!empty($pageindex) && !empty($pagesize)) {
            $this->query->page($pageindex, $pagesize);
        }
        return $this;
    }

    public function getLastQueryTotal()
    {
        return $this->query->getLastQueryTotal();
    }

    public function tableexists()
    {
        return pdo_tableexists($this->table);
    }

    public function fetchallfields()
    {
        return pdo_fetchallfields($this->table);
    }

    public function indexexists($indexname = '')
    {
        return pdo_indexexists($this->table, $indexname);
    }

    public function fieldmatch($fieldname, $datatype = '', $length = '')
    {
        return pdo_fieldmatch($this->table, $fieldname, $datatype, $length);
    }

    public function fieldexists($fieldname = '')
    {
        return pdo_fieldexists($this->table, $fieldname);
    }

    public function run($sql)
    {
        return pdo_run($sql);
    }

    public function debug($output = true, $append = array())
    {
        return pdo_debug($output, $append);
    }

    public function rollback()
    {
        return pdo_rollback();
    }

    public function commit()
    {
        return pdo_commit();
    }

    public function begin()
    {
        return pdo_begin();
    }

    public function insertid()
    {
        return pdo_insertid();
    }

    public function delete($params = array(), $glue = 'AND')
    {
        return pdo_delete($this->table, $params, $glue);
    }

    public function insert($data = array(), $replace = false)
    {
        return pdo_insert($this->table, $data, $replace);
    }

    public function update($data = array(), $params = array(), $glue = 'AND')
    {
        return pdo_update($this->table, $data, $params, $glue);
    }

    public function count($condition = array(), $cachetime = 15)
    {
        return pdo_count($this->table, $condition, $cachetime);
    }

    public function exists($condition = array())
    {
        return pdo_exists($this->table, $condition);
    }

    public function getcolumn($condition = array(), $field)
    {
        return pdo_getcolumn($this->table, $condition, $field);
    }

    public function getslice($condition = array(), $limit = array(), &$total = null, $fields = array(), $keyfield = '', $orderby = array())
    {
        return pdo_getslice($this->table, $condition, $limit, $total, $fields, $keyfield, $orderby);
    }

    public function getall($condition = array(), $fields = array(), $keyfield = '', $orderby = array(), $limit = array())
    {
        return pdo_getall($this->table, $condition, $fields, $keyfield, $orderby, $limit);
    }

    public function get($condition = array(), $fields = array())
    {
        return pdo_get($this->table, $condition, $fields);
    }
    public function fetchall($sql, $params = array(), $keyfield = '')
    {
        return pdo_fetchall($sql, $params, $keyfield);
    }

    public function fetch($sql, $params = array())
    {
        return pdo_fetch($sql, $params);
    }

    public function fetchcolumn($sql, $params = array(), $column = 0)
    {
        return pdo_fetchcolumn($sql, $params, $column);
    }

    public function query($sql, $params = array())
    {
        return pdo_query($sql, $params);
    }

    public function pdos()
    {
        return pdo_pdos();
    }

    public function pdo()
    {
        return pdo();
    }
}
