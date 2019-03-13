<template>
	<div class="chat-body">
        <header>
            <strong>{{ user }}</strong>
            <small class="float-right text-muted">2 min ago</small>
        </header>
        <content>

            <div class="left-chat" :class="chatcolor">
                <slot></slot>
            </div>

        </content>
    </div>
</template>

<script>
    export default {
        props:['user', 'color'],
        computed: {
            chatcolor() {
                return 'chatcolor-'+this.color;
            }
        }
    }
</script>