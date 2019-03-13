<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\ChatEvent;
use App\User;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{

	public function __construct()
    {
        $this->middleware('auth');
    }
	
    public function index()
    {
    	return view('chat');
    }

    public function push(Request $request)
    {
    	$user = User::find(Auth::id());
    	$this->chatSession($request);
    	event(new ChatEvent($request->message, $user));
    }

    public function textsession(Request $request)
    {
    	return $request->session()->get('textsession');
    }

    public function chatSession(Request $request)
    {
    	$request->session()->put('textsession', $request->textsession);
    }
}
