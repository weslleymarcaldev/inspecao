<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index()
	{
		log_message('error', 'Testando escrita no log via controller!');
		return view('welcome_message');
	}

}
