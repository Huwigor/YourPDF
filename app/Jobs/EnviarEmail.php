<?php

namespace App\Jobs;

use App\Mail\MeuEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class EnviarEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $dados;

    public function __construct($dados)
    {
        $this->dados = $dados;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->dados['email'])->send(new MeuEmail($this->dados));
    }
}
