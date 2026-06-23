<?php

namespace Returfs\Marketplace\External\Laravel\Items\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Returfs\Marketplace\External\Laravel\Items\Events\Contracts\UpdateItemEventContract;

/**
 * Class UpdateItemEvent
 *
 * @implements UpdateItemEventContract<NewItemData>
 */
class UpdateItemEvent implements UpdateItemEventContract
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public array $validatedData, public string $id) {}

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int,Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('channel-name'),
        ];
    }
}
