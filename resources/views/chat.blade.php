@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Chat Box</div>

                <div class="card-body">

                	<chat :key="texts.index" v-for="texts, index in text.message" :color=text.color[index] :user=text.user[index]> @{{ texts }} </chat>
                    
                </div>

                <div class="card-footer">
                    <div class="input-group">
                        <input type="text" placeholder="Type here" class="form-control" v-model="input" @keyup.enter="push()">
                        <span class="input-group-btn">
                            <button type="button" class="btn btn-primary" @click.prevent="push()">Send</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
