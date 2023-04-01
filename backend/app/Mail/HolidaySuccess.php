<?php

namespace App\Mail;

use App\Models\Holiday;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class HolidaySuccess extends Mailable
{
    use Queueable, SerializesModels;
    public $holiday;
    /**
     * Create a new message instance.
     */
    public function __construct(Holiday $holiday)
    {
        $this->holiday = $holiday;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('Trinonix@gmail.com', 'Trionix'),
            subject: 'Holiday Response',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.holidaySuccess',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
