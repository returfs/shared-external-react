<?php

namespace Returfs\Marketplace\External\Laravel\Items\Events\Contracts;

/**
 * @template T
 *
 * todo: php 8.4 fixes this
 *
 * @property-read T $deleteItemData
 * @property-read ?string $socket
 */
interface DeleteItemEventContract {}
