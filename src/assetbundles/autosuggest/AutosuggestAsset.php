<?php

namespace unionco\autosuggest\assetbundles\autosuggest;

use craft\web\AssetBundle;

class AutosuggestAsset extends AssetBundle
{
    public function init()
    {
        $env = getenv('ENVIRONMENT');
        if ($env == 'development' || $env == 'dev') {
            $this->js = ['http://localhost:8080/main.js'];
        }
        parent::init();
    }
}
