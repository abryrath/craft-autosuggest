<?php

namespace unionco\autosuggest\controllers;

use Craft;
use craft\elements\Category;
use craft\elements\Tag;
use craft\helpers\Db;
use craft\helpers\Json;
use craft\web\Controller;

class CategoriesController extends Controller
{
    protected $allowAnonymous = true;
    public $enableCsrfValidation = false;

    public function actionSearchForCategories()
    {
        $this->requirePostRequest();
        $this->requireAcceptsJson();

        $request = Craft::$app->getRequest();
        $requestBody = Json::decode($request->getRawBody(), false);
        $categoryGroupId = $requestBody->categoryGroupId ?? null;
        $search = $requestBody->search ?? '';

        $categories = Category::find()
            ->groupId($categoryGroupId)
            ->title(Db::escapeParam($search) . '*')
            ->all();

        foreach ($categories as $category) {
            $return[] = [
                'id' => $category->id,
                'title' => $category->title,
            ];
        }

        return $this->asJson($return);
    }
}