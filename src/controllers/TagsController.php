<?php

namespace unionco\autosuggest\controllers;

use Craft;
use craft\elements\Tag;
use craft\helpers\Db;
use craft\helpers\Json;
use craft\web\Controller;

class TagsController extends Controller
{
    protected $allowAnonymous = true;
    public $enableCsrfValidation = false;

    public function actionSearchForTags()
    {
        $this->requirePostRequest();
        $this->requireAcceptsJson();

        $request = Craft::$app->getRequest();
        $requestBody = Json::decode($request->getRawBody(), false);
        $tagGroupId = $requestBody->tagGroupId ?? null;
        $search = $requestBody->search ?? '';

        $tags = Tag::find()
            ->groupId($tagGroupId ?? [])
            ->title(Db::escapeParam($search) . '*')
            ->all();

        $return = [];
        foreach ($tags as $tag) {
            $return[] = [
                'id' => $tag->id,
                'title' => $tag->title,
            ];
        }

        return $this->asJson($return);
    }
}