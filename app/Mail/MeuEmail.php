<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MeuEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $dados;



    /**
     * Create a new message instance.
     */
    public function __construct($dados)
    {

        $this->dados = $dados;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new envelope(
            subject: 'Seu pdf está pronto!'
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.meuemail',
            with: ['dados' => $this->dados]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [
            Attachment::fromPath(public_path($this->dados['pdf']))
                ->as('documento.pdf')
                ->withMime('application/pdf'),
        ];
    }
}
