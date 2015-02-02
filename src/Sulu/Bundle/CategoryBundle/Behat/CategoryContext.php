<?php
/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\CategoryBundle\Behat;

use Sulu\Bundle\TestBundle\Behat\BaseContext;
use Behat\Behat\Context\SnippetAcceptingContext;
use Sulu\Bundle\CategoryBundle\Entity\Category;

/**
 * Behat context class for the CategoryBundle
 */
class CategoryContext extends BaseContext implements SnippetAcceptingContext
{
    /**
     * @Given the category :name exists
     */
    public function theCategoryExists($name)
    {
        $this->getCategoryManager()->save(array(
            'name' => $name,
            'locale' => 'de',
            'key' => $name,
            'meta' => array(
                array(
                    'key' => 'myKey',
                    'value' => 'myValue'
                ),
                array(
                    'key' => 'anotherKey',
                    'value' => 'should not be visible due to locale',
                    'locale' => 'de-ch'
                )
            )
        ), $this->getUserId());
    }

    /**
     * @Then the category :name should not exist
     */
    public function theCategoryShouldNotExist($name)
    {
        $category = $this->getEntityManager()
            ->getRepository('SuluCategoryBundle:Category')->findOneByKey($name);

        if ($category) {
            throw new \Exception(sprintf('Category with key "%s" should NOT exist', $name));
        }
    }

    /**
     * @Then the category :name should exist
     */
    public function theCategoryShouldExist($name)
    {
        $category = $this->getEntityManager()
            ->getRepository('SuluCategoryBundle:Category')->findOneByKey($name);

        if (!$category) {
            throw new \Exception(sprintf('Category with key "%s" should exist', $name));
        }
    }

    /**
     * Return the category manager
     *
     * @return \Sulu\Bundle\CategoryBundle\Category\CategoryManagerInterface
     */
    protected function getCategoryManager()
    {
        return $this->getService('sulu_category.category_manager');
    }
}
