<?php
/**
 * Represents one translation value within the translation meta data: Value and source
 *
 */
class SSE_TranslationHints_Model_Data_Value
{
    protected $_value;
    protected $_sourceType;
    protected $_sourceFile;

    public function __construct($value, $sourceType, $sourceFile)
    {
        $this->_value = $value;
        $this->_sourceType = $sourceType;
        $this->_sourceFile = $sourceFile;
    }

    public function getValue()
    {
        return $this->_value;
    }
    public function getSourceType()
    {
        return $this->_sourceType;
    }
    public function getSourceFile()
    {
        return $this->_sourceFile;
    }
}