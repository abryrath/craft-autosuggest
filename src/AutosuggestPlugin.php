<?php
/**
 * AutoSuggest plugin for Craft CMS 3.x
 *
 * Create autosuggest fields on your site based on tags, categories, entries, etc.
 *
 * @link      https://github.com/abryrath
 * @copyright Copyright (c) 2019 abry rath
 */

namespace unionco\autosuggest;

use Craft;
use craft\base\Plugin;
use craft\services\Plugins;
use craft\events\PluginEvent;
use craft\events\RegisterTemplateRootsEvent;
use craft\events\TemplateEvent;
use craft\web\View;
use yii\base\Event;

/**
 * Class AutoSuggest
 *
 * @author    abry rath
 * @package   AutoSuggest
 * @since     0.0.1
 *
 */
class AutosuggestPlugin extends Plugin
{
    // Static Properties
    // =========================================================================

    /**
     * @var Autosuggest
     */
    public static $plugin;

    // Public Properties
    // =========================================================================

    /**
     * @var string
     */
    public $schemaVersion = '0.0.1';

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();
        self::$plugin = $this;

        $this->setAliases([
            '@autosuggest' => $this->getBasePath(),
        ]);

        $this->controllerNamespace = '\\unionco\\autosuggest\\controllers';

        Event::on(
            Plugins::class,
            Plugins::EVENT_AFTER_INSTALL_PLUGIN,
            function (PluginEvent $event) {
                if ($event->plugin === $this) {
                }
            }
        );

        Event::on(
            View::class,
            View::EVENT_REGISTER_SITE_TEMPLATE_ROOTS,
            function (RegisterTemplateRootsEvent $event) {
                $event->roots['@autosuggest'] = __DIR__ . '/templates/fields';
            }
        );

        // Event::on(
        //     View::class,
        //     View::EVENT_BEFORE_RENDER_TEMPLATE,
        //     function (TemplateEvent $event) {
        //         $event->template->
        //     }
        // )

        Craft::info(
            Craft::t(
                'autosuggest',
                '{name} plugin loaded',
                ['name' => $this->name]
            ),
            __METHOD__
        );
    }

    // Protected Methods
    // =========================================================================

}
